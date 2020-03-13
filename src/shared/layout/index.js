import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { Container, Logo, Nav, WrapperBody, WrapperHead } from '../components'
import { getAccessToken, setAccessToken } from '../helpers/token'
import { useUser } from '../context/User'
import { Button } from '../elements'

function Layout({ children }) {
  const { user, setUser } = useUser()
  const { push } = useHistory()

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
      setUser(null)
      setAccessToken('')
      push('/login')
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

export default Layout
