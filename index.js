/**
 * Primary API
 */

 // Dependencies

 const http = require('http');
 const url = require('url');

 // Create a server

 const server = http.createServer((req, res) => {
     // Get the Url and parse it
    const parsedUrl = url.parse(req.url, true);

     // Get the path
    const pathUrl = parsedUrl.pathname;
    const pathTrimmed = pathUrl.replace(/^\/+|\/+$/g, '');

     // Send the response
     res.end('Hello World \n');

     // Log the request path
     console.log(`Request received on url: ${pathTrimmed}`);
 });

 // Listen on port 3000

 server.listen(3000, () => console.log('The server is listening on port 3000'));