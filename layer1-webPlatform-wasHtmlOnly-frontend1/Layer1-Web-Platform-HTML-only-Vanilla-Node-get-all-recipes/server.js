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
      let listItems = '';
      for (let i = 0; i < recipes.length; i++) {
        listItems += `<li>${recipes[i].name}</li> `;
      }

      let html = `<ul>
    
      ${listItems}
      
    </ul> 
      `;

      res.end(html);
      return;
    }
  }
  res.end('Not found route');
});

server.listen(3000, () => {
  console.log('server is running');
});
