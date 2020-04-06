import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import { Container, Logo, Nav, WrapperBody, WrapperHead } from '../components'
import { useUser } from '../context/User'
import { getAccessToken, setAccessToken } from '../helpers/token'
import { Button } from '../elements'

function Layout({ children }) {
  const { user, setUser } = useUser()

  const handleLogout = () => {
    const config = {
      method: 'POST',
      url: 'http://localhost:5000/users/logout',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      },
      withCredentials: true
    }

    axios(config).then(() => {
      setAccessToken('')
      setUser(null)
    })
  }

  return (
    <div>
      <WrapperHead>
        <Container>
          <Nav>
            <Logo>Tic Tac Toe</Logo>
            {user && <Button onClick={handleLogout}>Logout</Button>}
          </Nav>
        </Container>
      </WrapperHead>
      <WrapperBody>
        <Container>{children}</Container>
      </WrapperBody>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default Layout
