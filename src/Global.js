import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

const Global = createGlobalStyle`
  ${normalize()}
  *, 
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    color: #f0f4f8;
    font-size: 62.5%;
    line-height: 1.4;
  }
  body {
    font-family: 'Roboto Mono', monospace;
    box-sizing: border-box;
  }
  h1 {
    font-size: 3rem;
    line-height: 1.1;
  }
  h2 {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  p {
    font-size: 1.6rem;
  }
`

export default Global
