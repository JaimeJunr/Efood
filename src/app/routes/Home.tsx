import Header from '../containers/Header'
import ListRestaurant from '../containers/ListRestaurant'

import { Container } from '../styles'

import { useGetRestaurantsQuery } from '../services/api'

export default function Home() {
  const { data: restaurants } = useGetRestaurantsQuery()

  return (
    <>
      <Header home />
      <Container>
        <ListRestaurant restaurants={restaurants} />
      </Container>
    </>
  )
}
