import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { HollowDotsSpinner } from 'react-epic-spinners'

function Connection({ className, status }) {
  return (
    <div className={className}>
      <h2>{status}</h2>
      <HollowDotsSpinner
        color={status === 'Reconnecting' ? '#d64545' : '#54d1db'}
      />
    </div>
  )
}

Connection.propTypes = {
  className: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Loading', 'Reconnecting', 'Waiting'])
}

Connection.defaultProps = {
  status: 'Waiting'
}

export default styled(Connection)`
  width: 16rem;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #102a43;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
  }
`
