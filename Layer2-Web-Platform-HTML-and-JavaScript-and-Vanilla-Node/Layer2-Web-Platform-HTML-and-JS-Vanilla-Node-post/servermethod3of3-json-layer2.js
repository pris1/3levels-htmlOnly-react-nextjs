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
  // =========================================================
  // 1. SEND HTML PAGE
  // =========================================================

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    res.end(`
      <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="text" />
    <button>Add recipe</button>
    <p>???</p>
    <script type="module" src="/jsonfake-app.js"></script>
  </body>
</html>

    `);

    return;
  }

  // =========================================================
  // 2. SEND JAVASCRIPT TO BROWSER
  // =========================================================

  if (req.method === 'GET' && req.url === '/jsonfake-app.js') {
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
    });

    res.end(`
      const input = document.querySelector('input');
const button = document.querySelector('button');
const p = document.querySelector('p');

button.addEventListener('click', () => {
  const inputValue = input.value;
  //create a js object with this inputvValue
  const inputObject = {
    name: inputValue,
  };

  fetch('http://localhost:3000/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(inputObject),
  })
    .then(res => res.json())
.then(data => {
  p.textContent = data.name  // ← shows recipe name
})
.catch(error => console.log(error))
});

    `);

    return;
  }

  // =========================================================
  // 3. RECEIVE JSON
  // =========================================================

  // POST /recipes
  if (req.method === 'POST' && req.url === '/recipes') {
    let body = '';

    // Collect incoming body chunks
    req.on('data', (chunk) => {
      console.log('CHUNK:', chunk);

      body += chunk;

      console.log('BODY SO FAR:', body);
    });

    // Body is complete
    req.on('end', () => {
      // Convert JSON representation → JavaScript object
      const data = JSON.parse(body);

      // Give the recipe an ID
      data.id = recipes.length + 1;

      // Store in temporary in-memory database
      recipes.push(data);

      console.log('RECIPES:', recipes);

      // JavaScript object → JSON representation
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify(data));
    });

    return;
  }

  // GET /recipes
  if (req.method === 'GET' && req.url === '/recipes') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify(recipes));

    return;
  }

  // Unknown route
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('server is running');
});
