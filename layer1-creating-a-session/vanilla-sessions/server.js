const http = require('node:http');

const server = http.createServer((req, res) => {
  if (req.url === '/login' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Set-Cookie': 'sessionId=abc123; HttpOnly; Path=/; SameSite=Lax',
    });

    return res.end('Cookie sent!');
  }

  if (req.url === '/profile' && req.method === 'GET') {
    console.log('Incoming Cookie header:', req.headers.cookie);

    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });

    return res.end('Check your terminal!');
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
