// //goal i am going to build a backend which receives urlencode data chunk by chunck, parses it, stores it in the array and send resp to the frontend
// //step 0 create the server and test if its running
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
//   //get / route
//   if (req.method === 'GET' && req.url === '/') {
//     res.writeHead(200, {
//       'Content-Type': 'text/html',
//     });
//     res.end(`
//       <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>

//   <input type="text" name="name">
//   <p></p>
//   <button>Post recipe</button>
//   <script type="module" src="/fakeapp.js"></script>
// </body>
// </html>`);
//     return;
//   }
//   //routing appjs
//   if (req.method === 'GET' && req.url === '/fakeapp.js') {
//     res.writeHead(200, { 'Content-Type': 'application/javascript' });
//     res.end(`
//       //bringing these dom elements into js so that we can manipulate them programmatically
// const input = document.querySelector('input');
// const button = document.querySelector('button');
// const p = document.querySelector('p');

// //when the button is clicked all this is going to happen get the input value, create urlencoded body and send these http parts including body to the browser so that the browser can use them to create a post http req
// //step1 register the button event so that the browser can prepare to watch for events
// button.addEventListener('click', () => {
//   //step2 get the input value from the input ui
//   const inputValue = input.value;
//   console.log(inputValue);
//   //step3 use this input value to create a body or format urlencoded by using urlsearchparams
//   //Step 2 — Create an empty URLSearchParams object
//   const paramsObject = new URLSearchParams(); //empty object
//   //step3 wat to put inside this empty object?what key to put herein? what does the backend expect

//   paramsObject.set('name', inputValue);

//   //step 4 check what i have created
//   console.log(paramsObject); //URLSearchParams {size: 1}

//   //to convert urlsearchparams into its URL-encoded representation
//   const paramsString = paramsObject.toString();

//   console.log(paramsObject.toString());

//   fetch('http://localhost:3000/recipes', {
//     method: 'POST',

//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },

//     body: paramsString,
//   })
//     .then((resObj) => {
//       //resobj check
//       console.log(resObj);
//       console.log(resObj.ok);
//       //frontend checking did the http request succeed
//       if (Status.ok) {
//       //parsing the resobject into js objec
//       //frontend checking 
//       return resObj.json();
//       } else {
//         throw an Error}
      
//     })
//     //one recipe in this format:javascriptObj
//     .then((recipe) => {
//       p.innerText = recipe.name;
//     });
// });
// `);
//     return;
//   }
//   //routing
//   if (req.method === 'POST' && req.url === '/recipes') {
//     //step 1 receive and compile all data coming from the frontend including first creating a container to contain the data
//     let body = '';
//     req.on('data', (chunk) => {
//       body += chunk;
//     });
//     //step 2 when body is complete parse the data
//     req.on('end', () => {
//       console.log('raw', body);
//       console.log('body length', body.length);
//       const urlSearchParamObj = new URLSearchParams(body);
//       //extracting value from thisurlsearchparam object
//       const extractedName = urlSearchParamObj.get('name');
//       console.log(extractedName);
//       const recipe = { id: recipes.length + 1, name: extractedName };
//       //step 3 store this data in the array
//       recipes.push(recipe);
//       //step 4 send the data to the frontend
//       res.writeHead(200, {
//         'Content-Type': 'application/json',
//       });
//       res.end(JSON.stringify(recipe));
//     });
//     return;
//   }
//   res.writeHead(404);
//   res.end('Not found');
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
  // =========================================================
  // GET /
  // Serve the frontend
  // =========================================================

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recipes</title>
      </head>

      <body>
        <input type="text" name="name">
        <p></p>
        <button>Post recipe</button>

        <script src="/fakeapp.js" defer></script>
      </body>
      </html>
    `);

    return;
  }

  // =========================================================
  // GET /fakeapp.js
  // Serve the frontend JavaScript
  // =========================================================

  if (req.method === 'GET' && req.url === '/fakeapp.js') {
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
    });

    res.end(`
      const input = document.querySelector('input');
      const button = document.querySelector('button');
      const p = document.querySelector('p');

      button.addEventListener('click', () => {
        const inputValue = input.value;

        const paramsObject = new URLSearchParams();

        paramsObject.set('name', inputValue);

        const paramsString = paramsObject.toString();

        fetch('/recipes', {
          method: 'POST',

          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },

          body: paramsString,
        })
          .then((resObj) => {
            console.log('status:', resObj.status);
            console.log('ok:', resObj.ok);

            if (resObj.ok) {
              return resObj.json();
            }

            return resObj.json().then((error) => {
              throw new Error(error.error);
            });
          })

          .then((recipe) => {
            p.innerText = recipe.name;
          })

          .catch((error) => {
            p.innerText = error.message;
          });
      });
    `);

    return;
  }

  // =========================================================
  // POST /recipes
  // Receive URL-encoded recipe
  // =========================================================

  if (req.method === 'POST' && req.url === '/recipes') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        console.log('raw:', body);

        const urlSearchParams = new URLSearchParams(body);

        const extractedName = urlSearchParams.get('name');

        // -----------------------------------------------------
        // 400 Bad Request
        // -----------------------------------------------------

        if (!extractedName) {
          res.writeHead(400, {
            'Content-Type': 'application/json',
          });

          res.end(
            JSON.stringify({
              error: 'Recipe name is required',
            })
          );

          return;
        }

        // -----------------------------------------------------
        // Application logic
        // -----------------------------------------------------

        const recipe = {
          id: recipes.length + 1,
          name: extractedName,
        };

        recipes.push(recipe);

        console.log('recipes:', recipes);

        // -----------------------------------------------------
        // 201 Created
        // -----------------------------------------------------

        res.writeHead(201, {
          'Content-Type': 'application/json',
        });

        res.end(JSON.stringify(recipe));
      } catch (error) {
        // -----------------------------------------------------
        // 500 Internal Server Error
        // -----------------------------------------------------

        console.error(error);

        res.writeHead(500, {
          'Content-Type': 'application/json',
        });

        res.end(
          JSON.stringify({
            error: 'Internal server error',
          })
        );
      }
    });

    return;
  }

  // =========================================================
  // 404 Not Found
  // =========================================================

  res.writeHead(404, {
    'Content-Type': 'application/json',
  });

  res.end(
    JSON.stringify({
      error: 'Route not found',
    })
  );
});

// ===========================================================
// Start server
// ===========================================================

server.listen(3000, () => {
  console.log('server is running');
});