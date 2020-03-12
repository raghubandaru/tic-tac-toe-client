import React from 'react'

import Layout from '../shared/layout'
import { Header, Main } from '../shared/components'

function UnAuthenticated() {
  return (
    <Layout>
      <Header>
        <h1>Header Title</h1>
        <p>Header Description</p>
      </Header>
      <Main>
        <p>Main Content</p>
      </Main>
    </Layout>
  )
}

export default UnAuthenticated
