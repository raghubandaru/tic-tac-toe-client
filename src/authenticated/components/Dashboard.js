import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { css } from 'styled-components'
import 'styled-components/macro'

import DialogUpload from './DialogUpload'
import { ErrorMessage, Header, Loading, Main } from '../../shared/components'
import { Button, FormGroup, Input, Label } from '../../shared/elements'
import { getAccessToken } from '../../shared/helpers/token'
import { isError, validateJoinGame } from '../../shared/utilities/validation'

function Dashboard({ newRegister, setNewRegister }) {
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [joinGame, setJoinGame] = useState('')
  const [touched, setTouched] = useState({
    joinGame: false
  })

  const history = useHistory()

  const handleBlur = e => {
    const fieldName = e.target.name

    setTouched({ ...touched, [fieldName]: true })
  }

  const close = () => {
    setNewRegister(false)
  }

  useEffect(() => {
    const config = {
      url: `${process.env.REACT_APP_API_DOMAIN}/games/active`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    axios(config)
      .then(({ data }) => {
        if (data.game) {
          history.push(`/games/${data.game._id}`)
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
      url: `${process.env.REACT_APP_API_DOMAIN}/games/${joinGame}`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    axios(config)
      .then(({ data: { updatedGame } }) => {
        history.push(`/games/${updatedGame._id}`)
      })
      .catch(error => {
        setError(error.response.data.error)
      })
  }

  const handleCreateGame = () => {
    const config = {
      method: 'POST',
      url: `${process.env.REACT_APP_API_DOMAIN}/games`,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    }

    axios(config)
      .then(({ data: { game } }) => {
        history.push(`/games/${game._id}`)
      })
      .catch(() => {})
  }

  if (isLoading) {
    return <Loading variant="insidelayout" />
  }

  const errors = validateJoinGame(joinGame)

  return (
    <>
      <Header
        title="Start Playing"
        quote="Got the code paste below or create game"
      />
      <Main>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: calc(60vh - 10rem);
          `}
        >
          <form onSubmit={handleJoinGame}>
            {error && (
              <FormGroup>
                <ErrorMessage error={error} />
              </FormGroup>
            )}
            <FormGroup>
              <Label htmlFor="joinGame">Invited by someone?</Label>
              <Input
                type="text"
                placeholder="Paste the code here"
                name="joinGame"
                id="joinGame"
                value={joinGame}
                onChange={e => setJoinGame(e.target.value)}
                onBlur={handleBlur}
              />
              {errors.joinGame && touched.joinGame && (
                <ErrorMessage error={errors.joinGame} />
              )}
            </FormGroup>
            <FormGroup>
              <Button variant="secondary" disabled={isError(errors)}>
                Join here
              </Button>
            </FormGroup>
          </form>
          <hr
            css={css`
              border: none;
              border-top: 2px dashed #102a43;
            `}
          />
          <div>
            <FormGroup>
              <Label>Wanna Start a game? click below</Label>
              <Button variant="primary" onClick={handleCreateGame}>
                Create Game
              </Button>
            </FormGroup>
          </div>
        </div>
        <DialogUpload isOpen={newRegister} close={close} />
      </Main>
    </>
  )
}

Dashboard.propTypes = {
  newRegister: PropTypes.bool.isRequired,
  setNewRegister: PropTypes.func.isRequired
}

export { Dashboard }
