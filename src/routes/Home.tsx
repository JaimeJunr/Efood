import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ListRestaurant from '../components/ListRestaurant'
import { Container } from '../styles'
import { Restaurant } from '../models/Restaurant'

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/efood/restaurantes')
      .then(response => response.json())
      .then(data => {
        setRestaurants(data)
      })
  }, [])

  return (
    <>
      <Header home />
      <Container>
        <ListRestaurant restaurants={restaurants} />
      </Container>
    </>
  )
}
