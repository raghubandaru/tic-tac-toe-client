import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Header, Main } from '../shared/components'
import Layout from '../shared/layout'
import { Dashboard, Gameplay } from './components'

function Authenticated() {
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <h1>Header Title</h1>
          <p>Header Description</p>
        </Header>
        <Main>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/:id">
              <Gameplay />
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
