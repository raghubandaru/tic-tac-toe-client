import React, { lazy, useState } from 'react'

import { useUser } from './shared/context/User'

const UnAuthenticated = lazy(() => import('./unauthenticated'))
const Authenticated = lazy(() =>
  import(/* webpackPrefetch: true */ './authenticated')
)

function App() {
  const [newRegister, setNewRegister] = useState(false)

  const { user } = useUser()

  if (user) {
    return (
      <Authenticated
        newRegister={newRegister}
        setNewRegister={setNewRegister}
      />
    )
  } else {
    return <UnAuthenticated setNewRegister={setNewRegister} />
  }
}

export default App
