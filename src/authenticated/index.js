import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Main } from '../shared/components'
import Layout from '../shared/layout'
import { Dashboard, StyledGameplay } from './components'

function Authenticated() {
  return (
    <BrowserRouter>
      <Layout>
        <Main>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
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
