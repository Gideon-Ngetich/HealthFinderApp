import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/about' Component={About} />
    </Routes>
  )
}

export default App