/* @flow */
import run from 'redux-automator/runner'

const scenario = require('./scenarios/test-actions.json')
run(scenario, {
  screenshot: true
})
