// const http = require('http');

// const recipes = [
//   { id: 1, name: 'Pizza' },
//   { id: 2, name: 'Pasta' },
// ];
// const server = http.createServer((req, res) => {
//   console.log(req.method, req.url);
//   if (req.method === 'GET') {
//     //route1 serve home page
//     if (req.url === '/') {
//       res.setHeader('Content-Type', 'text/html');
//       res.end(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//         <link rel="stylesheet" href="/styles.css">
//         </head>
//         <body>
//         <h1 class="heading">Welcome Welcome !!</h1>
//         <ul id ="recipe-list"></ul>
//         <script type = "module" src="/app.js"></script>
//         </body>
//         </html>`);
//       return;
//     }
//     //route 2 serve css
//     if (req.url === '/styles.css') {
//       res.setHeader('Content-Type', 'text/css');
//       res.end(`
//       .heading {
//         background-color: greenyellow;
//         color: blue;
//       }
//   `);
//       return;
//     }
//     //route 3 server app.js
//     if (req.url === '/app.js') {
//       res.setHeader('Content-Type', 'application/javascript');
//       res.end(`
//         fetch('/recipes')
//         .then(function(response){
//         return response.json()})
//         .then(function(recipesData){
//         console.log(recipesData);

//         const list = document.getElementById('recipe-list');

//         recipesData.forEach(function(recipe){
//         list.innerHTML +=\`<li>\${recipe.name}</li>\`
//         });
//         });
//         `);
//       return;
//     }
//     //route 4 serve /recipes
//     if (req.url === '/recipes') {
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify(recipes));
//       return;
//     }
//     res.statusCode = 404;
//     res.end('route not found');
//     return;
//   }
//   res.statusCode = 405;
//   res.end('method not allowed');
//   return;
// });

// server.listen(3000, () => {
//   console.log('server is running');
// });

//
const http = require('http');

const recipes = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Pasta' },
];

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === 'GET') {
    // Route 1 - Home page
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');

      res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
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

    // Route 2 - CSS
    if (req.url === '/styles.css') {
      res.setHeader('Content-Type', 'text/css');

      res.end(`
.heading{
  background-color: greenyellow;
  color: blue;
}
      `);

      return;
    }

    // Route 3 - JavaScript
    if (req.url === '/app.js') {
      res.setHeader('Content-Type', 'application/javascript');

      res.end(`
fetch('/recipes')
  .then(function(response) {
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
    console.log('Something went wrong:', error);
  });
      `);

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
