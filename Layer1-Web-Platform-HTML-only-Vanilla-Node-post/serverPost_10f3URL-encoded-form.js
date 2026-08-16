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
  // GET / — home page
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="http://localhost:3000/recipes" method="post">
      <input name="name" placeholder="Enter recipe" />
      <button type="submit">Submit recipe</button>
    </form>
  </body>
</html>
`);
    return;
  }

  if (req.method === 'POST') {
    if (req.url === '/recipes') {
      let body = '';
      req.on('data', function (chunk) {
        body += chunk;
      });

      req.on('end', function () {
        const params = new URLSearchParams(body);
        console.log(params);
        const nameParam = params.get('name');
        const newRecipe = {
          id: recipes.length + 1,
          name: nameParam,
        };

        recipes.push(newRecipe);
        console.log('AFTER PUSH:');
        console.log(recipes);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newRecipe));
      });
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Recipe not found');
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method not allowed');
  return;
});

server.listen(3000, () => {
  console.log('server is running');
});
