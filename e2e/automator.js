/* @flow */
import path from 'path'
import puppeteer from 'puppeteer'
import data from './action-log'

declare var __store: any

const actionSeries = data.map(d => d.dispatchedAction)

async function getPerformanceMetrics(page) {
  const data = await page._client.send('Performance.getMetrics')
  return data.metrics.reduce((acc, i) => ({ ...acc, [i.name]: i.value }), {})
}

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('http://localhost:3355')
  await page._client.send('Performance.enable')

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

    results.push({
      dispatchedAction: action,
      metrics: await getPerformanceMetrics(page)
    })
  }

  await browser.close()

  let prev = results.shift()
  let next: any = null

  const targetKeys = Object.keys(prev.metrics)
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
    console.log('delta >', next.dispatchedAction.type, delta)
    prev = next
  }
})()
