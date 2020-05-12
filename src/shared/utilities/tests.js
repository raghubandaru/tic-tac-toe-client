import { fireEvent } from '@testing-library/react'

export const dirty = input => {
  fireEvent.click(input)
  fireEvent.blur(input)
}

export const enterValidDetails = (input, value) => {
  fireEvent.change(input, { target: { value } })
}

export const testData = {
  name: 'Test',
  email: 'test@test.com',
  password: 'test'
}

export const testInitialData = {
  message: 'Please check email'
}

export const testAfterSubmissionData = {
  message: 'Password reset success'
}

export const testPasswordData = {
  password: 'test',
  confirmPassword: 'test'
}

export const testWrongPasswordData = {
  password: 'test',
  confirmPassword: 'other'
}
