// Create web server
// 1. http module
// 2. create server
// 3. route
// 4. response
// 5. listen

// 1. http module
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const comments = require('./comments.js');

// 2. create server
const app = http.createServer();

// 3. route
app.on('request', (req, res) => {
  // console.log(req.url);
  // console.log(req.method);
  // console.log(req.headers);
  // console.log(req.httpVersion);
  // console.log(req.socket.remoteAddress);
  // console.log(req.socket.remotePort);

  // 1. home page
  if (req.url === '/' || req.url === '/index.html') {
    const filepath = path.normalize(__dirname + '/static/index.html');
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/html;charset=utf-8'
        });
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf-8'
        });
        res.end(data);
      }
    });
  }
  // 2. static resource
  else if (req.url.startsWith('/static')) {
    const filepath = path.normalize(__dirname + req.url);
    fs.readFile(filepath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/html;charset=utf-8'
        });
        res.end('<h1>404 Not Found</h1>');
      } else {
        const extname = path.extname(filepath);
        const mimeType = require('./mime.json')[extname];
        res.writeHead(200, {
          'Content-Type': mimeType
        });
        res.end(data);
      }
    });
  }
  // 3. api
  else if (req.url.startsWith('/api')) {
    // 1. get method
    if (req.method === 'GET') {
      // 1. get all comments
      if (req.url === '/api/comments') {
        res.writeHead(200, {
          'Content-Type': 'application/json;charset=utf-8'
        });