import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Main } from '../shared/components'
import Layout from '../shared/layout'
import { Dashboard, StyledGameplay } from './components'

function Authenticated({ newRegister, setNewRegister }) {
  return (
    <BrowserRouter>
      <Layout>
        <Main>
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
            <Route>
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </Main>
      </Layout>
    </BrowserRouter>
  )
}

export default Authenticated
