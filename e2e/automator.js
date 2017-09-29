/* @flow */
import path from 'path'
import puppeteer from 'puppeteer'
import data from './action-log'

declare var __store: any

const actionSeries = data.map(d => d.dispatchedAction)
//   { type: 'counter/add', payload: 1 },
//   { type: 'counter/add', payload: 2 },
//   { type: 'counter/add', payload: 3 }
// ]

console.log(actionSeries)

async function getPerformanceMetrics(page) {
  const data = await page._client.send('Performance.getMetrics')
  return data.metrics.reduce((acc, i) => ({ ...acc, [i.name]: i.value }), {})
}

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('http://localhost:3355')
  await page._client.send('Performance.enable')

  // console.log(await getPerformancemetrics(page))

  const results = []
  results.push({
    dispatchedAction: { type: '@puppeteer/init' },
    metrics: await getPerformanceMetrics(page)
  })
  for (const action of actionSeries) {
    await page.evaluate(_action => {
      __store.dispatch(_action)
    }, action)

    const index = actionSeries.indexOf(action)
    await page.screenshot({
      path: path.join(__dirname, `./screenshots/${index}.png`)
    })

    // console.log(await getPerformancemetrics(page))
    results.push({
      dispatchedAction: action,
      metrics: await getPerformanceMetrics(page)
    })
  }

  // console.log(await getPerformancemetrics(page))
  results.push({
    dispatchedAction: { type: '@puppeteer/end' },
    metrics: await getPerformanceMetrics(page)
  })
  await browser.close()

  // show results delta
  let prev = results.shift()
  let next: any = null

  // console.log('---', results)

  const targetKeys = Object.keys(prev.metrics)
  console.log('init', prev.dispatchedAction.type, prev.metrics)
  while ((next = results.shift())) {
    const delta = targetKeys.reduce((acc, key) => {
      const p = prev.metrics[key]
      const n = next.metrics[key]
      if (p !== n) {
        return { ...acc, [key]: n - p }
      } else {
        return acc
      }
    }, {})
    console.log('delta', next.dispatchedAction.type, delta)
    prev = next
  }
})()
