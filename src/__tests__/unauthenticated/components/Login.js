import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'
import { BrowserRouter } from 'react-router-dom'

import { UserContext } from '../../../shared/context/User'
import { dirty, enterValidDetails } from '../../../shared/utilities/tests'
import { loginUser as mockLoginUser } from '../../../unauthenticated/api'
import { Login } from '../../../unauthenticated/components'

jest.mock('../../../unauthenticated/api')

let container,
  testData,
  email,
  password,
  login,
  getByLabelText,
  getByText,
  queryByText

beforeEach(() => {
  testData = {
    name: 'Test',
    email: 'test@test.com',
    password: 'test'
  }

  mockLoginUser.mockResolvedValueOnce({
    data: {
      accessToken: 'jwt-access-token',
      user: { name: testData.name, email: testData.email }
    }
  })

  let query = render(
    <UserContext.Provider
      value={{
        user: null,
        setUser: jest.fn(() => ({ name: testData.name, email: testData.email }))
      }}
    >
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </UserContext.Provider>
  )

  getByLabelText = query.getByLabelText
  getByText = query.getByText
  queryByText = query.queryByText
  container = query.container

  email = getByLabelText(/email/i)
  password = getByLabelText(/password/i)
  login = getByText(/login/i, { selector: 'button' })
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
  expect(login).toBeDisabled()
})

test('should render valid error messages after inputs are dirty and clear after filling valid details', () => {
  dirty(email)
  expect(queryByText(/email is required/i)).toBeTruthy()

  enterValidDetails(email, testData.email)
  expect(queryByText(/email is required/i)).toBeFalsy()

  dirty(password)
  expect(queryByText(/password is required/i)).toBeTruthy()

  enterValidDetails(password, testData.password)
  expect(queryByText(/password is required/i)).toBeFalsy()
})

test('should submit form successfully with valid data', async () => {
  enterValidDetails(email, testData.email)
  enterValidDetails(password, testData.password)

  fireEvent.click(login)

  expect(mockLoginUser).toHaveBeenCalledWith({
    email: testData.email,
    password: testData.password
  })
  expect(mockLoginUser).toHaveBeenCalledTimes(1)
})
