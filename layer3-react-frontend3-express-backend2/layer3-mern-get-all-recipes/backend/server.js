//i am learning to build the backend intuitively tha tis why this reasoning now so that i can translate it easily
// step 1 in vanilla node would be to create an endpoint for get/ but bcoz in mern or react the get/ is handledby vite so we dont have to create an endpoitn for get/. so i will assume that the first get / is already done by the frontend and vite has already handed the index.hml file to the browser and the browser is passing the html file and has created the div id root dom node and now has found the script tag which lead to downloading of the mainjsx and then rendering of appjs then of recipe jsx . now in recipe jsx file we have this fetch roughly like this
// fetch('http://localhost:3000/recipes', { Method: "GET"}) now in step 2 of the backend i am creating endpoint and handler to receive and process this request and write and send a response to the frontend. i will start is as vanilla js inorder to develop the intuitive way of creating the backend see:
//step 2 vanilla node way
// const http = require('http');
// const server = http.createServer((req, res) => {
//   if (req.method === 'GET') {
//     if (req.url === '/recipes') {
//       // handler here
//       res.end('it worked');
//       return;
//     }

//     if (req.url === '/recipes/1') {
//       res.end('it worked');
//       return;
//     }

//     if (req.url === '/recipes?name=Pizza') {
//       res.end('it worked');
//       return;
//     }
//   }

//   if (req.method === 'POST') {
//     res.end('it worked');
//     return;
//   }

//   if (req.method === 'PUT') {
//     res.end('it worked');
//     return;
//   }

//   if (req.method === 'DELETE') {
//     res.end('it worked');
//     return;
//   }
// res.writeHead(405, {'Content-Type':'text/plain'})
//   res.end('Method not allowed');
//   return;
// });

// server.listen(3000, () => {});

//step3 translating this into express
const express = require('express');
const app = express();

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

app.get('/recipes', (req, res) => {
  res.status(200).json({ message: 'Recipe found', recipes });
});

app.listen(3000, () => {
  console.log('server is running');
});
