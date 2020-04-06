import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Button } from '../../shared/elements'

function Square({ disabled, handleBoardClick, isWinningIndex, value }) {
  return (
    <SquareButton
      disabled={disabled}
      onClick={handleBoardClick}
      isWinningIndex={isWinningIndex}
    >
      <span>{value}</span>
    </SquareButton>
  )
}

const SquareButton = styled(Button)`
  margin: 0.5rem;
  height: 6rem;
  width: 6rem;
  background: #102a43;
  color: #54d1db;
  ${props =>
    props.isWinningIndex &&
    css`
      background: #54d1db;
      color: #102a43;
    `}
  span {
    font-size: 3rem;
    font-family: 'Aladin', cursive;
  }
`

Square.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleBoardClick: PropTypes.func.isRequired,
  isWinningIndex: PropTypes.bool.isRequired,
  value: PropTypes.oneOf(['O', 'X'])
}

export default Square
