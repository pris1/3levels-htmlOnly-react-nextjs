const http = require('http');
const fs = require('fs');

const recipes = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Pasta' },
];
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    //route 1 home
    if (req.url === '/') {
      const html = fs.readFileSync('index.html');
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.end(html);
      return;
    }

    //route 2 css
    if (req.url === '/styles.css') {
      const css = fs.readFileSync('styles.css');
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(css);
      return;
    }

    //route 3
    if (req.url === '/app.js') {
      const js = fs.readFileSync('app.js');
      res.writeHead(200, {
        'Content-Type': 'application/javascript',
      });
      res.end(js);
      return;
    }

    //route 4 pathpar
    if (req.url.startsWith('/recipes/')) {
      const splitUrl = req.url.split('/');
      console.log(splitUrl);
      const resource = splitUrl[1];
      const splitUrlId = Number(splitUrl[2]);

      for (let recipe of recipes) {
        if (recipe.id === splitUrlId) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });

          res.end(JSON.stringify(recipe));
          return;
        }
      }

      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.end('Route not found');
      return;
    }
  }
});

server.listen(3000, () => {
  console.log('server is running');
});
