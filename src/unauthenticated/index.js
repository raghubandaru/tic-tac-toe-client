import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { Landing, Login, Register } from './components'
import { Header, Main } from '../shared/components'
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

UnAuthenticated.propTypes = {
  setNewRegister: PropTypes.func.isRequired
}

export default UnAuthenticated
