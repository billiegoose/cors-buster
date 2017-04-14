# cors-buster
When you need a file, but the headers ain't good, who you gonna call? CORS Buster!

## What is this?

This is the software running on https://cors-buster.now.sh, a free
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
window.fetch('http://cors-buster.now.sh/?href=https://nodejs.org/dist/v6.10.2/node-v6.10.2-linux-x64.tar.gz')
```

## Is this safe?

CORS is designed to prevent a 3rd party (Eve) from doing evil things to Alice
using her browser to make HTTP requests to Bob, essentially impersonating Alice.
Browsers prevent JavaScript from making this kind of Cross-Origin AJAX Request
by default. But if this server is making the request *on behalf* of your
JavaScript, there is no way we could be impersonating Alice. Alice is safe.
Bob was never protected in the first place. Eve has better things to do with
her time.

## Supported headers

If there's a way to whitelist ALL headers, let me know. The one's I've explicitly added
so far are:

- x-requested-with
- access-control-allow-origin
- x-http-method-override
- content-type
- authorization
- accept
- connection
- pragma
- cache-control
- dnt
- referer
- accept-encoding
- accept-language
- range

## That is nice, I want to run my own server

Sure thing, just do:

```
git clone https://github.com/wmhilton/cors-buster
cd cors-buster
npm install
PORT=80 npm start
```

## License

Copyright 2017 William Hilton.
Licensed under [The Unlicense](http://unlicense.org/).
