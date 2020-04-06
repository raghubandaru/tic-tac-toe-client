import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import io from 'socket.io-client'

import AlertModal from './AlertModal'
import { getAccessToken } from '../../shared/helpers/token'
import { useUser } from '../../shared/context/User'
import StyledPlayer from './Player'
import StyledBoard from './Board'

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
    const config = {
      url: `http://localhost:5000/games/${id}`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    axios(config)
      .then(({ data }) => {
        if (data.game.status === 'over') {
          history.push('/dashboard')
        } else {
          console.log('data', data)
          if (data.game.player1 && data.game.status === 'waiting') {
            setShowDialog(true)
          }
          setLoading(false)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [history, id])

  useEffect(() => {
    socket = io(ENDPOINT, {
      query: {
        token: accessToken
      }
    })

    socket.emit('join', { gameId: id })

    socket.on('game_update', ({ game }) => {
      setGame(game)
    })

    socket.on('click_update', ({ updatedGame }) => {
      setGame(updatedGame)
    })

    socket.on('disconnect_update', ({ updatedGame }) => {
      setGame(updatedGame)
    })

    return () => {
      console.log(id)
      socket.emit('disconnect', { gameId: id })

      socket.off()
    }
  }, [ENDPOINT, accessToken, id, userId])

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
    console.log(playerTurn === userId)

    return (
      <div className={className}>
        <StyledPlayer
          isTurn={game.player1 === playerTurn && game.status === 'active'}
          isWinner={game.winner === game.player1}
          playerId={game.player1}
          playerStatus={game.player1Status}
        />
        <StyledBoard
          handleBoardClick={handleBoardClick}
          disabled={game.status !== 'active' || playerTurn !== userId}
          board={game.board}
          winningIndexes={game.winningIndexes}
        />
        {game.player2 ? (
          <StyledPlayer
            isTurn={game.player2 === playerTurn && game.status === 'active'}
            isWinner={game.winner === game.player2}
            playerId={game.player2}
            playerStatus={game.player2Status}
            reverse={true}
          />
        ) : (
          'Loading...'
        )}
        {showDialog && (
          <AlertModal setShowDialog={setShowDialog} code={game.code} />
        )}
      </div>
    )
  } else {
    return null
  }
}

Gameplay.propTypes = {
  className: PropTypes.string.isRequired
}

export { StyledGameplay }
