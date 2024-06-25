import Header from '../containers/Header'
import ListPlates from '../containers/ListPlates'

import { Container } from '../styles'
import { useParams } from 'react-router-dom'

import { useGetCurretRestaurantQuery } from '../services/api'

export default function Perfil() {
  const { id } = useParams()

  const { data: restaurant } = useGetCurretRestaurantQuery(id!)

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
