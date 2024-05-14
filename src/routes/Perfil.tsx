import Footer from '../components/Footer'
import Header from '../components/Header'
import List from '../components/ListPlates'
import { Container, GlobalStyles } from '../styles'

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <List />
      </Container>
      <Footer />
    </>
  )
}
