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
 //route 1 home
    if (req.url === '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.end(`<!doctype html>
      <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home | Recipes</title>

      <link rel="stylesheet" href="./styles.css" />

     <script src="./app.js" defer></script>
      </head>
     <body>
      <h1 class="heading">Welcome Node!!!</h1>
      </body>
      </html>
     `);
      return;
    }

    //route 2 css
    if (req.url === '/styles.css') {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(`
        .heading {
  background-color: blue;
  color: yellow;
}

        `);
      return;
    }

    //route 3
    if (req.url === '/app.js') {
      res.writeHead(200, {
        'Content-Type': 'application/javascript',
      });
      res.end(`

fetch('/recipes/1')
.then(function(response) {
 return response.json();
})
.then(function(recipesData){
  console.log(recipesData);

    const p = document.createElement('p');
    p.textContent = recipesData.name;
    document.body.appendChild(p);
  

})
.catch(function(error) {
console.log(error);
})
`);
      return;
    }

    if (req.url.startsWith('/recipes/')) {
      const splitUrl = req.url.split('/');
      console.log(splitUrl);
      const recipeId = Number(splitUrl[2]);

      let foundRecipe = null;

      for (let recipe of recipes) {
        if (recipe.id === recipeId) {
          foundRecipe = recipe;
          break;
        }
      }
      if (foundRecipe) {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(foundRecipe));
        return;
      } else {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.end('Recipe not found');
        return;
      }
    }

    res.writeHead(405, {
      'Content-Type': 'text/plain',
    });
    res.end('Method not allowed');
    return;
  }
);

server.listen(3000, () => {
  console.log('server is running');
});
