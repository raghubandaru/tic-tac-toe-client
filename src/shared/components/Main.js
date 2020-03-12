import styled from 'styled-components'

import { below } from '../../utilities/Breakpoints'

export const Main = styled.main`
  padding: 5rem 8rem;
  width: 100%;
  background: #243b53;
  min-height: 60vh;

  ${below.small`
    padding: 2rem;
  `}

  ${below.med`
    padding: 4rem;
  `}
`
