import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

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

  const { id } = useParams()
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
      setGame(game)
    })

    socket.on('click_update', ({ updatedGame }) => {
      setGame(updatedGame)
    })

    return () => {
      console.log('disconnected', socket.id)
      socket.emit('disconnect')

      socket.off()
    }
  }, [ENDPOINT, accessToken, id, userId])

  const handleBoardClick = index => {
    if (game.board[index]) {
      return
    }

    socket.emit('click', { gameId: id, index })
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
            reverse={true}
          />
        ) : (
          'Loading...'
        )}
      </div>
    )
  } else {
    return null
  }
}

export { StyledGameplay }

// import React, { useState, useEffect } from 'react'
// import styled from 'styled-components'
// import { useParams } from 'react-router-dom'
// import io from 'socket.io-client'

// import { getAccessToken } from '../../shared/helpers/token'
// import { useUser } from '../../shared/context/User'
// import StyledPlayer from './Player'
// import StyledBoard from './Board'

// let socket

// const StyledGameplay = styled(Gameplay)`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   min-height: calc(60vh - 10rem);
// `

// function Gameplay({ className }) {
//   const [game, setGame] = useState(null)
//   const [board, setBoard] = useState(null)
//   const [step, setStep] = useState(null)
//   const [turn, setTurn] = useState(false)
//   const [playerTurn, setPlayerTurn] = useState(null)
//   const [winner, setWinner] = useState(null)
//   const [winningIndexes, setWinningIndexes] = useState(null)

//   const { id } = useParams()
//   const { user } = useUser()
//   const userId = user._id
//   const accessToken = getAccessToken()
//   const ENDPOINT = process.env.REACT_APP_API_DOMAIN

//   useEffect(() => {
//     socket = io(ENDPOINT, {
//       query: {
//         token: accessToken
//       }
//     })

//     socket.emit('join', { gameId: id })

//     socket.on('game_update', ({ board, step, turn, ...game }) => {
//       setGame(game)
//       setWinningIndexes(game.result.winningIndexes)
//       setBoard(board)
//       setStep(step)
//       setPlayerTurn(turn)
//       userId === turn ? setTurn(true) : setTurn(false)
//     })

//     socket.on('click_update', ({ updatedGame, uid }) => {
//       console.log('updated game', updatedGame)
//       const { board, step, turn } = updatedGame

//       setBoard(board)
//       setStep(step)
//       setPlayerTurn(updatedGame.turn)

//       userId === turn ? setTurn(true) : setTurn(false)

//       if (updatedGame.result.winningIndexes.length) {
//         setWinner(uid)
//         setWinningIndexes(updatedGame.result.winningIndexes)
//       } else {
//         if (step === 9) {
//           setWinner('Draw')
//         }
//       }
//     })

//     return () => {
//       console.log('disconnected', socket.id)
//       socket.emit('disconnect')

//       socket.off()
//     }
//   }, [ENDPOINT, accessToken, id, userId])

//   const handleBoardClick = index => {
//     if (board[index]) {
//       return
//     }
//     console.log('clicked')
//     let value
//     if (step % 2 === 0) {
//       value = 'X'
//     } else {
//       value = 'O'
//     }

//     socket.emit('click', { userId, gameId: id, index, value })
//   }

//   if (game === null || board === null || step === null) {
//     console.log('--')
//     return null
//   }

//   return (
//     <div className={className}>
//       <StyledPlayer
//         playerId={game.player1}
//         playerTurn={playerTurn}
//         turn={turn}
//         winner={winner}
//       />
//       <StyledBoard
//         handleBoardClick={handleBoardClick}
//         disabled={!turn || step >= 9}
//         board={board}
//         step={step}
//         winningIndexes={winningIndexes}
//       />
//       {game.player2 ? (
//         <StyledPlayer
//           playerId={game.player2}
//           playerTurn={playerTurn}
//           turn={turn}
//           winner={winner}
//           reverse={true}
//         />
//       ) : (
//         'Loading...'
//       )}
//     </div>
//   )
// }

// export { StyledGameplay }
