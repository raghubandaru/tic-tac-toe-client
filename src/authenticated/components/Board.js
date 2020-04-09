import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Square from './Square'

function Board({
  board,
  className,
  disabled,
  handleBoardClick,
  winningIndexes
}) {
  const renderSquare = i => {
    return (
      <Square
        disabled={disabled}
        isWinningIndex={winningIndexes !== null && winningIndexes.includes(i)}
        handleBoardClick={() => handleBoardClick(i)}
        value={board[i]}
      />
    )
  }

  return (
    <div className={className}>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

Board.propTypes = {
  board: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  handleBoardClick: PropTypes.func.isRequired,
  winningIndexes: PropTypes.array.isRequired
}

export default styled(Board)`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  > div {
    display: flex;
  }
`
