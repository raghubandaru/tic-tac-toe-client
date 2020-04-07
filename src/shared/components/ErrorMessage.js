import styled from 'styled-components'
import React from 'react'

function ErrorMessage({ className, error }) {
  return <span className={className}>{error}</span>
}

const StyledErrorMessage = styled(ErrorMessage)`
  background: #f29b9b;
  border-radius: 100px;
  color: #610404;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
`

export { StyledErrorMessage as ErrorMessage }
