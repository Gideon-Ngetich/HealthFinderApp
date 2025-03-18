import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Facilities from './pages/Facilities'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/about' Component={About} />
      <Route path='/facilities' Component={Facilities} />

    </Routes>
  )
}

export default App