import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  waitForElement
} from '@testing-library/react'
import { axe } from 'jest-axe'
import { BrowserRouter } from 'react-router-dom'

import {
  dirty,
  enterValidDetails,
  testInitialData,
  testAfterSubmissionData,
  testPasswordData,
  testWrongPasswordData
} from '../../../shared/utilities/tests'
import {
  resetPassword as mockResetPassword,
  verifyToken as mockVerifyToken
} from '../../../unauthenticated/api'
import { ResetPassword } from '../../../unauthenticated/components'

jest.mock('../../../unauthenticated/api')

let container, password, confirmPassword, getByLabelText, queryByText, submit

beforeEach(async () => {
  mockVerifyToken.mockResolvedValueOnce({
    data: {
      message: testInitialData.message
    }
  })

  let query = render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  )

  getByLabelText = query.getByLabelText
  queryByText = query.queryByText
  container = query.container

  submit = await waitForElement(() => queryByText(/submit/i))

  password = getByLabelText(/^password/i, { selector: 'input' })
  confirmPassword = getByLabelText(/confirm password/i)
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
  expect(submit).toBeDisabled()
})

test('should render valid error messages after inputs are dirty and clear after filling valid details', () => {
  dirty(password)
  expect(queryByText(/password is required/i)).toBeTruthy()

  enterValidDetails(password, testPasswordData.password)
  expect(queryByText(/password is required/i)).toBeFalsy()

  dirty(confirmPassword)
  expect(queryByText(/confirm password is required/i)).toBeTruthy()

  enterValidDetails(confirmPassword, testPasswordData.confirmPassword)
  expect(queryByText(/confirm password is required/i)).toBeFalsy()
})

test('should render form submit in disabled state if passwords donot match', () => {
  dirty(password)
  enterValidDetails(password, testWrongPasswordData.password)

  dirty(confirmPassword)
  enterValidDetails(confirmPassword, testWrongPasswordData.confirmPassword)

  expect(queryByText(/passwords do not match/i)).toBeTruthy()
  expect(submit).toBeDisabled()
})

test('should submit form successfully with valid data and change in UI', async () => {
  mockResetPassword.mockResolvedValueOnce({
    data: {
      message: testAfterSubmissionData.message
    }
  })

  enterValidDetails(password, testPasswordData.password)
  enterValidDetails(confirmPassword, testPasswordData.confirmPassword)

  fireEvent.click(submit)

  const successMessage = await waitForElement(() =>
    queryByText(/password reset success/i)
  )

  expect(mockResetPassword).toHaveBeenCalledWith(testPasswordData)
  expect(mockResetPassword).toHaveBeenCalledTimes(1)
  expect(successMessage).toBeTruthy()
})
