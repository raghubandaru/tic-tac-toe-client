import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from '@testing-library/react'
import { axe } from 'jest-axe'

import {
  dirty,
  enterValidDetails,
  testData
} from '../../../shared/utilities/tests'
import { forgotPassword as mockForgotPassword } from '../../../unauthenticated/api'
import { ForgotPassword } from '../../../unauthenticated/components'

jest.mock('../../../unauthenticated/api')

let container, email, send, getByLabelText, getByText, queryByText

beforeEach(() => {
  let query = render(<ForgotPassword />)

  getByLabelText = query.getByLabelText
  getByText = query.getByText
  queryByText = query.queryByText
  container = query.container

  email = getByLabelText(/email/i)
  send = getByText(/send/i)
})

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})

test('the form is accesible', async () => {
  const accessibility = await axe(container)

  expect(accessibility.violations).toHaveLength(0)
})

test('should render form initially in disabled state', () => {
  expect(send).toBeDisabled()
})

test('should render valid error messages after inputs are dirty and clear after filling valid details', () => {
  dirty(email)
  expect(queryByText(/email is required/i)).toBeTruthy()

  enterValidDetails(email, testData.email)
  expect(queryByText(/email is required/i)).toBeFalsy()
})

test('should submit form successfully with valid data and change in UI', async () => {
  mockForgotPassword.mockResolvedValueOnce({
    data: {
      message: 'Password Reset Success'
    }
  })

  enterValidDetails(email, testData.email)

  fireEvent.click(send)

  const passwordResetMessage = await waitForElement(() =>
    queryByText(/password Reset success/i)
  )

  expect(mockForgotPassword).toHaveBeenCalledWith({
    email: testData.email
  })
  expect(mockForgotPassword).toHaveBeenCalledTimes(1)
  expect(passwordResetMessage).toBeTruthy()
})
