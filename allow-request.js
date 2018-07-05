const url = require('url')

function isPreflight (req, u) {
  return req.method === 'OPTIONS'
}

function isInfoRefs (req, u) {
  return req.method === 'GET' && u.pathname.endsWith('/info/refs') && (u.query.service === 'git-upload-pack' || u.query.service === 'git-receive-pack')
}

function isPull (req, u) {
  return req.method === 'POST' && req.headers['content-type'] === 'application/x-git-upload-pack-request' && u.pathname.endsWith('git-upload-pack')
}

function isPush (req, u) {
  return req.method === 'POST' && req.headers['content-type'] === 'application/x-git-receive-pack-request' && u.pathname.endsWith('git-receive-pack')
}

module.exports = function allow (req, u) {
  return (isPreflight(req, u) || isInfoRefs(req, u) || isPull(req, u) || isPush(req, u))
}
