const http = require('http');
const recipes = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Pasta' },
];
const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });

    res.end('Method not allowed');
    return;
  }
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.end(`
        <!DOCTYPE
        <html>
        <head>
        <link rel="stylesheet" href="./styles.css"/>
        <head />
        <body>
        <h1 class="heading">Welcome!!</h1>
    <input name = "name" placeholder = "Enter recipe" />
    <button> Get recipe </button>
        <script src="./app.js"></script>
    </body>
    </html>
    `);
      return;
    }
    if (req.url === '/styles.css') {
      res.writeHead(200, {
        'Content-Type': 'text/css',
      });
      res.end(`
      .heading {
      background-color:blue;
      color: red;}
      `);
      return;
    }

    if (req.url === '/app.js') {
      res.writeHead(200, {
        'Content-Type': 'application/javascript',
      });
      res.end(`
    const input = document.querySelector('input');
    const button = document.querySelector('button');

    button.addEventListener('click', function () {

      const name = input.value;

      fetch('/recipes?name=' + name)
        .then(function (response) {

          if (!response.ok) {
            throw new Error('Request failed');
          }

          return response.json();
        })
        .then(function (recipesData) {

          console.log(recipesData);
          const p = document.createElement('p');
  p.textContent = recipesData.name;
  document.body.appendChild(p);

        })
        .catch(function (error) {

          console.log('Something went wrong:', error);

        });

    });

        `);
      return;
    }

    //route 4 pathpar
    if (req.url.startsWith('/recipes?')) {
      const splitUrl = req.url.split('?');

      const splitQuery = splitUrl[1].split('=');

      for (let recipe of recipes) {
        if (recipe.name === splitQuery[1]) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
          });

          res.end(JSON.stringify(recipe));
          return;
        }
      }
    }
  }

  res.end('url not found');
  return;
});

server.listen(3000, () => {
  console.log('server is running');
});
