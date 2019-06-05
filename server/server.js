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

// Respond with the names of all relevant files in /home/mquettan3/workspace/offkiproductions-react/src/assets/images
// TODO - The paths in production will likely be different
app.get('/herofiles', function (req, res) {
  // Send the list of files from the specified location
  glob(__dirname + '/../src/assets/images/hero*', function (er, files) {
    var fileList = []
    var count = 0;

    for(count in files) {
      fileList.push(path.basename(files[count]));
    }
    res.json(fileList);

    // Server debug print
    console.log("Sent file list " + fileList);
  })
});

// Respond with the specified file in /home/mquettan3/workspace/offkiproductions-react/src/assets/images
// TODO - The paths in production will likely be different
app.get('/herofiles/:fileName', function (req, res) {
  // Send the file requested from the static location
  res.sendFile(path.resolve(__dirname + '/../') + '/src/assets/images/' + path.basename(req.params.fileName), function(err) {
    if(err) {
      console.log(err);      
    }
  });

  // Server debug print
  console.log("Sent file: " + path.resolve(__dirname + '/../') + '/src/assets/images/' + path.basename(req.params.fileName));
});
