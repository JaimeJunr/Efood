import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Restaurant } from '../models/Restaurant'

export type Order = {
  products: {
    id: number
    price: number
  }[]
  delivery: {
    address: {
      description: string
      city: string
      complement: string
      number: number
      zipCode: string
    }
    receiver: string
  }
  payment: {
    card: {
      name: string
      number: string
      code: number
      expires: {
        month: number
        year: number
      }
    }
  }
}

type request = {
  orderId: string
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/efood/',
  }),
  endpoints: builder => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => 'restaurantes',
    }),
    getCurretRestaurant: builder.query<Restaurant, string>({
      query: id => `restaurantes/${id}`,
    }),
    submitOrder: builder.mutation<request, Order>({
      query: body => ({
        url: 'checkout',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useGetCurretRestaurantQuery,
  useGetRestaurantsQuery,
  useSubmitOrderMutation,
} = api

export default api
