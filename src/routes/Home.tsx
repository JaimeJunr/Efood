import { useEffect, useState } from 'react'

import Header from '../containers/Header'
import ListRestaurant from '../containers/ListRestaurant'

import { Container } from '../styles'

import { useGetRestaurantsQuery } from '../services/api'

export default function Home() {
  const { data: restaurants } = useGetRestaurantsQuery()

  if (!restaurants) return <h3>Loading</h3>

  return (
    <>
      <Header home />
      <Container>
        <ListRestaurant restaurants={restaurants} />
      </Container>
    </>
  )
}
