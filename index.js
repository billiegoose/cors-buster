'use strict'
const url = require('url')
const pkg = require('./package.json')
const {send} = require('micro')
const allowHeaders = [
  'accept-encoding',
  'accept-language',
  'accept',
  'access-control-allow-origin',
  'authorization',
  'cache-control',
  'connection',
  'content-length',
  'content-type',
  'dnt',
  'pragma',
  'range',
  'referer',
  'user-agent',
  'x-http-method-override',
  'x-requested-with',
]
const cors = require('micro-cors')({allowHeaders})
const fetch = require('node-fetch')

async function service (req, res) {
  let q = url.parse(req.url, true).query
  if (!q.href) {
    res.setHeader('content-type', 'text/html')
    let html = `<!DOCTYPE html>
    <html>
      <title>400 Error</title>
      <h1>Missing 'href' parameter.</h1>
      <h2>See docs: <a href="https://npmjs.org/package/${pkg.name}">https://npmjs.org/package/${pkg.name}</a></h2>
      <h2>Supported HTTP Methods</h2>
      <ul>
        <li>All - OPTIONS, GET, POST, PUT, DELETE, etc</li>
      </ul>
      <h2>Supported Query Parameters</h2>
      <ul>
        <li>?href=&lt;href&gt; - <i>required</i>, the URL you are trying to reach</li>
        <li>&method=&lt;method&gt; - <i>optional</i>, the HTTP method to use</li>
        <li>&&lt;HTTP Header&gt;=&lt;value&gt; - <i>optional</i>, set any supported HTTP headers</li>
      </ul>
      <h2>Supported Headers</h2>
      <ul>
        ${allowHeaders.map(x => `<li>${x}</li>`).join('\n')}
      </ul>
    </html>
    `
    return send(res, 400, html)
  }
  let headers = {}
  for (let h of allowHeaders) {
    if (req.headers[h]) {
      headers[h] = q[h] || req.headers[h]
    }
  }
  let f = await fetch(q.href, {
    method: q.method || req.method,
    headers,
    body: req
  })
  f.body.pipe(res)
}

module.exports = cors(service)