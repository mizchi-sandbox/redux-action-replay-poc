/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import { RECORDING_START, RECORDING_END } from './constants'

let el = null
export default function renderUI(props: {
  recording: boolean,
  result: ?string,
  dispatch: Function
}) {
  const mounted = !!document.querySelector('.__recorder')
  if (!mounted) {
    el = document.createElement('div')
    el.className = '__recorder'
    el.style.position = 'fixed'
    el.style.top = '3px'
    el.style.right = '3px'
    el.style.width = '150px'
    el.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    document.body && document.body.prepend(el)
  }

  let textareaRef = null
  ReactDOM.render(
    <div>
      <p>Recorder</p>
      {props.recording ? (
        <button onClick={() => props.dispatch({ type: RECORDING_END })}>
          Record end
        </button>
      ) : (
        <button onClick={() => props.dispatch({ type: RECORDING_START })}>
          Record start
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
            Copy to clipboard
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
