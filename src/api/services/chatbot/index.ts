import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

import {
  GoogleGenerativeAIProviderSettings,
  createGoogleGenerativeAI,
} from '@ai-sdk/google'
import { CoreMessage, generateText } from 'ai'
import { Restaurant } from '../../models/Restaurant'

const app = express()
app.use(bodyParser.json())

// Garantir que a chave API está definida e tratar erros se não estiver
const apiKey = process.env.REACT_APP_GOOGLE_GENERATIVE_AI_API_KEY
if (!apiKey) {
  throw new Error('Google Generative AI API key is missing.')
}

// Inicializar o provedor Google Generative AI
const settings: GoogleGenerativeAIProviderSettings = { apiKey }
const googleGenerativeAI = createGoogleGenerativeAI(settings)
const googleModel = googleGenerativeAI.languageModel(
  'models/gemini-1.5-flash-latest',
)

let restaurants: Restaurant[] = []

const predefinedPrompts: PredefinedPrompts = {
  'quais formas de pagamento são aceitas?':
    'Aceitamos pagamento com cartão de crédito e débito das bandeiras Visa, MasterCard, e American Express. Além disso, também aceitamos pagamento via boleto bancário.',
}

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

app.get('/', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'API is running',
  })
})

app.post('/', async (req: Request, res: Response) => {
  try {
    const { messages }: { messages: CoreMessage[] } = req.body

    // Garantir que messages é um array e tem pelo menos uma mensagem
    if (!Array.isArray(messages) || messages.length === 0) {
      return res
        .status(400)
        .send('Invalid request: messages should be a non-empty array.')
    }

    // Verificar se a última mensagem é uma resposta predefinida
    const latestUserMessage = messages[messages.length - 1]?.content as string
    let predefinedResponse: string | null = null
    if (typeof latestUserMessage === 'string') {
      predefinedResponse = getPredefinedResponse(latestUserMessage)
    }

    if (predefinedResponse) {
      res.send(predefinedResponse)
      return
    }

    // Obter os restaurantes da API
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
      A restaurantes em destaque: ${restaurants
        .map(restaurant => `${restaurant.titulo}: ${restaurant.destacado}`)
        .join(', ')}.`,
      messages,
      maxTokens: 300,
      maxRetries: 2,
      presencePenalty: 1,
      temperature: 0,
    })

    res.send(formatAndSanitizeHtml(text))
  } catch (error) {
    console.error('Error generating text:', error)
    res.status(500).send('Internal Server Error')
  }
})

interface PredefinedPrompts {
  [key: string]: string
}

const getPredefinedResponse = (content: string): string | null => {
  const cleanedContent = content.toLowerCase().trim()
  return predefinedPrompts[cleanedContent] || null
}

// Função para sanitizar o texto
// Função para preservar a formatação de negrito
const preserveBoldFormatting = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Preserva negrito
}

const formatAndSanitizeHtml = (text: string): string => {
  return preserveBoldFormatting(text)
}

export { app }
