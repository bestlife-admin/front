const puppeteer = require('puppeteer');
var glob = require("glob")
resolve = require('path').resolve
const paths                                                             = require('./paths');
const {config} = require('./core');

const host = 'http://localhost:3000'

glob(`${resolve('../')}/${paths.src.tmp.files.replace('./', '')}.html`, async function (er, files) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page
    .on('pageerror', ({message}) => {
      console.log('=JAVASCRIPT ERROR===========================================')
      console.log(message)
      console.log(page._target.url())
      console.log(' ')
    })
    .on('response', response => {
      if (response._resourceType !== 'xhr' && response.status() === 404) {
        console.log('=MEDIA ERROR===========================================')
        console.log(`ReferenceError: Not found ${response._request._resourceType} ${response._request._url}`)
        console.log(`    at: ${response._request._frame._url}`)
        console.log(' ')
      }
    })

  for (const url in files) {
    await page.goto(`${host}${files[url].replace(`${resolve('../')}${config.directoryNames.src.replace('.', '')}/.tmp`, '')}`)
  }

  await browser.close()
})
