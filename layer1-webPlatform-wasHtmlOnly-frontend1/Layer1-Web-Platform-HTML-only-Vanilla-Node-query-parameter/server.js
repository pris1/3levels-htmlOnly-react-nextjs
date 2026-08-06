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
    if (req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      let html = `
  <form action="/recipes" method="get">
      <input name="name" placeholder="Enter recipe name" />
      <button type="submit">Search</button>
    </form>
  `;
      res.end(html);
      return;
    }

    if (req.url.startsWith('/recipes')) {
      // parse the query parameter here

      let url = req.url;
      const splitUrl = url.split('?'); //now splitUrl has 2 array items we want the second one and split it again or i simply need to extract it
      console.log(splitUrl);
      const queryParam = splitUrl[1];

      if (!queryParam) {
        res.end('Please enter a recipe name!');
        return;
      }
      // console.log(queryParam);
      const splitQueryParam = queryParam.split('=');
      // console.log(splitQueryParam);

      const valueOfKey = splitQueryParam[1];
      // console.log(valueOfKey);

      // //using this query parameter to search in the array
      // //the name on the left side is from the array and name on the right side is from the query parameter
      for (let recipe of recipes) {
        if (recipe.name === valueOfKey) {
          res.end(`This is your found Recipe ${valueOfKey}`);
          return;
        }
      }

      res.end('Recipe not found');
      return;
    }
    res.end('method not allowed');
  }
});
server.listen(3000, () => {
  console.log('server is running');
});
