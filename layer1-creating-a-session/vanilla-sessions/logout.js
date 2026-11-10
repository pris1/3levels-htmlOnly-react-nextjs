// const http = require('node:http');
// const crypto = require('node:crypto');

// //temporary session store
// const sessions = new Map();
// //Learning-only implementation: it uses a GET login route, a simulated user, a simplified cookie parser, and stores raw session IDs in memory. A production implementation would authenticate the user, use POST for login, protect against CSRF, and use persistent session storage with hashed session IDs.

// const server = http.createServer((req, res) => {
//   console.log('request', req.method, req.url);

//   //login
//   if (req.url === '/login' && req.method === 'GET') {
//     //pretend that sarah has been authenticated
//     const userId = 'user_42';
//     //1 generate random session id
//     const sessionId = crypto.randomBytes(32).toString('hex');

//     //2 create a session record
//     sessions.set(sessionId, {
//       userId: userId,
//       expiresAt: Date.now() + 60 * 60 * 1000,
//     });
//     console.log('Created session ID:', sessionId);
//     console.log('Sessions Map:', sessions);

//     //3 send session id to browser in cookie
//     res.writeHead(200, {
//       'Content-Type': 'text/plain',
//       'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Path=/;SameSite=Lax`,
//     });

//     return res.end('sarah logged in session created');
//   }

//   //profile
//   if (req.url === '/profile' && req.method === 'GET') {
//     //1 read cookie header
//     const cookieHeader = req.headers.cookie || '';
//     console.log(`this is ${cookieHeader}`);

//     //2 extract session id (simplified parser for this exercise)
//     const sessionId = cookieHeader
//       .split(';')
//       .map((cookie) => cookie.trim())
//       .find((cookie) => cookie.startsWith('sessionId'))
//       ?.slice('sessionId='.length);

//     console.log('Received session ID:', sessionId);

//     //3 look up session record
//     const session = sessions.get(sessionId);

//     //4 check whether session exists and has not yet expired
//     if (!session || Date.now() >= session.expiresAt) {
//       res.writeHead(401, {
//         'Content-Type': 'text/plain',
//       });

//       return res.end('Unauthorized');000000000
//     }

//     //5 recognise user
//     res.writeHead(200, {
//       'Content-Type': 'text/plain',
//     });

//     return res.end(`welcome back, ${session.userId}!`);
//   }

//   if (req.url === '/logout' && req.method === 'POST') {
//     //1 read the cookie sent by the client
//     const cookieHeader = req.headers.cookie || '';

//     // 2. Extract the session ID
//     const sessionId = cookieHeader
//       .split(';')
//       .map((cookie) => cookie.trim())
//       .find((cookie) => cookie.startsWith('sessionId='))
//       ?.slice('sessionId='.length);

//     //3 delete the session record
//     if (sessionId) {
//       sessions.delete(sessionId);
//     }
//   }

//   //4 tell the browser to delete is cookie
//   res.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Set-Cookie': 'sessionId=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0',
//   });

//   return res.end('Sarah logged out');
//   res.writeHead(404);
//   res.end('Not found');
// });

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });

const http = require('node:http');
const crypto = require('node:crypto');

// Temporary in-memory session store
const sessions = new Map();

// Learning-only implementation:
// - GET /login simulates an authenticated user.
// - Sessions are stored in memory.
// - Cookie parsing is simplified.
// - Production apps need real authentication, CSRF protection,
//   secure cookies over HTTPS, and persistent session storage.

const server = http.createServer((req, res) => {
  console.log('Request:', req.method, req.url);

  // ============================================
  // LOGIN
  // ============================================
  if (req.url === '/login' && req.method === 'GET') {
    // Pretend Sarah has already been authenticated
    const userId = 'user_42';

    // 1. Generate a random session ID
    const sessionId = crypto.randomBytes(32).toString('hex');

    // 2. Create a server-side session record
    sessions.set(sessionId, {
      userId: userId,
      expiresAt: Date.now() + 60 * 60 * 1000,
    });

    console.log('Created session ID:', sessionId);
    console.log('Sessions Map:', sessions);

    // 3. Send the session ID to the browser in a cookie
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Set-Cookie': `sessionId=${sessionId}; HttpOnly; Path=/; SameSite=Lax`,
    });

    return res.end('Sarah logged in. Session created.');
  }

  // ============================================
  // PROFILE (PROTECTED ROUTE)
  // ============================================
  if (req.url === '/profile' && req.method === 'GET') {
    // 1. Read the Cookie request header
    const cookieHeader = req.headers.cookie || '';

    console.log('Received Cookie header:', cookieHeader);

    // 2. Extract the session ID
    const sessionId = cookieHeader
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('sessionId='))
      ?.slice('sessionId='.length);

    console.log('Received session ID:', sessionId);

    // 3. Look up the session record in the Map
    const session = sessions.get(sessionId);

    // 4. Check whether the session exists and is not expired
    if (!session || Date.now() >= session.expiresAt) {
      // Clean up an expired session record
      if (sessionId && session) {
        sessions.delete(sessionId);
      }

      res.writeHead(401, {
        'Content-Type': 'text/plain',
      });

      return res.end('Unauthorized');
    }

    // 5. Recognize the authenticated user
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });

    return res.end(`Welcome back, ${session.userId}!`);
  }

  // ============================================
  // LOGOUT
  // ============================================
  if (req.url === '/logout' && req.method === 'POST') {
    // 1. Read the cookie sent by the browser
    const cookieHeader = req.headers.cookie || '';

    // 2. Extract the session ID
    const sessionId = cookieHeader
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('sessionId='))
      ?.slice('sessionId='.length);

    // 3. Delete the server-side session record
    if (sessionId) {
      sessions.delete(sessionId);
    }

    // 4. Tell the browser to delete its cookie
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Set-Cookie': 'sessionId=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0',
    });

    return res.end('Sarah logged out.');
  }

  // ============================================
  // 404 - ROUTE NOT FOUND
  // ============================================
  res.writeHead(404, {
    'Content-Type': 'text/plain',
  });

  return res.end('Not found');
});

// Start the HTTP server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
