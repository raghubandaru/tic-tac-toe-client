import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import Global from './Global'
import { Loading } from './shared/components'
import { UserProvider } from './shared/context/User'
import * as serviceWorker from './serviceWorker'
import 'react-image-crop/dist/ReactCrop.css'

ReactDOM.render(
  <>
    <Global />
    <UserProvider>
      <Suspense fallback={<Loading variant="fullheight" />}>
        <App />
      </Suspense>
    </UserProvider>
  </>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
