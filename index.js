'use strict'
const url = require('url')
const pkg = require('./package.json')
const {send} = require('micro')
const origin = process.env.ALLOW_ORIGIN
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
const exposeHeaders = [
  'accept-ranges',
  'age',
  'cache-control',
  'content-length',
  'content-language',
  'content-type',
  'date',
  'etag',
  'expires',
  'last-modified',
  'pragma',
  'server',
  'transfer-encoding',
  'vary',
  'x-github-request-id',
]
const fetch = require('node-fetch')
const cors = require('./micro-cors.js')({allowHeaders, exposeHeaders, origin})
const allow = require('./allow-request.js')

async function service (req, res) {
  let u = url.parse(req.url, true)

  if (u.pathname === '/') {
    res.setHeader('content-type', 'text/html')
    let html = `<!DOCTYPE html>
    <html>
      <title>@isomorphic-git/cors-proxy</title>
      <h1>@isomorphic-git/cors-proxy</h1>
      <h2>See docs: <a href="https://npmjs.org/package/${pkg.name}">https://npmjs.org/package/${pkg.name}</a></h2>
      <h2>Authenticity</h2>
      This is a publicly available service. As such you may wonder if it is safe to trust.
      You can inspect the source code that this server is running by visiting this page: <a href="/_src">/_src</a>.
      The deploys are immutable, so you can be sure that the code will never change.
      <h2>Logging</h2>
      The cloud hosting provider keeps log of all requests. That log is public and available on this page: <a href="/_logs">/_logs</a>.
      It records the URL, origin IP, referer, and user-agent. None of the sensitive HTTP headers (including those used for
      HTTP Basic Auth and HTTP Token auth) are ever logged.
    </html>
    `
    return send(res, 400, html)
  }

  if (!allow(req, u)) {
    // Don't waste my precious bandwidth
    return send(res, 403, '')
  }

  let headers = {}
  for (let h of allowHeaders) {
    if (req.headers[h]) {
      headers[h] = req.headers[h]
    }
  }

  let p = u.path
  let parts = p.match(/\/([^\/]*)\/(.*)/)
  let pathdomain = parts[1]
  let remainingpath = parts[2]
  console.log(`https://${pathdomain}/${remainingpath}`)
  let f = await fetch(
    `https://${pathdomain}/${remainingpath}`,
    {
      method: req.method,
      headers,
      body: (req.method !== 'GET' && req.method !== 'HEAD') ? req : undefined
    }
  )
  for (let h of exposeHeaders) {
    if (h === 'content-length') continue
    if (f.headers.has(h)) {
      res.setHeader(h, f.headers.get(h))
    }
  }
  f.body.pipe(res)
}

module.exports = cors(service)