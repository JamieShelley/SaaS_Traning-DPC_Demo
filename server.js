/* eslint-disable */
const next = require('next');

const { createServer } = require('http');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const CheckOrUpdateCSS = require('./CheckOrUpdateCSS.js');

const portNum = 8080

app.prepare().then(() => {
  console.log('App prepared, attempting run ...');

    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        app.render(req, res, '/b', query);
      } else {
        handle(req, res, parsedUrl);
      }
    }).listen(portNum, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:' + portNum);
    });
});