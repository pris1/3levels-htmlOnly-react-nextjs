const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(url.pathname);
  console.log(url.pathname);
  console.log(url.searchParams.get('name'));

  res.end('done');
});

server.listen(3000, () => {
  console.log('Server running');
});
