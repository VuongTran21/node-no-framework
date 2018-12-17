/**
 * Primary API
 */

 // Dependencies

 const http = require('http');
 const url = require('url');
 const StringDecoder = require('string_decoder').StringDecoder;

 // Create a server

 const server = http.createServer((req, res) => {
     // Get the Url and parse it, true means convert directly to query string object
    let parsedUrl = url.parse(req.url, true);

     // Get the path
    let pathUrl = parsedUrl.pathname;
    let pathTrimmed = pathUrl.replace(/^\/+|\/+$/g, '');

    // Get HTTP method
    let method = req.method.toLowerCase();

    // Get query string as an object from parse url
    let queryStringObject = parsedUrl.query;

    // Get headers as an object
    let headers = req.headers;

    // Parsing payloads
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    req.on('data', function(data) {
        buffer += decoder.write(data);
    });

    req.on('end', function() {
        buffer += decoder.end();

        let choosenHandler = typeof(routers[pathTrimmed]) !== 'undefined' ? routers[pathTrimmed] : handlers.notFound;

        let data = {
            method,
            queryStringObject,
            headers,
            path: pathTrimmed,
            payload: buffer
        };

        console.log('data on request: ', data);

        choosenHandler(data, (statusCode, payload) => {
            // default status code
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // default payload
            payload = typeof(payload) == 'object' ? payload : {};

            // convert payload to response
            payloadString = JSON.stringify(payload);

            // Return the response
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('Returning response: ', payloadString, statusCode);
        });

        // Send the response
        

        // Log the result
        // console.log('String after decoded', typeof buffer);
        // let buffered = JSON.parse(buffer);
        // console.log('Data encode', typeof buffered);
    });

     

     // Log the request path
    //  console.log(`Request received on url: ${pathTrimmed} and method of request is: ${method}`);
    //  console.log('with query parameters', queryStringObject);
    // console.log('Headers object: ', headers);
 });

 // Listen on port 3000

 server.listen(3000, () => console.log('The server is listening on port 3000'));

 // Define a handler
 let handlers = {};

 // Define a sample handler
 handlers.sample = (data, callback) => {
    callback(406, {name: 'Sample Handler'});
 };

 // Define a route not found
 handlers.notFound = (data, callback) => {
    callback(404);
 };

 // Define router
 let routers = {
     'sample': handlers.sample
 };