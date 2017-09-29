/* @flow */
import * as React from 'react'
import { Provider } from 'react-redux'
import createStore from '../store/create'
import Counter from './Counter'

global.__store = null
export default function App() {
  const store = createStore()
  global.__store = store
  return (
    <Provider store={store}>
      <div>
        <h1>App</h1>
        <Counter />
      </div>
    </Provider>
  )
}
