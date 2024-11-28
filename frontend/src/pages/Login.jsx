import React from 'react'
import Form from '../components/Form'

function Login() {
  localStorage.clear()
  return (
    <div>
      <Form route='/api/token/' method='login'/>
    </div>
  )
}

export default Login
