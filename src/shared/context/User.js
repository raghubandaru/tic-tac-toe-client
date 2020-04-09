import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import { setAccessToken } from '../helpers/token'

const UserContext = createContext()

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const config = {
      method: 'POST',
      url: `${process.env.REACT_APP_API_DOMAIN}/users/refresh_token`,
      withCredentials: true
    }

    axios(config)
      .then(({ data: { accessToken } }) => {
        const config = {
          url: `${process.env.REACT_APP_API_DOMAIN}/users/me`,
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
        axios(config).then(({ data: { user } }) => {
          setAccessToken(accessToken)
          setUser(user)
          setLoading(false)
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)

UserProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { UserProvider, useUser }
