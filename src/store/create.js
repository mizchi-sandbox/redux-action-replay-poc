/* @flow */
import { createStore, applyMiddleware } from 'redux'
import reduxPromise from 'redux-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from '../reducers'

declare var performance
declare var __store

let recording = false
let actionSeries: any = null

export const RECORDING_START = 'recording/start'
export const RECORDING_END = 'recording/end'

let el = null
function renderRecorderUI(props: { recording: boolean, result: ?string }) {
  const mounted = !!document.querySelector('.__recorder')
  if (!mounted) {
    el = document.createElement('div')
    el.className = '__recorder'
    el.style.position = 'fixed'
    el.style.top = '3px'
    el.style.right = '3px'
    el.style.width = '150px'
    el.style.backgroundColor = 'wheat'
    document.body && document.body.prepend(el)
  }

  let textareaRef = null
  ReactDOM.render(
    <div>
      <p>Recorder</p>
      {props.recording ? (
        <button onClick={() => __store.dispatch({ type: RECORDING_END })}>
          End
        </button>
      ) : (
        <button onClick={() => __store.dispatch({ type: RECORDING_START })}>
          Start
        </button>
      )}
      {props.result ? (
        <p>
          <button
            onClick={() => {
              textareaRef && textareaRef.select()
              document.execCommand('copy')
            }}
          >
            Copy to clipboardData
          </button>
          <textarea
            readOnly
            value={props.result}
            style={{ minHeight: '300px' }}
            ref={ref => (textareaRef = ref)}
          />
        </p>
      ) : null}
    </div>,
    el
  )
}

renderRecorderUI({ recording: false, result: undefined })

const recorder = store => next => action => {
  if (!recording && action.type === RECORDING_START) {
    console.info('recording:start')
    recording = true
    renderRecorderUI({ recording, result: undefined })
    actionSeries = [
      {
        dispatchedAction: {
          type: RECORDING_START,
          payload: {
            state: store.getState()
          }
        },
        timestamp: performance.now()
      }
    ]
  } else if (action.type === RECORDING_END) {
    console.info('recording:end')
    recording = false
    actionSeries.push({
      dispatchedAction: {
        type: RECORDING_END,
        payload: {
          state: store.getState()
        }
      },
      timestamp: performance.now()
    })
    const seriarized = JSON.stringify(actionSeries, undefined, 2)
    renderRecorderUI({ recording, result: seriarized })
    console.log(seriarized)
  } else if (recording) {
    console.info('recording:record', action)
    actionSeries.push({
      dispatchedAction: action,
      timestamp: performance.now()
    })
  }
  // console.log('before: %O', store.getState())
  next(action)
}

export default () =>
  createStore(reducer, undefined, applyMiddleware(reduxPromise, recorder))
