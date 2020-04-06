import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export const Button = styled.button`
  background: none;
  border: none;
  color: #54d1db;
  cursor: pointer;
  font-family: inherit;
  font-weight: normal;
  font-size: 1.5rem;
  line-height: inherit;
  padding: 1rem 2rem;
  text-decoration: none;
  text-align: center;
  width: ${props => props.width && `${props.width}%`};

  ${props =>
    props.disabled &&
    css`
      opacity: 0.8;
      cursor: not-allowed;
    `}

  ${props =>
    props.variant === 'brand' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${props =>
    props.variant === 'primary' &&
    css`
      background: #54d1db;
      color: #102a43;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 2px;
    `}

  ${props =>
    props.variant === 'secondary' &&
    css`
      border: 2px solid #54d1db;
    `}
`

Button.propTypes = {
  variant: PropTypes.oneOf(['brand', 'primary', 'secondary'])
}
