import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'

import {
  GoogleGenerativeAIProviderSettings,
  createGoogleGenerativeAI,
} from '@ai-sdk/google'
import {
  CoreMessage,
  streamText,
  GoogleGenerativeAIStream,
  generateText,
} from 'ai'
import { Restaurant } from './models/Restaurant'

const app = express()
const PORT = process.env.PORT || 3333

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

let restaurants: Restaurant[] = []

// Função para buscar os restaurantes da API externa
const fetchRestaurants = async () => {
  try {
    const res = await fetch(
      'https://fake-api-tau.vercel.app/api/efood/restaurantes',
    )
    if (!res.ok) {
      throw new Error('Failed to fetch restaurants')
    }
    const data = await res.json()
    restaurants = data as Restaurant[]
  } catch (error: any) {
    console.error('Error fetching restaurants:', error.message)
  }
}

// Iniciar a busca por restaurantes ao iniciar o servidor
fetchRestaurants()

app.get('/api', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'API is running',
  })
})

app.post('/api', async (req: Request, res: Response) => {
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
      res.send(predefinedResponse)
      return
    }

    // Get the restaurants from the API
    const { text } = await generateText({
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

    res.send(text)
  } catch (error) {
    console.error('Error generating text:', error)
    res.status(500).send('Internal Server Error')
  }
})

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error)
})
