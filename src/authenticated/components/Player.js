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

function Player({ className, reverse, playerId, winner }) {
  console.log('wI', winner, playerId)
  const [player, setPlayer] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const config = {
      url: `${process.env.REACT_APP_API_DOMAIN}/users/${playerId}`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }
    axios(config)
      .then(({ data: { user } }) => {
        setPlayer(user)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [playerId])

  if (isLoading) {
    return 'Loading...'
  }

  return (
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
          <Statistic>2W</Statistic>
          <Statistic>4L</Statistic>
          <Statistic>3D</Statistic>
        </Statistics>
      </div>
    </div>
  )
}

export default StyledPlayer
