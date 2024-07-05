import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: '2024-06-20',
})

const app = express()
app.use(bodyParser.json())

app.post('/create-payment-intent', async (req: Request, res: Response) => {
  const { amount } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'brl',
    })

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    res.status(500).send({
      error: (error as Error).message,
    })
  }
})

export { app }
