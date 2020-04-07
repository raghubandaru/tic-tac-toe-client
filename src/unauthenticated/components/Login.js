import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { ErrorMessage } from '../../shared/components'
import { setAccessToken } from '../../shared/helpers/token'
import { useUser } from '../../shared/context/User'
import {
  Button,
  FormGroup,
  Input,
  Label,
  ButtonGroup
} from '../../shared/elements'
import { isError, validateLogin } from '../../shared/utilities/validation'

function Login() {
  const [details, setDetails] = useState({ name: '', email: '', password: '' })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  })
  const [error, setError] = useState(null)

  const { setUser } = useUser()

  const handleChange = e => {
    const fieldName = e.target.name
    const value = e.target.value

    setDetails({ ...details, [fieldName]: value })
  }

  const handleBlur = e => {
    const fieldName = e.target.name

    setTouched({ ...touched, [fieldName]: true })
  }

  const handleLogin = e => {
    e.preventDefault()
    // Check whether errors exist in form
    if (isError(errors)) {
      return
    }

    const url = `${process.env.REACT_APP_API_DOMAIN}/users/login`
    const data = details
    const config = {
      method: 'POST',
      url,
      data,
      withCredentials: true
    }

    setError(null)
    axios(config)
      .then(({ data: { user, accessToken } }) => {
        setAccessToken(accessToken)
        setUser(user)
      })
      .catch(error => {
        setError(error.response.data.error)
      })
  }

  const errors = validateLogin(details)

  return (
    <>
      <form onSubmit={handleLogin}>
        {error && (
          <FormGroup>
            <ErrorMessage error={error} />
          </FormGroup>
        )}
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={details.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <ErrorMessage error={errors.email} />
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={details.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <ErrorMessage error={errors.password} />
          )}
        </FormGroup>
        <FormGroup>
          <Button variant="primary" disabled={isError(errors)}>
            Login
          </Button>
        </FormGroup>
      </form>
      <ButtonGroup>
        <Button as={Link} width="100" to="/">
          Forgot Password
        </Button>
        <Button as={Link} width="100" variant="secondary" to="/register">
          Create Account
        </Button>
      </ButtonGroup>
    </>
  )
}

export { Login }
