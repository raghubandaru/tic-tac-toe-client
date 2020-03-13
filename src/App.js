import React, { lazy } from 'react'

import { useUser } from './shared/context/User'

const UnAuthenticated = lazy(() => import('./unauthenticated'))
const Authenticated = lazy(() => import('./authenticated'))

function App() {
  const { user } = useUser()

  if (user) {
    return <Authenticated />
  } else {
    return <UnAuthenticated />
  }
}

export default App
