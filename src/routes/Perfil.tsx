import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ListPlates from '../components/ListPlates'
import { Restaurant } from '../models/Restaurant'
import { Container } from '../styles'
import { useParams } from 'react-router-dom'

export default function Perfil() {
  const { id } = useParams()

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
      .then(response => response.json())
      .then(data => {
        setRestaurant(data)
      })
  }, [])
  return (
    <>
      {restaurant && (
        <>
          <Header restaurant={restaurant} />
          <Container>
            <ListPlates restaurant={restaurant} />
          </Container>
        </>
      )}
    </>
  )
}
