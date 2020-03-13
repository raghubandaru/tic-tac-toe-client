import React, { lazy } from 'react'

import Layout from './shared/layout'
import { useUser } from './shared/context/User'

const UnAuthenticated = lazy(() => import('./unauthenticated'))

function App() {
  const { user } = useUser()
  return <Layout>{user ? <p>Dashboard</p> : <UnAuthenticated />}</Layout>
}

export default App
