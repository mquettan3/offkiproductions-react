// Using express to simplify node.js routing and server creation
const express = require('express');

// Adding body-parser to simplify obtaining the body of POST HTTP requests
// To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.
// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.
const bodyParser = require('body-parser');

// Used to allow for Cross-origin resource sharing (CORS) allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
const cors = require('cors');

// Glob and path Used for file manipulation
const glob = require('glob');
const path = require('path');

// Define configuration variables
const PORT = 4000;
const app = express();

// Apply all middlewares to our server
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Begin listening on our chosen PORT for our server.
app.listen(PORT, function() {
  console.log('Server is running on Port: ', PORT);
});

// Respond with "hello world" when a GET request is made to the homepage.
app.get('/herofiles/:fileName', function (req, res) {
  // Server debug print
  console.log('Received a request on Port: ', PORT);

  // Send the file requested from the static location
  res.sendFile('/home/mquettan3/workspace/offkiproductions-react/src/assets/images/' + req.params.fileName, function(err) {
    console.log(err);
  });

  // Server debug print
  console.log("Sent file: " + '../src/assets/images/' + req.params.fileName);
});
