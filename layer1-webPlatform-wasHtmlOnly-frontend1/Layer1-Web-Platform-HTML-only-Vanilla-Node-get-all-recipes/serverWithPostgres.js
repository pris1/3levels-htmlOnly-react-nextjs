const http = require('http');

require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool();

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    // GET / — show a link to the recipes page
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.end(`<a href="/recipes">Get recipes</a>`);
      return;
    }

    // GET /recipes — get recipes from PostgreSQL and build HTML
    if (req.url === '/recipes') {
      try {
        // 1. Ask PostgreSQL for the recipes
        const result = await pool.query(
          'SELECT id, name FROM recipes ORDER BY id',
        );

        // 2. Extract the JavaScript array from the query result
        const recipes = result.rows;

        // 3. Build HTML using your original for loop
        let listItems = '';

        for (let i = 0; i < recipes.length; i++) {
          listItems += `<li>${recipes[i].name}</li>`;
        }

        const html = `
          <ul>
            ${listItems}
          </ul>
        `;

        // 4. Send HTML to the browser
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
        });

        res.end(html);
      } catch (error) {
        console.error('Database error:', error);

        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });

        res.end('Failed to fetch recipes');
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
  console.log('server is running on http://localhost:3000');
});

