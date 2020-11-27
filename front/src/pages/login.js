import React, { useState, useContext } from 'react'
import axios from 'axios'

import './index.scss'
import './app.scss'
import './login.scss'

import Header from '../comps/Header'
import Input from '../comps/Input'
import Button from '../comps/Button'

import BgWave from '../comps/BgWave'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'

export default function Login () {
  const [userEmail, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const { setUser } = useContext(UserContext)

  const HandleLogin = async (userEmail, pass) => {
    const status = await axios.post('https://www.lendr-bc.me/auth/login/', {
      email: userEmail,
      password: pass,
      headers: { crossDomain: true, 'Content-Type': 'application/json' }
    }, { withCredentials: true })

    if (status.data.id) setUser(status.data)
  }

  return (
    <div className='loginDiv'>
      <Header options='none' />
      <h1>Hey there, welcome back!</h1>

      <div className='login'>
        <Input
          title='Email'
          placeholder='example@mail.com'
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          title='Password'
          placeholder='Password'
          type='password'
          onChange={e => setPass(e.target.value)}
        />

        <a>Forgot your password?</a>

        <Link to='/explorePage'>
          <div className='button'>
            <Button
              text='Login'
              onClick={() => HandleLogin(userEmail, pass)}
            />
          </div>
        </Link>

      </div>
      <BgWave />
    </div>
  )
}
