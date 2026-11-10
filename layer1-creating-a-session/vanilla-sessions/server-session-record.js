const http = require('node:http');
const crypto = require('node:crypto');

//temporary session store
const sessions = new Map();
//Learning-only implementation: it uses a GET login route, a simulated user, a simplified cookie parser, and stores raw session IDs in memory. A production implementation would authenticate the user, use POST for login, protect against CSRF, and use persistent session storage with hashed session IDs.

const server = http.createServer((req, res) => {
  console.log('request', req.method, req.url);

  // //login
  // if (req.url === '/login' && req.method === 'GET') {
  //   //pretend that sarah has been authenticated
  //   const userId = 'user_42';
  //   //1 generate random session id
  //   const sessionId = crypto.randomBytes(32).toString('hex');

  //   //2 create a session record
  //   sessions.set(sessionId, {
  //     userId: userId,
  //     expiresAt: Date.now() + 60 * 60 * 1000,
  //   });
  //   console.log('Created session ID:', sessionId);
  //   console.log('Sessions Map:', sessions);

  //   //3 send session id to browser in cookie
  //   res.writeHead(200, {
  //     'Content-Type': 'text/plain',
  //     'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Path=/;SameSite=Lax`,
  //   });

  //   return res.end('sarah logged in session created');
  // }

  //login
 if (req.url === '/login-test' && req.method === 'POST') {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);

      console.log('Email:', data.email);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify({
        message: 'JSON received successfully',
        email: data.email,
      }));
    } catch (error) {
      res.writeHead(400);
      res.end('Invalid JSON');
    }
  });

  return;
}
    //1 generate random session id
    const sessionId = crypto.randomBytes(32).toString('hex');

    //2 create a session record
    sessions.set(sessionId, {
      userId: userId,
      expiresAt: Date.now() + 60 * 60 * 1000,
    });
    console.log('Created session ID:', sessionId);
    console.log('Sessions Map:', sessions);

    //3 send session id to browser in cookie
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Path=/;SameSite=Lax`,
    });

    return res.end('sarah logged in session created');
  }
  //profile
  if (req.url === '/profile' && req.method === 'GET') {
    //1 read cookie header
    const cookieHeader = req.headers.cookie || '';

    //2 extract session id (simplified parser for this exercise)
    const sessionId = cookieHeader
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('sessionId'))
      ?.slice('sessionId='.length);

    console.log('Received session ID:', sessionId);

    //3 look up session record
    const session = sessions.get(sessionId);

    console.log('Session ID length:', sessionId?.length);
    console.log('Session found:', session);
    console.log('All session IDs:', [...sessions.keys()]);

    //4 check whether session exists and has not yet expired
    if (!session || Date.now() >= session.expiresAt) {
      res.writeHead(401, {
        'Content-Type': 'text/plain',
      });

      return res.end('Unauthorized');
    }

    //5 recognise user
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });

    return res.end(`welcome back, ${session.userId}!`);
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

if(!data.email || !data.password) {
  res.send('email and or password required')
}