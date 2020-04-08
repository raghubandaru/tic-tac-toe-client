import React, { useState } from 'react'
import axios from 'axios'
import { css } from 'styled-components'
import 'styled-components/macro'

import { ErrorMessage } from '../../shared/components'
import { Button, FormGroup, Input, Label } from '../../shared/elements'
import {
  isError,
  validateForgotPassword
} from '../../shared/utilities/validation'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState({ email: false })
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleBlur = e => {
    const fieldName = e.target.name

    setTouched({ ...touched, [fieldName]: true })
  }

  const handleForgotPassword = e => {
    e.preventDefault()
    // Check whether errors exist in form
    if (isError(errors)) {
      return
    }

    const url = `${process.env.REACT_APP_API_DOMAIN}/users/reset_password/generate_token`
    const data = { email }
    const config = {
      method: 'POST',
      url,
      data
    }

    setError(null)
    axios(config)
      .then(({ data: { message } }) => {
        console.log(message)
        setMessage(message)
      })
      .catch(error => {
        setError(error.response.data.error)
      })
  }

  const errors = validateForgotPassword(email)

  if (message) {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <p>{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleForgotPassword}>
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
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && <ErrorMessage error={errors.email} />}
      </FormGroup>
      <FormGroup>
        <Button variant="primary" disabled={isError(errors)}>
          Send
        </Button>
      </FormGroup>
    </form>
  )
}

export { ForgotPassword }
