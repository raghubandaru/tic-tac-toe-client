import styled from 'styled-components'

import { below } from '../utilities/Breakpoints'

export const Main = styled.main`
  background: #243b53;
  margin-bottom: 2rem;
  padding: 6rem;
  width: 100%;

  ${below.med`
    padding: 4rem;
  `}

  ${below.small`
    padding: 4rem 1rem;
  `}
`
