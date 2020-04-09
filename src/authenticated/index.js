import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import Layout from '../shared/layout'
import { Dashboard, Profile, Gameplay } from './components'

function Authenticated({ newRegister, setNewRegister }) {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/games/:id">
            <Gameplay />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard
              newRegister={newRegister}
              setNewRegister={setNewRegister}
            />
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
