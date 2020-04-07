import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

import {
  Button,
  FormGroup,
  Input,
  Label,
  ButtonGroup
} from '../../shared/elements'
import { ErrorMessage } from '../../shared/components'
import { setAccessToken } from '../../shared/helpers/token'
import { useUser } from '../../shared/context/User'
import { isError, validateRegister } from '../../shared/utilities/validation'

function Register({ setNewRegister }) {
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

  const handleSignUp = e => {
    e.preventDefault()
    // Check whether errors exist in form
    if (isError(errors)) {
      return
    }

    const url = `${process.env.REACT_APP_API_DOMAIN}/users`
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
        setNewRegister(true)
        setUser(user)
      })
      .catch(error => {
        setError(error.response.data.error)
      })
  }

  const errors = validateRegister(details)

  return (
    <>
      <form onSubmit={handleSignUp}>
        {error && (
          <FormGroup>
            <ErrorMessage error={error} />
          </FormGroup>
        )}
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="name"
            name="name"
            id="name"
            value={details.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && <ErrorMessage error={errors.name} />}
        </FormGroup>
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
            Register
          </Button>
        </FormGroup>
      </form>
      <ButtonGroup>
        <Button as={Link} to="/login">
          Already Registered? Login here
        </Button>
      </ButtonGroup>
    </>
  )
}

Register.propTypes = {
  setNewRegister: PropTypes.func.isRequired
}

export { Register }
