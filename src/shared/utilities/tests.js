import { fireEvent } from '@testing-library/react'

export const dirty = input => {
  fireEvent.click(input)
  fireEvent.blur(input)
}

export const enterValidDetails = (input, value) => {
  fireEvent.change(input, { target: { value } })
}
