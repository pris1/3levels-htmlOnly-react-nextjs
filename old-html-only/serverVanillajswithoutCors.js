// const http = require('http');

// // Fake data
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
//   console.log('Method:', req.method);
//   console.log('URL:', req.url);

//   // GET /recipes
//   if (req.method === 'GET' && req.url === '/recipes') {
//     const json = JSON.stringify(recipes);

//     res.writeHead(200, {
//       'Content-Type': 'application/json',
//     });

//     res.end(json);
//     return;
//   }

//   // GET /
//   else if (req.method === 'GET' && req.url === '/') {
//     res.writeHead(200, {
//       'Content-Type': 'text/plain',
//     });

//     res.end('Welcome');
//     return;
//   }

//   // Route not found
//   else {
//     res.writeHead(404, {
//       'Content-Type': 'text/plain',
//     });

//     res.end('Not Found');
//     return;
//   }
// });

// server.listen(3000, () => {
//   console.log('Server running on port 3000');
// });

//PART PATH PARAMETER
// //CRREATE SERVER
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
//   if (req.method === 'GET') {
//     if (req.url === '/recipes/id') {
//       const splitUrl = req.url.split('/');

//       const resource = splitUrl[1];
//       const idFromSplit = Number([splitUrl[2]]);

//       console.log(resource); // recipes
//       console.log(idFromSplit); // 1

//       let foundRecipe = null;
//       for (let obj of recipes) {
//         // console.log(obj)
//         if (obj.id === idFromSplit) {
//           console.log(obj);
//           foundRecipe = obj;
//           break;
//         }
//         res.end(JSON.stringify(foundRecipe))
//       }

//       res.end('yes');
//     }
//   }
// });

// server.listen(3000, () => {
//   console.log('server is running');
// });

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
