import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Facilities from './pages/Facilities'
import FacilityDetails from './pages/FacilityDetails'
import Login from './pages/Login'
import FacilityRegistration from './pages/Register'
import FacilityDashboard from './pages/Dasboard'
import CompareFacilities from './pages/Compare'
import { Routes, Route } from 'react-router-dom'
import AppointmentForm from './components/BookAppointmentForm'

const App = () => {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/about' Component={About} />
      <Route path='/facilities' Component={Facilities} />
      <Route path='/facilities/:id' Component={FacilityDetails} />
      <Route path='/login' Component={Login} />
      <Route path='/register' Component={FacilityRegistration} />
      <Route path='/dashboard/:id' Component={FacilityDashboard} />
      <Route path='/compare' Component={CompareFacilities} />
      <Route path='/appointment/:id' Component={AppointmentForm} />


    </Routes>

  )
}

export default App