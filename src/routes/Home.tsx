import Footer from '../components/Footer'
import Header from '../components/Header'
import List from '../components/ListRestaurant'
import { Container, GlobalStyles } from '../styles'

export default function Home() {
  return (
    <>
      <Header home />
      <Container>
        <List />
      </Container>
      <Footer />
    </>
  )
}
