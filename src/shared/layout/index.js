import React from 'react'
import { Container, Logo, Nav, WrapperBody, WrapperHead } from '../components'

function Layout({ children }) {
  return (
    <div>
      <WrapperHead>
        <Container>
          <Nav>
            <Logo>Tic Tac Toe</Logo>
            <p>Log(IN/OUT)</p>
          </Nav>
        </Container>
      </WrapperHead>
      <WrapperBody>
        <Container>{children}</Container>
      </WrapperBody>
    </div>
  )
}

export default Layout
