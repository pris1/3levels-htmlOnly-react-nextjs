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
//   //1 create container to contain the body
//   let body = '';
//   req.on('data', (chunk) => {
//     console.log(chunk);
//       //2 when one chunk arrives data event emitter fires and calls the callback to build the body by this one extra chunk which has just arrived collecting chunks of data chunk by chunk
//       //3 'end' fires when Node's HTTP implementation has received
// //   the complete request body
//     body += chunk;
//     console.log(body);

//   })
//   req.on('end', () => {
//     const data = JSON.parse(body);
//     recipes.push(data);
//     console.log(recipes);
//     res.writeHead(200, {
//       'Content-Type': "application/json"
//     });
//     res.end(JSON.stringify(data));

//   })

  
//   //4 now its safe to parse the entire body into a usable format ie js object
//   //5 now take this js object and store it in our warehouse ie the array or db
//   //6 send the JSON response back to the HTTP client (Thunder Client)
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