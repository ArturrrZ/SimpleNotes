import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/Form.css'
import LoadingIndicator from './LoadingIndicator'

function Form({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const title = method === 'login'? "Login": "Register"

    async function handleSubmit(event){
        setLoading(true)
        event.preventDefault()
        try {
            const res = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/')
            }
            else {
                navigate('/login')
            }
        } catch (err) {alert(err)}
        finally {setLoading(false)}
    }
    return (
      <form onSubmit={handleSubmit} className='form-container'>
          <h1>{title}</h1>
          <input
          className='form-input'
          type='text'
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          placeholder='Username'
           />
           <input
          className='form-input'
          type='password'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          placeholder='Password'
           />
           {loading&&<LoadingIndicator/>}
           <button className='form-button' type='submit'>
                {title}
           </button>
      </form>
    )
}

export default Form
