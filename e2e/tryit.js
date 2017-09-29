/* @flow */
import path from 'path'
import puppeteer from 'puppeteer'

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3355');
  await page.screenshot({path: path.join(__dirname, './screenshots/example.png')})

  await browser.close();
})();
