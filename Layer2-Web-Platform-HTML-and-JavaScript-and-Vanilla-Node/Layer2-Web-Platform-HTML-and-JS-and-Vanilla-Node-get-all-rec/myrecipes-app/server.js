const http = require('http');
const fs = require('fs');

const recipes = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Pasta' },
];

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === 'GET') {
    // Route 1 - Home page
    if (req.url === '/') {
      const html = fs.readFileSync('index.html');
      res.setHeader('Content-Type', 'text/html');

      res.end(html);

      return;
    }

    // Route 2 - CSS
    if (req.url === '/styles.css') {
      const css = fs.readFileSync('styles.css');
      res.setHeader('Content-Type', 'text/css');

      res.end(css);

      return;
    }

    // Route 3 - JavaScript
    if (req.url === '/app.js') {
      const js = fs.readFileSync('app.js');
      res.setHeader('Content-Type', 'application/javascript');

      res.end(js);

      return;
    }

    // Route 4 - API
    if (req.url === '/recipes') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(recipes));

      return;
    }

    res.statusCode = 404;
    res.end('Route not found');
    return;
  }

  res.statusCode = 405;
  res.end('Method not allowed');
});

server.listen(3000, () => {
  console.log('Server is running');
});
