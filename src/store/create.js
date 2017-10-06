/* @flow */
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from '../reducers'
import { isPupetteerEnv, createAutomateStore, recorder } from 'redux-action-replay'

export default () => {
  if (isPupetteerEnv()) {
    return createAutomateStore(reducer)
  }

  return createStore(
    reducer,
    undefined,
    applyMiddleware(reduxPromise, recorder({ ui: true }))
  )
}
