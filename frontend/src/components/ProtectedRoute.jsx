import React from 'react'
import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState, useEffect } from 'react'

export default function ProtectedRoute({children}) {
  const [isAuthorized, setIsAuthorized] = useState(null)  

  useEffect(() =>{
    auth().catch((err)=>{setIsAuthorized(false)})
  }, [])

  const refreshToken = async (params) => {
    const refresh_token = localStorage.getItem(REFRESH_TOKEN)
    try {
      const res = await api.post('/api/token/refresh/', {
        refresh: refresh_token
      })
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      }
      else {setIsAuthorized(false)}
    } catch (err){
      console.log(err);
      setIsAuthorized(false);
      return
    }

  }  
  const auth = async (params) => {
      const token = localStorage.getItem(ACCESS_TOKEN)
      if (!token) {
        setIsAuthorized(false); 
        return}
      const decoded = jwtDecode(token)
      const now = Date.now() / 1000
      if (decoded.exp < now) {
        await refreshToken()
      }
      else {
        setIsAuthorized(true)
      }
  }
  if (isAuthorized === null) {
    return (<div>Loading...</div>)
  }
  return (
    isAuthorized ? children : <Navigate to='/login'/>
  )
}
