// const http = require('http');

// const recipes = [
//   {
//     id: 1,
//     name: 'Pizza',
//   },
//   {
//     id: 2,
//     name: 'Pasta',
//   },
// ];

// const server = http.createServer((req, res) => {
//  //route 1 home
//     if (req.url === '/') {
//       res.writeHead(200, {
//         'Content-Type': 'text/html',
//       });
//       res.end(`<!doctype html>
//       <html lang="en">
//       <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Home | Recipes</title>

//       <link rel="stylesheet" href="./styles.css" />

//      <script src="./app.js" defer></script>
//       </head>
//      <body>
//       <h1 class="heading">Welcome Node!!!</h1>
//       </body>
//       </html>
//      `);
//       return;
//     }

//     //route 2 css
//     if (req.url === '/styles.css') {
//       res.writeHead(200, { 'Content-Type': 'text/css' });
//       res.end(`
//         .heading {
//   background-color: blue;
//   color: yellow;
// }

//         `);
//       return;
//     }

//     //route 3
//     if (req.url === '/app.js') {
//       res.writeHead(200, {
//         'Content-Type': 'application/javascript',
//       });
//       res.end(`

// fetch('/recipes/1')
// .then(function(response) {
//  return response.json();
// })
// .then(function(recipesData){
//   console.log(recipesData);

//     const p = document.createElement('p');
//     p.textContent = recipesData.name;
//     document.body.appendChild(p);

// })
// .catch(function(error) {
// console.log(error);
// })
// `);
//       return;
//     }

//     if (req.url.startsWith('/recipes/')) {
//       const splitUrl = req.url.split('/');
//       console.log(splitUrl);
//       const recipeId = Number(splitUrl[2]);

//       let foundRecipe = null;

//       for (let recipe of recipes) {
//         if (recipe.id === recipeId) {
//           foundRecipe = recipe;
//           break;
//         }
//       }
//       if (foundRecipe) {
//         res.writeHead(200, {
//           'Content-Type': 'application/json',
//         });
//         res.end(JSON.stringify(foundRecipe));
//         return;
//       } else {
//         res.writeHead(404, {
//           'Content-Type': 'text/plain',
//         });
//         res.end('Recipe not found');
//         return;
//       }
//     }

//     res.writeHead(405, {
//       'Content-Type': 'text/plain',
//     });
//     res.end('Method not allowed');
//     return;
//   }
// );

// server.listen(3000, () => {
//   console.log('server is running');
// });

//===================version with url api================
// const http = require('http');

// const recipes = [
//   {
//     id: 1,
//     name: 'Pizza',
//   },
//   {
//     id: 2,
//     name: 'Pasta',
//   },
// ];

// const server = http.createServer((req, res) => {
//   //cors
//   const corsHeaders = {
//     'Access-Control-Allow-Origin': 'http://localhost:5173',
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type',
//   };

//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, {
//       'Content-Type': 'text/plain',
//       ...corsHeaders,
//     });
//     res.end();
//     return;
//   }

//   //route 1 home
//   if (req.url === '/') {
//     res.writeHead(200, {
//       'Content-Type': 'text/html',
//       ...corsHeaders,
//     });
//     res.end(`<!doctype html>
//       <html lang="en">
//       <head>
//       <meta charset="UTF-8" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>Home | Recipes</title>

//       <link rel="stylesheet" href="./styles.css" />

//      <script src="./app.js" defer></script>
//       </head>
//      <body>
//       <h1 class="heading">Welcome Node!!!</h1>
//       </body>
//       </html>
//      `);
//     return;
//   }

//   //route 2 css
//   if (req.url === '/styles.css') {
//     res.writeHead(200, { 'Content-Type': 'text/css' });
//     res.end(`
//         .heading {
//   background-color: blue;
//   color: yellow;
// }

//         `);
//     return;
//   }

//   //route 3
//   if (req.url === '/app.js') {
//     res.writeHead(200, {
//       'Content-Type': 'application/javascript',
//     });
//     res.end(`

// fetch('/recipes/1')
// .then(function(response) {
//  return response.json();
// })
// .then(function(recipesData){
//   console.log(recipesData);

//     const p = document.createElement('p');
//     p.textContent = recipesData.name;
//     document.body.appendChild(p);

// })
// .catch(function(error) {
// console.log(error);
// })
// `);
//     return;
//   }

//   if (req.method === 'GET' && req.url.startsWith('/recipes/')) {
//     const splitUrl = req.url.split('/');
//     console.log(splitUrl);
//     const recipeId = Number(splitUrl[2]);

//     // const url = new URL(req.url, 'http://localhost:3000/');
//     // const pathname = url.pathname;
//     // console.log(pathname);

//     let foundRecipe = null;

//     for (let recipe of recipes) {
//       if (recipe.id === recipeId) {
//         foundRecipe = recipe;
//         break;
//       }
//     }
//     if (foundRecipe) {
//       res.writeHead(200, {
//         'Content-Type': 'application/json',
//       });
//       res.end(JSON.stringify(foundRecipe));
//       return;
//     } else {
//       res.writeHead(404, {
//         'Content-Type': 'text/plain',
//       });
//       res.end('Recipe not found');
//       return;
//     }
//   }

//   res.writeHead(405, {
//     'Content-Type': 'text/plain',
//   });
//   res.end('Method not allowed');
//   return;
// });

// server.listen(3000, () => {
//   console.log('server is running');
// });

//========================converting layer 2 to layer 3 express====

const express = require('express');
const app = express();
const cors = require('cors');

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

//midware
app.use(cors());
app.use(express.json());

app.get('/recipes/:recipeId', (req, res) => {
  // const splitPath = req.path.split('/');
  // const recipeId = splitPath[2];
  // req.params.recipeId
  let foundRecipe = null;
  for (let recipe of recipes) {
    const recipeId = Number(req.params.recipeId);
    if (recipe.id === recipeId) {
      foundRecipe = recipe; //send whole object to the frontend
      break; // ← stop searching
    }
  }
  if (foundRecipe) {
    res.status(200).json(foundRecipe);
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

// app.get('/products/:productId', (req, res) =>{
//   console.log(req.params);
//   req.json(req.params);
// });

// app.get('/products/:productId', (req, res) => {
//   console.log(req.params);

//   res.json(req.params);
// });

app.listen(3000, () => {
  console.log('server is running');
});
