import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  GoogleGenerativeAIProviderSettings,
  createGoogleGenerativeAI,
} from '@ai-sdk/google'
import { CoreMessage, streamText } from 'ai'
import { Restaurant } from '../models/Restaurant'

const app = express()
const PORT = process.env.PORT || 3333

app.use(
  cors({
    origin: 'http://localhost:9000',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
  }),
)

app.use(bodyParser.json())

// Ensure the API key is defined and handle errors if not
const apiKey = process.env.REACT_APP_GOOGLE_GENERATIVE_AI_API_KEY
if (!apiKey) {
  throw new Error('Google Generative AI API key is missing.')
}
// Initialize the Google Generative AI provider
const settings: GoogleGenerativeAIProviderSettings = { apiKey }
const googleGenerativeAI = createGoogleGenerativeAI(settings)

const googleModel = googleGenerativeAI.languageModel(
  'models/gemini-1.5-flash-latest',
)

interface PredefinedPrompts {
  [key: string]: string
}

const predefinedPrompts: PredefinedPrompts = {
  'quais são os restaurantes em destaque da semana?':
    'Os restaurantes em destaque esta semana são Bella Tavola Italiana e Jardim da Terra como uma otima opção vegana.',

  'quais formas de pagamento são aceitas?':
    'Aceitamos pagamento com cartão de crédito e débito das bandeiras Visa, MasterCard, e American Express. Além disso, também aceitamos pagamento via boleto bancário.',
}

const getPredefinedResponse = (content: string): string | null => {
  const cleanedContent = content.toLowerCase().trim()
  return predefinedPrompts[cleanedContent] || null
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const simulateTyping = async (response: string, res: Response) => {
  for (let i = 0; i < response.length; i++) {
    await delay(20)

    res.write(response[i])
  }
}

let restaurants: Restaurant[] = []

const fetchRestaurants = async () => {
  try {
    const res = await fetch(
      'https://fake-api-tau.vercel.app/api/efood/restaurantes',
    )
    const data = await res.json()
    restaurants = data as Restaurant[]
  } catch (error) {
    console.error('Error fetching restaurants:', error)
  }
}

// Fetch restaurants
try {
  fetchRestaurants()
} catch (error) {
  console.error('Error fetching restaurants:', error)
}

app.post('/api/chatbot', async (req: Request, res: Response) => {
  try {
    const { messages }: { messages: CoreMessage[] } = req.body

    // Ensure messages is an array and has at least one message
    if (!Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .send('Invalid request: messages should be a non-empty array.')
    }

    // Check if the last message is a predefined response
    const latestUserMessage = messages[messages.length - 1]?.content || null
    let predefinedResponse = null
    if (typeof latestUserMessage === 'string') {
      predefinedResponse = getPredefinedResponse(latestUserMessage)
    }

    if (predefinedResponse) {
      await simulateTyping(predefinedResponse, res)
      res.end()
      return
    }

    // Get the restaurants from the API
    const response = await streamText({
      model: googleModel,
      system: `Você é uma assistente de um e-commerce parecido com o Ifood, o nome do e-commerce é EFOOD.
      Não fale nada que não envolva nossos restaurantes e pratos.
      Nossos restaurantes: ${restaurants
        .map(restaurant => restaurant.titulo)
        .join(', ')}.
      Os pratos: ${restaurants
        .flatMap(restaurant =>
          restaurant.cardapio.map(
            prato => `${prato.nome} do restaurante ${restaurant.titulo}`,
          ),
        )
        .join(', ')}.
      A avaliação dos restaurantes: ${restaurants
        .map(restaurant => `${restaurant.titulo}: ${restaurant.avaliacao}`)
        .join(', ')}.
      `,
      messages,
      maxTokens: 300,
      maxRetries: 2,
      presencePenalty: 1,
      temperature: 0,
    })

    // console.log(`Você é uma assistente de um e-commerce parecido com o Ifood, o nome do e-commerce é EFOOD.
    // Não fale nada que não envolva nossos restaurantes e pratos.
    // Nossos restaurantes: ${restaurants
    //   .map(restaurant => restaurant.titulo)
    //   .join(', ')}.
    // Os pratos: ${restaurants
    //   .flatMap(restaurant =>
    //     restaurant.cardapio.map(
    //       prato => `${prato.nome} do restaurante ${restaurant.titulo}`,
    //     ),
    //   )
    //   .join(', ')}.
    // A avaliação dos restaurantes: ${restaurants
    //   .map(restaurant => `${restaurant.titulo}: ${restaurant.avaliacao}`)
    //   .join(', ')}.`)

    const reader = response.textStream.getReader()

    // Simulate typing and start streaming the response
    const readAndSend = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          await simulateTyping(value.replace(/[*_`]/g, ''), res)
        }
        res.end() // Finish the response after sending all blocks
      } catch (error) {
        console.error('Error reading stream:', error)
        res.status(500).send('Internal Server Error')
      }
    }

    // End the response after sending all blocks
    readAndSend()
      .then(() => {
        res.end()
      })
      .catch(error => {
        console.error('Error reading stream:', error)
        res.status(500).send('Internal Server Error')
      })
  } catch (error) {
    console.error('Error generating text:', error)
    return res.status(500).send('Internal Server Error')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
