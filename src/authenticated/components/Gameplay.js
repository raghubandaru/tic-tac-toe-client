import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import styled, { css } from 'styled-components'
import 'styled-components/macro'

import AlertModal from './AlertModal'
import Board from './Board'
import Player from './Player'
import { Loading, Main } from '../../shared/components'
import { getAccessToken } from '../../shared/helpers/token'
import { useUser } from '../../shared/context/User'
import { below } from '../../shared/utilities/Breakpoints'

let socket

const StyledGameplay = styled(Gameplay)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: calc(60vh - 10rem);
`

function Gameplay({ className }) {
  const [game, setGame] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)

  const { id } = useParams()
  const history = useHistory()
  const { user } = useUser()
  const userId = user._id
  const accessToken = getAccessToken()
  const ENDPOINT = process.env.REACT_APP_API_DOMAIN

  useEffect(() => {
    socket = io(ENDPOINT, {
      query: {
        token: accessToken
      }
    })

    socket.emit('join', { gameId: id })

    socket.on('game_update', ({ game }) => {
      // Redirect to dashboard if game is not active or doesn't exist
      if (!game || game.status === 'over') {
        return history.push('/dashboard')
      }

      setGame(game)

      // Show code for waiting games
      if (game.status === 'waiting') {
        setShowDialog(true)
      }

      setLoading(false)
    })

    socket.on('click_update', ({ updatedGame }) => {
      setGame(updatedGame)
    })

    socket.on('disconnect_update', ({ updatedGame }) => {
      setGame(updatedGame)
    })

    return () => socket.close()
  }, [ENDPOINT, accessToken, history, id, userId])

  const handleBoardClick = index => {
    if (game.board[index]) {
      return
    }

    socket.emit('click', { gameId: id, index })
  }

  if (isLoading) {
    return <Loading variant="insidelayout" />
  }

  if (game) {
    const playerTurn = game.step % 2 === 0 ? game.player1 : game.player2

    return (
      <div
        css={css`
          margin-top: 6rem;

          ${below.med`
            margin-top: 4rem;
          `}

          ${below.small`
            margin-top: 2rem;
          `}
        `}
      >
        <Main>
          <div className={className}>
            <Player
              isTurn={game.player1 === playerTurn && game.status === 'active'}
              isWinner={game.winner === game.player1}
              playerId={game.player1}
              totalPlayerConnections={game.player1Connections.length}
            />
            <Board
              handleBoardClick={handleBoardClick}
              disabled={game.status !== 'active' || playerTurn !== userId}
              board={game.board}
              winningIndexes={game.winningIndexes}
            />
            <Player
              isTurn={game.player2 === playerTurn && game.status === 'active'}
              isWinner={game.winner === game.player2}
              playerId={game.player2}
              totalPlayerConnections={game.player2Connections.length}
              reverse={true}
            />
            {showDialog && (
              <AlertModal setShowDialog={setShowDialog} code={game.code} />
            )}
          </div>
        </Main>
      </div>
    )
  } else {
    return null
  }
}

Gameplay.propTypes = {
  className: PropTypes.string.isRequired
}

export { StyledGameplay as Gameplay }
