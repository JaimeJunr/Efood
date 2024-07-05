import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { app as paymentApp } from './services/stripe'
import { app as chatbot } from './services/chatbot'

const app = express()
const PORT = process.env.PORT || 3333

app.use(bodyParser.json())

// Configurar o middleware de CORS
app.use(
  cors({
    origin: ['http://localhost:8080', 'https://efood-rho-one.vercel.app'],
  }),
)

// Use o app do payment.ts
app.use('/payment', paymentApp)
app.use('/api', chatbot)

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

// Tratar rejeições de promessas não tratadas
process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error)
})
