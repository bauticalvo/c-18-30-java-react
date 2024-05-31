import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import ProRegister from './components/ProRegister/ProRegister'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import UserRegister from './components/UserRegister/UserRegister'
import Login from './components/Login/Login'
import ProfesionalLogin from './components/Login/ProfesionalLogin'

function App() {

  return (
    <>
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>} />  
          <Route path='/ProfesionalRegister' element={<ProRegister/>} />  
          <Route path='/profile' element={<Profile />} />
          <Route path='/UserRegister' element={<UserRegister />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profesionalLogin' element={<ProfesionalLogin />} />
        </Routes>
      </div>

    </>
  )
}

export default App
