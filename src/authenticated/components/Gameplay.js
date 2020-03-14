import React from 'react'
// import { useParams } from 'react-router-dom'
import { css } from 'styled-components'
import 'styled-components/macro'

import StyledPlayer from './Player'
import StyledBoard from './Board'

function Gameplay() {
  // const { id } = useParams()

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <StyledPlayer />
      <StyledBoard />
      <StyledPlayer reverse={true} />
    </div>
  )
}

export { Gameplay }
