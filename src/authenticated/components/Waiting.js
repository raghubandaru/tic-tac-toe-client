import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { HollowDotsSpinner } from 'react-epic-spinners'

function Waiting({ className, status }) {
  return (
    <div className={className}>
      <h2>{status}</h2>
      <HollowDotsSpinner color={status === 'Waiting' ? '#54d1db' : '#d64545'} />
    </div>
  )
}

Waiting.propTypes = {
  className: PropTypes.string.isRequired,
  height: PropTypes.number,
  variant: PropTypes.oneOf(['fullheight', 'insidelayout'])
}

Waiting.defaultProps = {
  status: 'Waiting'
}

export default styled(Waiting)`
  width: 16rem;
  height: ${props => props.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #102a43;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
  }

  ${props =>
    props.variant === 'fullheight' &&
    css`
      height: 100vh;
    `}

  ${props =>
    props.variant === 'insidelayout' &&
    css`
      height: calc(100vh - 6rem);
    `}
`
