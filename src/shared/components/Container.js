import styled from 'styled-components'

import { below } from '../utilities/Breakpoints'

export const Container = styled.div`
  max-width: 600px;
  width: 90vw;
  ${below.small`
    width: 90%;
  `}
`
