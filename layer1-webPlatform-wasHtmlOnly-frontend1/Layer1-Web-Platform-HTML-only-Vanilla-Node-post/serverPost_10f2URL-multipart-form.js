const http = require('http');

const server = http.createServer((req, res) => {
  // 1. Show the form
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Recipe Upload</title>
      </head>

      <body>

        <form
          action="/recipes"
          method="POST"
          enctype="multipart/form-data"
        >

          <label>
            Recipe name:
            <input name="name">
          </label>

          <br><br>

          <label>
            Recipe file:
            <input type="file" name="recipeFile">
          </label>

          <br><br>

          <button type="submit">
            Submit
          </button>

        </form>

      </body>
      </html>
    `);

    return;
  }

  // 2. Receive the multipart request
  if (req.method === 'POST' && req.url === '/recipes') {
    console.log('METHOD:', req.method);

    // 3. Get Content-Type
    const contentType = req.headers['content-type'];

    console.log('CONTENT-TYPE:', contentType);

    // 4. Extract the boundary
    const splitContentType = contentType.split('=');

    const boundary = splitContentType[1];

    console.log('BOUNDARY:', boundary);

    // 5. Collect the incoming body
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    // 6. When the whole body has arrived
    req.on('end', () => {
      const completeBody = Buffer.concat(body);

      console.log('BODY LENGTH:', completeBody.length);

      // 7. Convert Buffer → string
      const bodyString = completeBody.toString();

      console.log('BODY AS STRING:');
      console.log(bodyString);

      // 8. Split the multipart body into parts
      const parts = bodyString.split(boundary);

      console.log('NUMBER OF PARTS:', parts.length);

      // 9. Examine every part
      parts.forEach((part, index) => {
        console.log(`\n========== PART ${index} ==========`);

        // 10. Split headers from content
        const sections = part.split('\r\n\r\n');

        const headers = sections[0];

        const content = sections[1];

        // 11. Find the recipe name field
        if (headers.includes('name="name"')) {
          const recipeName = content.trim();

          console.log('RECIPE NAME:', recipeName);
        }

        // 12. Find the uploaded file
        if (headers.includes('filename=')) {
          console.log('THIS IS THE FILE PART');

          // 13. Extract the filename
          const filenamePart = headers.split('filename=')[1];

          const filename = filenamePart.split('"')[1];

          console.log('FILENAME:', filename);

          // 14. Extract the file content
          const fileContent = content.trim();

          console.log('FILE CONTENT:');
          console.log(fileContent);
        }
      });

      // 15. Send response to browser
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });

      res.end('Recipe received successfully');
    });

    return;
  }

  // 16. Anything else
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
