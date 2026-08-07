const http = require('http');

const recipes = [
  {
    id: 1,
    name: 'Pizza',
  },
  {
    id: 2,
    name: 'Pasta',
  },
];

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.end(
      `
      <a href="/recipes/1">Pizza</a>`,
    );
    return;
  }

  if (req.method === 'GET') {
    const splitUrl = req.url.split('/');

    const resource = splitUrl[1];
    const id = Number(splitUrl[2]);

    if (resource === 'recipes') {
      console.log(resource);
      console.log(id);

      for (let obj of recipes) {
        if (obj.id === id) {
          console.log(obj);

          res.end(JSON.stringify(obj));
          return;
        }
      }

      res.end('Recipe not found');
      return;
    }
  }

  res.end('Route not found');
});

server.listen(3000, () => {
  console.log('server is running');
});
