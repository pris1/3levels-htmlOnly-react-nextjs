const http = require('http');

const server = http.createServer((req, res) => {
  //node understands the req
  console.log('Method:', req.method);
  console.log('URL:', req.url);

  //CORS headers
  res.writeHead({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  //preflight request
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  //normal request
  res.end('Server works');
});

server.listen(3000, () => {
  console.log('server is running');
});
