const http = require('http');

const server = http.createServer((req, res) => {
  // =========================================================
  // 1. SEND HTML PAGE
  // =========================================================

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recipe Upload</title>
      </head>

      <body>

        <label for="recipe">
          Enter Recipe
        </label>

        <input
          type="text"
          name="name"
          placeholder="recipe"
          id="recipe"
        />

        <br><br>

        <label for="fileUpload">
          Upload file
        </label>

        <input
          type="file"
          name="recipeFile"
          id="fileUpload"
        />

        <br><br>

        <button type="button">
          Submit
        </button>

        <p id="result"></p>

        <script
          type="module"
          src="/fakea-multipart-app.js"
        ></script>

      </body>
      </html>
    `);

    return;
  }

  // =========================================================
  // 2. SEND JAVASCRIPT TO BROWSER
  // =========================================================

  if (req.method === 'GET' && req.url === '/fakea-multipart-app.js') {
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
    });

    res.end(`
      const inputRecipe = document.querySelector('#recipe');
      const inputFileUpload = document.querySelector('#fileUpload');
      const button = document.querySelector('button');
      const result = document.querySelector('#result');

      button.addEventListener('click', () => {

        // 1. Get text from text input
        const inputValue = inputRecipe.value;

        // 2. Get selected File object
        const fileValue = inputFileUpload.files[0];

        // 3. Create FormData
        const formData = new FormData();

        // 4. Put data into FormData
        formData.set('name', inputValue);
        formData.set('recipeFile', fileValue);

        // 5. Inspect what we created
        console.log('INPUT VALUE:', inputValue);
        console.log('FILE:', fileValue);
        console.log('FILE NAME:', fileValue?.name);
        console.log('FILE SIZE:', fileValue?.size);

        console.log(
          'FORMDATA NAME:',
          formData.get('name')
        );

        console.log(
          'FORMDATA FILE:',
          formData.get('recipeFile')
        );

        // 6. Send multipart/form-data request
        fetch('/recipes', {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log('SERVER RESPONSE:', data);

            result.innerText =
              data.message +
              ' | ' +
              data.recipeName +
              ' | ' +
              data.filename;
          })
          .catch((error) => {
            console.error('ERROR:', error);
          });
      });
    `);

    return;
  }

  // =========================================================
  // 3. RECEIVE MULTIPART REQUEST
  // =========================================================

  if (req.method === 'POST' && req.url === '/recipes') {
    console.log('METHOD:', req.method);

    // -------------------------------------------------------
    // STEP 1: Get Content-Type
    // -------------------------------------------------------

    const contentType = req.headers['content-type'];

    console.log('CONTENT-TYPE:', contentType);

    // -------------------------------------------------------
    // STEP 2: Extract boundary
    // -------------------------------------------------------

    const splitContentType = contentType.split('=');

    const boundary = splitContentType[1];

    console.log('BOUNDARY:', boundary);

    // -------------------------------------------------------
    // STEP 3: Create container for incoming chunks
    // -------------------------------------------------------

    const body = [];

    // -------------------------------------------------------
    // STEP 4: Receive chunks
    // -------------------------------------------------------

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    // -------------------------------------------------------
    // STEP 5: When complete body has arrived
    // -------------------------------------------------------

    req.on('end', () => {
      console.log('ALL CHUNKS RECEIVED');

      // -----------------------------------------------------
      // STEP 6: Join chunks together
      // -----------------------------------------------------

      const completeBody = Buffer.concat(body);

      console.log('BODY LENGTH:', completeBody.length);

      // -----------------------------------------------------
      // STEP 7: Convert Buffer to string
      // -----------------------------------------------------

      const bodyString = completeBody.toString();

      console.log('BODY AS STRING:');
      console.log(bodyString);

      // -----------------------------------------------------
      // STEP 8: Split multipart body using boundary
      // -----------------------------------------------------

      const parts = bodyString.split(boundary);

      console.log('NUMBER OF PARTS:', parts.length);

      // -----------------------------------------------------
      // Variables to store extracted information
      // -----------------------------------------------------

      let recipeName;
      let filename;
      let fileContent;

      // -----------------------------------------------------
      // STEP 9: Examine every part
      // -----------------------------------------------------

      parts.forEach((part) => {
        // Ignore pieces that aren't actual form-data parts
        if (!part.includes('Content-Disposition')) {
          return;
        }

        console.log('-----------------------------');
        console.log('PART:');
        console.log(part);

        // ---------------------------------------------------
        // STEP 10: Separate headers from content
        // ---------------------------------------------------

        const sections = part.split('\r\n\r\n');

        const headers = sections[0];
        const content = sections[1];

        console.log('HEADERS:');
        console.log(headers);

        console.log('CONTENT:');
        console.log(content);

        // ---------------------------------------------------
        // STEP 11: Check if this is the recipe-name part
        // ---------------------------------------------------

        if (headers.includes('name="name"')) {
          recipeName = content.trim();

          console.log('RECIPE NAME:', recipeName);
        }

        // ---------------------------------------------------
        // STEP 12: Check if this is the file part
        // ---------------------------------------------------

        if (headers.includes('filename=')) {
          console.log('THIS IS THE FILE PART');

          // -------------------------------------------------
          // STEP 13: Extract filename
          // -------------------------------------------------

          const filenamePart = headers.split('filename=')[1];

          filename = filenamePart.split('"')[1];

          console.log('FILENAME:', filename);

          // -------------------------------------------------
          // STEP 14: Extract file content
          // -------------------------------------------------

          fileContent = content.trim();

          console.log('FILE CONTENT:');
          console.log(fileContent);
        }
      });

      // =====================================================
      // 4. SEND RESPONSE TO FRONTEND
      // =====================================================

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          message: 'Recipe received successfully',
          recipeName: recipeName,
          filename: filename,
        }),
      );
    });

    return;
  }

  // =========================================================
  // 5. EVERYTHING ELSE
  // =========================================================

  res.writeHead(405, {
    'Content-Type': 'text/plain',
  });

  res.end('Method is not allowed');
});

// ===========================================================
// START SERVER
// ===========================================================

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
