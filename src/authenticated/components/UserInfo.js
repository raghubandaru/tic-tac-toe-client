import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useUser } from '../../shared/context/User'

function UserInfo({ className }) {
  const { user } = useUser()

  return (
    <div className={className}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

UserInfo.propTypes = {
  className: PropTypes.string.isRequired
}

export default styled(UserInfo)`
  p {
    font-style: italic;
  }

  & > * {
    margin-bottom: 2rem;
  }
`
