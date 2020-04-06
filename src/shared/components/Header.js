import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Header({ className, title, quote }) {
  return (
    <header className={className}>
      <h1>{title}</h1>
      <p>{quote}</p>
    </header>
  )
}

Header.defaultProps = {
  title: 'Realtime Tic Tac Toe',
  quote: 'Enroll and start playing with your family and friends'
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
  quote: PropTypes.string
}

const StyledHeader = styled(Header)`
  text-align: center;
  margin: 6rem 0 4rem 0;

  h1 {
    margin-bottom: 2rem;
  }

  p {
    font-style: italic;
  }
`

export { StyledHeader as Header }
