import React, { useEffect, useState } from 'react'
import axios from 'axios'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import {
  Container,
  DialogMenu,
  Logo,
  Nav,
  WrapperBody,
  WrapperHead
} from '../components'
import { useUser } from '../context/User'
import { Button } from '../elements'
import { getAccessToken, setAccessToken } from '../helpers/token'
import { below } from '../utilities/Breakpoints'

function Layout({ children, className }) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)

  const { user, setUser } = useUser()

  const close = () => setMenuOpen(false)

  const handleResize = e => setInnerWidth(e.target.innerWidth)

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 300)

    window.addEventListener('resize', debouncedHandleResize)

    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [])

  const handleLogout = () => {
    const config = {
      method: 'POST',
      url: `${process.env.REACT_APP_API_DOMAIN}/users/logout`,
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
    <div className={className}>
      <WrapperHead>
        <Container>
          <Nav>
            <Logo>Tic Tac Toe</Logo>
            {user ? (
              innerWidth > 600 ? (
                <div className="pullright">
                  <Button
                    as={NavLink}
                    activeClassName="activeClassName"
                    to="/dashboard"
                  >
                    Dashboard
                  </Button>
                  <Button
                    as={NavLink}
                    activeClassName="activeClassName"
                    to="/profile"
                  >
                    Profile
                  </Button>
                  <Button onClick={handleLogout}>Logout</Button>
                </div>
              ) : (
                <Button onClick={() => setMenuOpen(true)}>Menu</Button>
              )
            ) : (
              <Button
                as={NavLink}
                activeClassName="activeClassName"
                to="/login"
              >
                Login
              </Button>
            )}
          </Nav>
        </Container>
      </WrapperHead>
      <WrapperBody>
        <Container>{children}</Container>
      </WrapperBody>
      <DialogMenu
        isOpen={isMenuOpen}
        close={close}
        handleLogout={handleLogout}
      />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  className: PropTypes.string.isRequired
}

export default styled(Layout)`
  .activeClassName {
    border-bottom: 3px solid #3298b4;
  }

  .pullright {
    & > * {
      margin-left: 1rem;

      ${below.med`
        margin-left: 1rem;
      `}
    }
  }
`
