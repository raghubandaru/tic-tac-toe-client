import React from 'react'
import styled, { css } from 'styled-components'
import 'styled-components/macro'

import { useUser } from '../../shared/context/User'

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

  img {
    filter: grayscale(100%);
    mix-blend-mode: multiply;
  }
`

function Player({ className, reverse }) {
  const { user } = useUser()
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
          src={`http://res.cloudinary.com/raghubandaru/image/upload/v${user.avatar}`}
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
        <h2>{user.name}</h2>
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
