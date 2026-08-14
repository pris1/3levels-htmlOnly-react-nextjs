// //step1 web platform only we used serverjs onlywith get / request from the browser receiving anchor tag with a form and input ui then when teh user fills in the input and submit form that gets received in the /recipe/name=pizza then with then return a hard coded Pizza response as html
// //step 2 layer 2 when get / request comes from the brows the server gives the html containing input ui without a form so input ui and button and css link and script tag coanting source app.sj. so when this html is returned to the browser then tehuser fills in recipne name in the ui then the fetch in app.js is triggered when the button is clicked by the user to submit the inut content s then when the input contetns is submittens comes like this ?name+Pizza then the backend does the parsing manually or using the url api and this value of the name ie pizza is extracted and then searched in teh array when found it is send back to the frontend and the dom is manually maniputated in the frontend and this pizza will be dispalyed in the frontend
// //step3 layer 3 using react  and express so i wll start by layer 2 backend then translate it to express backend

const { json } = require('express');

// const http = require('http');
// const server = http.createServer((req, res) => {
//   if (req.method === 'OPTIONS') {
//     res.writeHead(200, {
//       'Content-Type': 'text/plain',
//       'Access-Control-Allow-Origin': 'http://localhost:3000',
//       'access-control-allow-methods': 'GET',
//       'access-control-allow-headers': 'Content-Type',
//     });
//     res.end('ok');
//     return;
//   }

//   if (req.method === 'GET') {
//     //PUT HTML HERE TO GIVE TO THE FRONTEND
//   }

//   if (req.url.startsWith('/recipes?')) {
//     //parse the url here and extract the name then use a loop to search for that name in the array then if found then send that object to the frontend as response
//   }
//   //catch all
//   res.writeHead(405, {
//     'Content-Type': 'text/plain'
//   });
//   res.end('Method not allowed');

// });

// server.listen(3000, () => {
//   console.log('server is running');
// });

// ============================================
// LAYER 2 — Query Parameter Template
// Vanilla Node backend + Vanilla JS frontend
// ============================================

// STEP 1 — Layer 1 (Web Platform only):
// GET / → server returns HTML with:
//   <form method="GET" action="/recipes">
//   <input name="name">
//   <button type="submit">
// User fills input → submits form
// Browser sends: GET /recipes?name=Pizza
// Server parses manually → returns HTML response
// Full page reload every time

// STEP 2 — Layer 2 (Vanilla JS + Vanilla Node):
// GET / → server returns HTML with:
//   <input id="search-input">
//   <button id="search-btn">
//   NO form tag needed
//   <link href="/styles.css">
//   <script src="/app.js">
// Browser loads app.js
// User fills input → clicks button
// fetch() triggered in app.js
// Browser sends: GET /recipes?name=Pizza
// Server parses manually → returns JSON
// JavaScript updates DOM (no page reload)

// STEP 3 — Layer 3 (React + Express):
// Vite serves React app
// React renders search input + button
// User fills input → clicks button
// fetch() triggered in React component
// Express receives: GET /recipes?name=Pizza
// Express parses: req.query.name automatically
// Express returns JSON
// React updates state → re-renders

// // ============================================
// // LAYER 2 BACKEND — Vanilla Node
// // ============================================

// const http = require('http')

// const recipes = [
//   { id: 1, name: 'Pizza' },
//   { id: 2, name: 'Pasta' },
// ]

// const corsHeaders = {
//   'Access-Control-Allow-Origin': 'http://localhost:5173',
//   'Access-Control-Allow-Methods': 'GET, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type',
// }

// const server = http.createServer((req, res) => {

//   // CORS preflight
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, corsHeaders)
//     res.end()
//     return
//   }

//   if (req.method === 'GET') {

//     // Route 1 — home page (HTML + CSS + JS)
//     if (req.url === '/') {
//       // PUT HTML HERE
//       // HTML contains:
//       // <input id="search-input">
//       // <button id="search-btn">
//       // <link href="/styles.css">
//       // <script src="/app.js">
//       res.writeHead(200, { 'Content-Type': 'text/html' })
//       res.end('HTML here')
//       return
//     }

//     // Route 2 — serve CSS
//     if (req.url === '/styles.css') {
//       res.writeHead(200, { 'Content-Type': 'text/css' })
//       res.end('CSS here')
//       return
//     }

//     // Route 3 — serve app.js
//     // app.js contains:
//     // button.addEventListener('click', function() {
//     //   const name = input.value
//     //   fetch('/recipes?name=' + name)
//     //     .then(res => res.json())
//     //     .then(data => { /* update DOM */ })
//     // })
//     if (req.url === '/app.js') {
//       res.writeHead(200, { 'Content-Type': 'application/javascript' })
//       res.end('JS here')
//       return
//     }

//     // Route 4 — query parameter search
//     // matches: /recipes?name=Pizza
//     // matches: /recipes (no query)
//     if (req.url.startsWith('/recipes')) {

//       // PARSE — manual or URL API
//       const urlObj = new URL(req.url, `http://${req.headers.host}`)
//       const name = urlObj.searchParams.get('name')

//       // no search term → return all
//       if (!name) {
//         res.writeHead(200, {
//           'Content-Type': 'application/json',
//           ...corsHeaders
//         })
//         res.end(JSON.stringify(recipes))
//         return
//       }

//       // SEARCH — loop through array
//       let foundRecipe = null
//       for (let recipe of recipes) {
//         if (recipe.name.toLowerCase() === name.toLowerCase()) {
//           foundRecipe = recipe
//           break
//         }
//       }

//       // RESPOND — found or not found
//       if (foundRecipe) {
//         res.writeHead(200, {
//           'Content-Type': 'application/json',
//           ...corsHeaders
//         })
//         res.end(JSON.stringify(foundRecipe))
//         return
//       }

//       res.writeHead(404, {
//         'Content-Type': 'application/json',
//         ...corsHeaders
//       })
//       res.end(JSON.stringify({ message: 'Recipe not found' }))
//       return
//     }

//     // catch-all — route not found
//     res.writeHead(404, { 'Content-Type': 'text/plain' })
//     res.end('Route not found')
//     return
//   }

//   // method not allowed
//   res.writeHead(405, { 'Content-Type': 'text/plain' })
//   res.end('Method not allowed')
// })

// server.listen(3000, () => {
//   console.log('server running on port 3000')
// })

const express = require('express');
const app = express();
const cors = require('cors');

const recipes = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Pasta' },
];

app.use(cors());
//validation step check if the user has supplied a name for hte recipe ot avoid name.tolowercase to crush

app.get('/recipes', (req, res) => {
  console.log(req.query); //thisis already created for us by express bfoer this handle is called
  const queryName = req.query.name;

  if (!queryName) {
    return res.status(400).json({
      message: 'Recipe name is required',
    });
  }
  let foundRecipe = null;
  for (let recipe of recipes) {
    if (recipe.name.toLowerCase() === queryName.toLowerCase()) {
      foundRecipe = recipe;
      break;
    }
  }
  if (foundRecipe) {
    res.json(foundRecipe);
  } else {
    res.status(404).json({ message: 'Recipe is not found' });
  }
});
app.listen(3000, () => {
  console.log('server is running');
});
