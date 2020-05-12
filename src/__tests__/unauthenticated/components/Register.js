import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { axe } from 'jest-axe'
import { BrowserRouter } from 'react-router-dom'

import { UserContext } from '../../../shared/context/User'
import {
  dirty,
  enterValidDetails,
  testData
} from '../../../shared/utilities/tests'
import { registerUser as mockRegisterUser } from '../../../unauthenticated/api'
import { Register } from '../../../unauthenticated/components'

jest.mock('../../../unauthenticated/api')

let container,
  setNewRegister,
  name,
  email,
  password,
  register,
  getByLabelText,
  getByText,
  queryByText

beforeEach(() => {
  setNewRegister = jest.fn()

  let query = render(
    <UserContext.Provider
      value={{
        user: null,
        setUser: jest.fn(() => ({ name: testData.name, email: testData.email }))
      }}
    >
      <BrowserRouter>
        <Register setNewRegister={setNewRegister} />
      </BrowserRouter>
    </UserContext.Provider>
  )

  getByLabelText = query.getByLabelText
  getByText = query.getByText
  queryByText = query.queryByText
  container = query.container

  name = getByLabelText(/name/i)
  email = getByLabelText(/email/i)
  password = getByLabelText(/password/i)
  register = getByText(/register/i, { selector: 'button' })
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
  expect(register).toBeDisabled()
})

test('should render valid error messages after inputs are dirty and clear after filling valid details', () => {
  dirty(name)
  expect(queryByText(/name is required/i)).toBeTruthy()

  enterValidDetails(name, testData.name)
  expect(queryByText(/name is required/i)).toBeFalsy()

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
  mockRegisterUser.mockResolvedValueOnce({
    data: {
      accessToken: 'jwt-access-token',
      user: { name: testData.name, email: testData.email }
    }
  })

  enterValidDetails(name, testData.name)
  enterValidDetails(email, testData.email)
  enterValidDetails(password, testData.password)
  fireEvent.click(register)

  expect(mockRegisterUser).toHaveBeenCalledWith(testData)
  expect(mockRegisterUser).toHaveBeenCalledTimes(1)
})
