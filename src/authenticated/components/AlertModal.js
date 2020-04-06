import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import 'styled-components/macro'
import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription
} from '@reach/alert-dialog'
import '@reach/dialog/styles.css'

import { below } from '../../shared/utilities/Breakpoints'
import { Button, FormGroup, Label, Input } from '../../shared/elements'

function AlertModal({ className, children, code, setShowDialog }) {
  const actionRef = useRef()
  const clipRef = useRef()

  const close = () => setShowDialog(false)

  const copyToClipboard = e => {
    clipRef.current.select()
    document.execCommand('copy')
    e.target.focus()
    close()
  }

  return (
    <AlertDialog leastDestructiveRef={actionRef} className={className}>
      <AlertDialogLabel>
        <h2>Copy Game Code </h2>
      </AlertDialogLabel>
      <AlertDialogDescription>
        <p>
          Share this code with the one you wish to play{' '}
          <span role="img" aria-label="Smile">
            😄
          </span>
        </p>
      </AlertDialogDescription>
      <FormGroup>
        <Label
          css={css`
            margin-bottom: 1rem;
          `}
        >
          <Input type="text" name="clip" value={code} ref={clipRef} readOnly />
        </Label>
        <Button variant="primary" onClick={copyToClipboard} ref={actionRef}>
          Copy 'N' Close
        </Button>
      </FormGroup>
      <FormGroup></FormGroup>
    </AlertDialog>
  )
}

export default styled(AlertModal)`
  div:not(:last-child) {
    margin-bottom: 3rem;
  }

  &[data-reach-dialog-content] {
    background: #243b53;
    padding: 5rem;
    width: 60vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  ${below.med`
    &[data-reach-dialog-content] {
      width: 80vw;
      padding: 5rem 3rem;
    }
  `}

  ${below.small`
    &[data-reach-dialog-content] {
      width: 90vw;
      padding: 5rem 2rem;
    }

    ${Button} {
      width: 100%;
    }
  `}
`
