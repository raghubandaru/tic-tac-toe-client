import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Header, Main } from '../shared/components'
import { Landing, Login, Register } from './components'
import Layout from '../shared/layout'

function UnAuthenticated({ setNewRegister }) {
  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <h1>Header Title</h1>
          <p>Header Description</p>
        </Header>
        <Main>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register setNewRegister={setNewRegister} />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Main>
      </Layout>
    </BrowserRouter>
  )
}

export default UnAuthenticated
