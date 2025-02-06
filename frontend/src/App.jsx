import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' component={Home} />
      <Route path='/about' component={About} />

    </Routes>

  )
}

export default App
