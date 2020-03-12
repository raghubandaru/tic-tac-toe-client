import React from 'react'
import { Nav, Wrapper } from '../components'

function Layout({ children }) {
  return (
    <div>
      <Nav>
        <h1>Tic Tac Toe</h1>
      </Nav>
      <Wrapper>{children}</Wrapper>
    </div>
  )
}

export default Layout
