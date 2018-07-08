# @isomorphic-git/cors-proxy

This is the software running on https://git-cors-proxy.now.sh, a free
service for users of isomorphic-git so you can clone and push repos in the browser.

It is derived from https://github.com/wmhilton/cors-buster with added restrictions to prevent abuse.

## Installation

```sh
npm install @isomorphic-git/cors-proxy
```

## Configuration

Environment variables:
- `PORT` the port to listen to
- `ALLOW_ORIGIN` the value for the 'Access-Control-Allow-Origin' CORS header


## License

This work is released under [The MIT License](https://opensource.org/licenses/MIT)
