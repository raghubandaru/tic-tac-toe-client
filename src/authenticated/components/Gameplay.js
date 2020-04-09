import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import io from 'socket.io-client'

import AlertModal from './AlertModal'
import { getAccessToken } from '../../shared/helpers/token'
import { useUser } from '../../shared/context/User'
import Player from './Player'
import Board from './Board'
import { Header, Main } from '../../shared/components'

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
    return 'Loading...'
  }

  if (game) {
    const playerTurn = game.step % 2 === 0 ? game.player1 : game.player2

    return (
      <>
        <Header
          title="Gameplay"
          quote="Line up X or O horizontally, vertically or diagonally"
        />
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
            {game.player2 ? (
              <Player
                isTurn={game.player2 === playerTurn && game.status === 'active'}
                isWinner={game.winner === game.player2}
                playerId={game.player2}
                totalPlayerConnections={game.player2Connections.length}
                reverse={true}
              />
            ) : (
              'Loading...'
            )}
            {showDialog && (
              <AlertModal setShowDialog={setShowDialog} code={game.code} />
            )}
          </div>
        </Main>
      </>
    )
  } else {
    return null
  }
}

Gameplay.propTypes = {
  className: PropTypes.string.isRequired
}

export { StyledGameplay as Gameplay }
