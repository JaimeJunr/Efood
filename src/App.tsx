import React from 'react'

import { GlobalStyles } from './styles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './routes/Home'
import Perfil from './routes/Perfil'

export default function App() {
  return (
    <React.StrictMode>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/perfil' element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}
