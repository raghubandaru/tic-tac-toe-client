import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled, { css } from 'styled-components'
import 'styled-components/macro'

// import { useUser } from '../../shared/context/User'
import { getAccessToken } from '../../shared/helpers/token'
import { below } from '../../shared/utilities/Breakpoints'

const Statistic = styled.span`
  font-size: 1.3rem;
  letter-spacing: 0.5rem;
`
const Statistics = styled.div`
  display: flex;
  justify-content: space-around;
`

const StyledPlayer = styled(Player)`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  padding: 2rem;
  align-self: ${props => (props.reverse ? 'flex-end' : 'flex-start')};
  background: #102a43;
  ${props =>
    props.isTurn &&
    css`
      border-left: 2px solid #54d1db;
    `}

  ${props =>
    props.isWinner &&
    css`
      border: 2px solid #54d1db;
    `}

  img {
    filter: grayscale(100%);
    mix-blend-mode: multiply;
  }

  ${below.small`
    align-self: center;
  `}
`

function Player({ className, reverse, playerId, playerStatus }) {
  console.log('playerId', playerId)
  const [player, setPlayer] = useState(null)
  const [total, setTotal] = useState(0)
  const [win, setWin] = useState(0)
  const [draw, setDraw] = useState(0)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const config1 = {
      url: `${process.env.REACT_APP_API_DOMAIN}/users/${playerId}`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    const config2 = {
      url: `${process.env.REACT_APP_API_DOMAIN}/games/stats?user=${playerId}&draw=true`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    const config3 = {
      url: `${process.env.REACT_APP_API_DOMAIN}/games/stats?user=${playerId}&winner=true`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    const config4 = {
      url: `${process.env.REACT_APP_API_DOMAIN}/games/stats?user=${playerId}`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    Promise.all([
      axios(config1),
      axios(config2),
      axios(config3),
      axios(config4)
    ]).then(res => {
      console.log(res)
      setPlayer(res[0].data.user)
      setDraw(res[1].data.games)
      setWin(res[2].data.games)
      setTotal(res[3].data.games)
      setLoading(false)
    })
  }, [playerId])

  if (isLoading) {
    return 'Loading...'
  }

  if (playerStatus === 'disconnected') {
    return <div>Player disconnected</div>
  }

  return (
    playerStatus === 'connected' && (
      <div className={className}>
        <div
          css={css`
            width: 7.5rem;
            height: 7.5rem;
            border-radius: 50%;
            overflow: hidden;
            background: #b6f8fd;
            margin-right: ${reverse ? '0px' : '1rem'};
            margin-left: ${reverse ? '1rem' : '0px'};
          `}
        >
          <img
            src={`http://res.cloudinary.com/raghubandaru/image/upload/v${player.avatar}`}
            alt="Avatar"
            width="100%"
          />
        </div>
        <div
          css={css`
            align-self: center;
            h2 {
              margin-bottom: 1rem;
            }
          `}
        >
          <h2>{player.name}</h2>
          <Statistics>
            <Statistic>{total}T</Statistic>
            <Statistic>{win}W</Statistic>
            <Statistic>{draw}D</Statistic>
          </Statistics>
        </div>
      </div>
    )
  )
}

export default StyledPlayer
