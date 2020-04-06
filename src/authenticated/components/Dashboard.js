import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import { css } from 'styled-components'
import 'styled-components/macro'

import { Button, FormGroup, Input, Label } from '../../shared/elements'
import { getAccessToken } from '../../shared/helpers/token'
import DialogUpload from './DialogUpload'

function Dashboard({ newRegister, setNewRegister }) {
  const [newGame, setNewGame] = useState('')
  const [joinGame, setJoinGame] = useState('')
  const [copySuccess, setCopySuccess] = useState('Copy code')
  const [isLoading, setLoading] = useState(true)

  const clipRef = useRef(null)

  const history = useHistory()

  const close = () => {
    setNewRegister(false)
  }

  useEffect(() => {
    const config = {
      url: `http://localhost:5000/games/active`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    axios(config)
      .then(({ data }) => {
        if (data.game) {
          history.push(`/dashboard/${data.game._id}`)
        } else {
          setLoading(false)
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [history])

  const handleJoinGame = e => {
    e.preventDefault()

    const config = {
      method: 'PATCH',
      url: `http://localhost:5000/games/${joinGame}`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    axios(config)
      .then(({ data: { updatedGame } }) => {
        history.push(`/dashboard/${updatedGame._id}`)
      })
      .catch(error => console.log(error))
  }

  const handleCreateGame = () => {
    const config = {
      method: 'POST',
      url: 'http://localhost:5000/games',
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    axios(config)
      .then(({ data: { game } }) => {
        // history.push(`/dashboard/${game._id}`)
        setNewGame(game)
      })
      .catch(error => console.log(error))
  }

  const copyToClipboard = e => {
    clipRef.current.select()
    document.execCommand('copy')
    e.target.focus()
    setCopySuccess('Copied!')
  }

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: calc(60vh - 10rem);
        `}
      >
        <form onSubmit={handleJoinGame}>
          <FormGroup>
            <Label htmlFor="joinGame">Invited by someone?</Label>
            <Input
              type="text"
              placeholder="Paste the code here"
              name="joinGame"
              id="joinGame"
              value={joinGame}
              onChange={e => setJoinGame(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button secondary>Join here</Button>
          </FormGroup>
        </form>
        <hr
          css={css`
            border: none;
            border-top: 2px dashed #102a43;
          `}
        />
        <div>
          {newGame ? (
            <>
              <FormGroup>
                <Label htmlFor="clip" />
                <Input
                  type="text"
                  name="clip"
                  value={newGame._id}
                  ref={clipRef}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Button secondary onClick={copyToClipboard}>
                  {copySuccess}
                </Button>
              </FormGroup>
              <FormGroup>
                <Button primary as={Link} to={`/dashboard/${newGame._id}`}>
                  Go to game
                </Button>
              </FormGroup>
            </>
          ) : (
            <FormGroup>
              <Label>Wanna Start a game? click below</Label>
              <Button primary onClick={handleCreateGame}>
                Create Game
              </Button>
            </FormGroup>
          )}
        </div>
      </div>
      <DialogUpload isOpen={newRegister} close={close} />
    </>
  )
}

export { Dashboard }
