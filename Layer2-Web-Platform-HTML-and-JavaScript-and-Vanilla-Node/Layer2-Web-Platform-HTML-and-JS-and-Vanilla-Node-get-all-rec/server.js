const http = require('http');
const { stringify } = require('querystring');
const { json } = require('stream/consumers');

const recipes = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Pasta' },
];
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    //route1 serve home page
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
        <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
        <h1 class="heading">Welcome Welcome !!</h1>
        </body>
        </html>`);
      return;
    }
    //route 2 serve css
    if (req.url === '/styles.css') {
      res.setHeader('Content-Type', 'text/css');
      res.end(` 
      .heading {
        background-color: greenyellow;
        color: blue;
      }
  `);
      return;
    }
    res.end('route not found');
    return;
  }
  res.end('method not allowed');

  // if (req.url === req.url.startswith('/recipes')) {
  //   res.setHeader('
  //     Content-Type', 'application/json')
  // res.end(stringify.json(recipes))
  // return;
  // }
  // res.end('route not found');
  // return;
  // }
  // res.end('method not allowed');
});

server.listen(3000, () => {
  console.log('server is running');
});
