import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Layout from '../shared/layout'
import { Dashboard, Profile, StyledGameplay } from './components'

function Authenticated({ newRegister, setNewRegister }) {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard
              newRegister={newRegister}
              setNewRegister={setNewRegister}
            />
          </Route>
          <Route exact path="/dashboard/:id">
            <StyledGameplay />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route>
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

Authenticated.propTypes = {
  newRegister: PropTypes.bool.isRequired,
  setNewRegister: PropTypes.func.isRequired
}

export default Authenticated
