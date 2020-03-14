import React from 'react'
import styled from 'styled-components'
import 'styled-components/macro'

import { Button } from '../../shared/elements'

const StyledBoard = styled(Board)`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    ${Button} {
      padding: 1rem;
      margin: 0.5rem;
      background: #102a43;
      width: 8rem;
      span {
        font-size: 3rem;
      }
    }
  }
`

function Board({ className }) {
  return (
    <div className={className}>
      <div>
        <Button>
          <span>X</span>
        </Button>
        <Button>
          <span>X</span>
        </Button>
        <Button>
          <span>X</span>
        </Button>
      </div>
      <div>
        <Button>
          <span>X</span>
        </Button>
        <Button>
          <span>X</span>
        </Button>
        <Button>
          <span>X</span>
        </Button>
      </div>
      <div>
        <Button>
          <span>X</span>
        </Button>
        <Button>
          <span>X</span>
        </Button>
        <Button>
          <span>X</span>
        </Button>
      </div>
    </div>
  )
}

export default StyledBoard
