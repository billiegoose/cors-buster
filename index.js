'use strict'
const url = require('url')
const pkg = require('./package.json')
const {send} = require('micro')
const allowHeaders = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept',
  'Range',
]
const cors = require('micro-cors')({allowHeaders})
const fetch = require('node-fetch')

async function service (req, res) {
  let q = url.parse(req.url, true).query
  if (!q.href) {
    res.setHeader('Content-Type', 'text/html')
    let html = `<!DOCTYPE html>
    <html>
      <title>400 Error</title>
      <h1>Missing 'href' parameter.</h1>
      <h1>Note: An optional 'method' parameter is also supported.</h1>
      <h2>See docs: <a href="https://npmjs.org/package/${pkg.name}">https://npmjs.org/package/${pkg.name}</a></h2>
    </html>
    `
    return send(res, 400, html)
  }
  let headers = {}
  for (let h of allowHeaders) {
    if (req.headers[h.toLowerCase()]) {
      headers[h] = req.headers[h.toLowerCase()]
    }
  }
  let f = await fetch(q.href, {
    method: q.method || 'GET',
    headers
  })
  f.body.pipe(res)
}

module.exports = cors(service)