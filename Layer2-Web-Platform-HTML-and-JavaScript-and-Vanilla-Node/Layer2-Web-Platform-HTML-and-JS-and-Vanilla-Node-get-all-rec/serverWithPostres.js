const http = require('http');

require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool();

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  if (req.method === 'GET') {
    // ROUTE 1: Send HTML to the browser
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });

      res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recipes</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <h1 class="heading">Welcome Welcome !!</h1>

  <ul id="recipe-list"></ul>

  <script type="module" src="/app.js"></script>
</body>
</html>
      `);

      return;
    }

    // ROUTE 2: Send CSS to the browser
    if (req.url === '/styles.css') {
      res.writeHead(200, {
        'Content-Type': 'text/css',
      });

      res.end(`
.heading {
  background-color: greenyellow;
  color: blue;
}
      `);

      return;
    }

    // ROUTE 3: Send browser JavaScript
    if (req.url === '/app.js') {
      res.writeHead(200, {
        'Content-Type': 'application/javascript',
      });

      res.end(`
fetch('/recipes')
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    return response.json();
  })
  .then(function(recipesData) {
    const list = document.getElementById('recipe-list');

    recipesData.forEach(function(recipe) {
      const listItem = document.createElement('li');

      listItem.textContent = recipe.name;

      list.appendChild(listItem);
    });
  })
  .catch(function(error) {
    console.error('Something went wrong:', error);
  });
      `);

      return;
    }

    // ROUTE 4: Get recipes from PostgreSQL and send JSON
    if (req.url === '/recipes') {
      try {
        const result = await pool.query(
          'SELECT id, name FROM recipes ORDER BY id',
        );

        const recipes = result.rows;

        res.writeHead(200, {
          'Content-Type': 'application/json',
        });

        res.end(JSON.stringify(recipes));
      } catch (error) {
        console.error('Database error:', error);

        res.writeHead(500, {
          'Content-Type': 'application/json',
        });

        res.end(
          JSON.stringify({
            error: 'Failed to fetch recipes',
          }),
        );
      }

      return;
    }

    // Unknown GET route
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });

    res.end('Route not found');
    return;
  }

  // Unsupported HTTP method
  res.writeHead(405, {
    'Content-Type': 'text/plain',
    Allow: 'GET',
  });

  res.end('Method not allowed');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
