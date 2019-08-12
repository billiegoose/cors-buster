# cors-buster
When you need a file, but the headers ain't good, who you gonna call? CORS Buster!

## What is this?

This is the software ~running on https://cors-buster-tbgktfqyku.now.sh~ (Update: I had to shut it down after the bandwidth exceeded the free tier of Now), a free
service for AJAX users struggling to work around the fact that many websites
do not implement CORS headers, even for static content.

## What it does

Say you tried to do this AJAX call and got this lovely error:

```
window.fetch('http://nodejs.org/dist/v6.10.2/node-v6.10.2-linux-x64.tar.gz')

Fetch API cannot load http://nodejs.org/dist/v6.10.2/node-v6.10.2-linux-x64.tar.gz. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://example.org' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
Uncaught (in promise) TypeError: Failed to fetch
```

You can do this instead, and now there's no error:

```
window.fetch('https://cors-buster-tbgktfqyku.now.sh/nodejs.org/dist/v6.10.2/node-v6.10.2-linux-x64.tar.gz')
```

## Is this safe?

CORS is designed to prevent a 3rd party (Eve) from doing evil things to Alice
using her browser to make HTTP requests to Bob, essentially impersonating Alice.
Browsers prevent JavaScript from making this kind of Cross-Origin AJAX Request
by default. But if this server is making the request *on behalf* of your
JavaScript, there is no way we could be impersonating Alice. Alice is safe.
Bob was never protected in the first place. Eve has better things to do with
her time.

## But I need to POST/PUT/etc with data?

That works too! Just make an OPTIONS/POST/PUT/DELETE/etc request and it will be forwarded.
If you can only make GET requests, you can provide a `method` query parameter and
the server will make it that kind of request instead.

## Supported headers

If there's a way to whitelist ALL headers, let me know. The one's I've explicitly added
so far are:

#### Request Headers:

- accept-encoding
- accept-language
- accept
- access-control-allow-origin
- authorization
- cache-control
- connection
- content-length
- content-type
- dnt
- pragma
- range
- referer
- user-agent
- x-http-method-override
- x-requested-with

#### Response Headers:

- accept-ranges
- age
- cache-control
- content-length
- content-language
- content-type
- date
- etag
- expires
- last-modified
- pragma
- server
- transfer-encoding
- vary
- x-github-request-id

## That is nice, I want to run my own server

Sure thing, just do:

```
git clone https://github.com/wmhilton/cors-buster
cd cors-buster
npm install
PORT=80 npm start
```

## No, I meant I want to deploy it to zeit.now.sh

Even easier, just do:

```
now wmhilton/cors-buster
```

## License

This work is released under [The MIT License](https://opensource.org/licenses/MIT)
