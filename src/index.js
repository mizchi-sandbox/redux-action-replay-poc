/* @flow */
import * as React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

const el = document.querySelector('main')
function render() {
  const App = require('./components/App').default
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    el
  )
}

render()
// eslint-disable-next-line
if (module.hot) module.hot.accept('./components/App', render)
