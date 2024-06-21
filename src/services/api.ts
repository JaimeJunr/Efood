import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Restaurant } from '../models/Restaurant'

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
  }),
})

export const { useGetCurretRestaurantQuery, useGetRestaurantsQuery } = api

export default api
