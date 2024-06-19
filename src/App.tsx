import React from 'react'

import { GlobalStyles } from './styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './routes/Home'
import Perfil from './routes/Perfil'
import Footer from './components/Footer'

export default function App() {
  return (
    <React.StrictMode>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/perfil/:id' element={<Perfil />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  )
}
