import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { setAccessToken } from '../../shared/helpers/token'
import { useUser } from '../../shared/context/User'
import {
  Button,
  FormGroup,
  Input,
  Label,
  ButtonGroup
} from '../../shared/elements'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useUser()

  const handleLogin = e => {
    e.preventDefault()
    const url = `${process.env.REACT_APP_API_DOMAIN}/users/login`
    const data = { email, password }
    const config = {
      method: 'POST',
      url,
      data,
      withCredentials: true
    }

    axios(config).then(({ data: { user, accessToken } }) => {
      setAccessToken(accessToken)
      setUser(user)
    })
  }

  return (
    <form onSubmit={handleLogin}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Button variant="primary" width={100}>
          Login
        </Button>
      </FormGroup>
      <ButtonGroup>
        <Button as={Link} teritiary to="/">
          Forgot Password
        </Button>
        <Button as={Link} variant="secondary" to="/register">
          Create Account
        </Button>
      </ButtonGroup>
    </form>
  )
}

export { Login }
