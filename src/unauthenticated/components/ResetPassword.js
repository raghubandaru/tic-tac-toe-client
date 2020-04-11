import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { css } from 'styled-components'
import 'styled-components/macro'

import { ErrorMessage, Loading } from '../../shared/components'
import { Button, FormGroup, Input, Label } from '../../shared/elements'
import {
  isError,
  validateResetPassword
} from '../../shared/utilities/validation'

function ResetPassword() {
  const [isLoading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState(null)
  const [details, setDetails] = useState({
    password: '',
    confirmPassword: ''
  })
  const [touched, setTouched] = useState({
    password: false,
    confirmPassword: false
  })

  const { userId, resetToken } = useParams()

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_DOMAIN}/users/reset_password/${userId}/${resetToken}`
    const config = {
      url
    }

    setError(null)
    axios(config)
      .then(({ data: { message } }) => {
        setMessage(message)
        setLoading(false)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setLoading(false)
      })
  }, [resetToken, userId])

  const handleChange = e => {
    const fieldName = e.target.name
    const value = e.target.value

    setDetails({ ...details, [fieldName]: value })
  }

  const handleBlur = e => {
    const fieldName = e.target.name

    setTouched({ ...touched, [fieldName]: true })
  }

  const handleChangePassword = e => {
    e.preventDefault()
    // Check whether errors exist in form
    if (isError(errors)) {
      return
    }

    const url = `${process.env.REACT_APP_API_DOMAIN}/users/reset_password/change_password`
    const data = { ...details, userId }
    const config = {
      method: 'POST',
      url,
      data
    }

    setError(null)
    axios(config)
      .then(({ data: { message } }) => setSuccessMessage(message))
      .catch(error => setError(error.response.data.error))
  }

  if (isLoading) {
    return <Loading height={230} />
  } else if (successMessage || errorMessage) {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <p>{successMessage || errorMessage}</p>
        <br />
        <Button as={Link} to="/login">
          Login now
        </Button>
      </div>
    )
  }

  const errors = validateResetPassword(details)

  return (
    message && (
      <form onSubmit={handleChangePassword}>
        {error && (
          <FormGroup>
            <ErrorMessage error={error} />
          </FormGroup>
        )}
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
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={details.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <ErrorMessage error={errors.confirmPassword} />
          )}
        </FormGroup>
        <FormGroup>
          <Button variant="primary" disabled={isError(errors)}>
            Submit
          </Button>
        </FormGroup>
      </form>
    )
  )
}

export { ResetPassword }
