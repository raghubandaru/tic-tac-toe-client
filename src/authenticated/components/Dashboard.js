import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { css } from 'styled-components'
import 'styled-components/macro'

import { Button, FormGroup, Input, Label } from '../../shared/elements'
import { getAccessToken } from '../../shared/helpers/token'

function Dashboard() {
  const [joinGame, setJoinGame] = useState('')
  const history = useHistory()

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
        history.push(`/dashboard/${game._id}`)
      })
      .catch(error => console.log(error))
  }

  return (
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
        <FormGroup>
          <Label>Wanna Start a game? click below</Label>
          <Button primary onClick={handleCreateGame}>
            Create Game
          </Button>
        </FormGroup>
      </div>
    </div>
  )
}

export { Dashboard }
