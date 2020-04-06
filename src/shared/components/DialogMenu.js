import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Dialog, DialogContent } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'

import { Button } from '../elements'

function DialogMenu({ className, close, handleLogout, isOpen }) {
  return (
    <Dialog
      aria-label="Navigation"
      className={className}
      isOpen={isOpen}
      onDismiss={close}
    >
      <Button className="close-button" onClick={close}>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>X</span>
      </Button>
      <DialogContent aria-label="Menu">
        <Button
          as={NavLink}
          activeClassName="activeClassName"
          to="/dashboard"
          onClick={close}
        >
          Home
        </Button>
        <Button
          as={NavLink}
          activeClassName="activeClassName"
          to="/profile"
          onClick={close}
        >
          Profile
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </DialogContent>
    </Dialog>
  )
}

DialogMenu.propTypes = {
  className: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

const StyledDialogMenu = styled(DialogMenu)`
  .activeClassName {
    font-weight: 700;
  }

  &[data-reach-dialog-content] {
    background: #243b53;
    width: 100vw;
    height: 100vh;
    margin: 0;
  }

  [data-reach-dialog-content] {
    background: #243b53;
    margin: 5rem auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    ${Button} {
      margin-bottom: 2rem;
    }
  }
`

export { StyledDialogMenu as DialogMenu }
