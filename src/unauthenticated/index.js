import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Header, Main } from '../shared/components'
import { Landing, Login, Register } from './components'

function UnAuthenticated() {
  return (
    <>
      <Header>
        <h1>Header Title</h1>
        <p>Header Description</p>
      </Header>
      <Main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </Main>
    </>
  )
}

export default UnAuthenticated
