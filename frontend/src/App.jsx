import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login"/>
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path='/' 
        element={
          <ProtectedRoute><Home/></ProtectedRoute>
        } />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/logout' element={<Logout/>} />
        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
