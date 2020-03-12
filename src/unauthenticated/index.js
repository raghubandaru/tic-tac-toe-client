import React from 'react'

import { Header, Main } from '../shared/components'

function UnAuthenticated() {
  return (
    <>
      <Header>
        <h1>Header Title</h1>
        <p>Header Description</p>
      </Header>
      <Main>
        <p>Main Content</p>
      </Main>
    </>
  )
}

export default UnAuthenticated
