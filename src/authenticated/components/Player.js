import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import 'styled-components/macro'

import { getAccessToken } from '../../shared/helpers/token'
import { below } from '../../shared/utilities/Breakpoints'

function Player({ className, reverse, playerId, totalPlayerConnections }) {
  const [player, setPlayer] = useState(null)
  const [stats, setStats] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const config1 = {
      url: `${process.env.REACT_APP_API_DOMAIN}/users/${playerId}`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    const config2 = {
      url: `${process.env.REACT_APP_API_DOMAIN}/games/stats?user=${playerId}`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    Promise.all([axios(config1), axios(config2)]).then(response => {
      setPlayer(response[0].data.user)
      setStats(response[1].data.stats)
      setLoading(false)
    })
  }, [playerId])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <div className={className}>
      {totalPlayerConnections === 0 ? (
        <div>
          <h2>Disconnected</h2>
        </div>
      ) : (
        <>
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
              src={`https://res.cloudinary.com/raghubandaru/image/upload/v${player.avatar}`}
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
              <Statistic>{stats.total}T</Statistic>
              <Statistic>{stats.win}W</Statistic>
              <Statistic>{stats.draw}D</Statistic>
            </Statistics>
          </div>
        </>
      )}
    </div>
  )
}

Player.propTypes = {
  className: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  reverse: PropTypes.bool,
  totalPlayerConnections: PropTypes.number
}

const Statistic = styled.span`
  font-size: 1.3rem;
  letter-spacing: 0.5rem;
`

const Statistics = styled.div`
  display: flex;
  justify-content: space-around;
`

export default styled(Player)`
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

    ${props =>
      props.totalPlayerConnections === 0 &&
      css`
        border: 2px solid red;
      `}

  img {
    filter: grayscale(100%);
    mix-blend-mode: multiply;
  }

  ${below.small`
    align-self: center;
  `}
`
