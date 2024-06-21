import React from 'react'

import { GlobalStyles } from './styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './routes/Home'
import Perfil from './routes/Perfil'
import Footer from './containers/Footer'
import Cart from './components/Cart'
import { Provider } from 'react-redux'
import { store } from './store'

export const formatPrice = (preco = 0) => {
  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(preco)
}

export default function App() {
  return (
    <Provider store={store}>
      <React.StrictMode>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/perfil/:id' element={<Perfil />} />
          </Routes>
          <Footer />
          <Cart />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  )
}
