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
const fs = require('fs');

// Define configuration variables
const PORT = process.env.PORT || 4000;
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

// Respond with the names of all relevant files in /home/mquettan3/workspace/offkiproductions-react/src/assets/images
// TODO - The paths in production will likely be different
app.get('/musiclist', function (req, res) {
  var count = 0;
  var directorySongObject = {}
  // Send the list of files from the specified location
  glob(__dirname + '/../src/assets/audio/samples/**', function (er, items) {
    var currentCategory = "None";

    for(count in items) {
      var stats = fs.statSync(items[count]);

      if(stats.isDirectory()) {
        // items[count] gives a full absolute path.  The following logic forces the last directory name to be the category name.
        var arr = items[count].split('/');

        // This allows for /path/to/last///// to still work.
        currentCategory = (function findLast(i) {
          return arr[i] || findLast(i-1);
        })(arr.length-1);

      } else if (stats.isFile()) {
        // Ignore all files that aren't mp3s
        if (!path.basename(items[count]).includes(".mp3"))
          continue;

        if(directorySongObject[currentCategory]) {
          directorySongObject[currentCategory].push(path.basename(items[count]));
        } else {
          directorySongObject[currentCategory] = [path.basename(items[count])]
        }
      }
    }
    res.json(directorySongObject);

    // Server debug print
    console.log("Sent directory list " + JSON.stringify(directorySongObject));
  });
});

// Respond with the specified file in /home/mquettan3/workspace/offkiproductions-react/src/assets/audio/samples
// TODO - The paths in production will likely be different
app.get('/samplemusic/:categoryName/:songName', function (req, res) {
  // Send the file requested from the static location
  res.sendFile(path.resolve(__dirname + '/../') + '/src/assets/audio/samples/' + req.params.categoryName + "/" +  req.params.songName, function(err) {
    if(err) {
      console.log(err);
    }
  });

  // Server debug print
  console.log("Sent Music file: " + path.resolve(__dirname + '/../') + '/src/assets/audio/samples/' + req.params.categoryName + '/' + req.params.songName);
});

// Respond with the specified file in /home/mquettan3/workspace/offkiproductions-react/src/assets/audio/samples
// TODO - The paths in production will likely be different
app.get('/albumart/:categoryName/:songName', function (req, res) {
  var albumArtName = req.params.songName.split(".")[0] + ".jpg";
  // Send the file requested from the static location
  res.sendFile(path.resolve(__dirname + '/../') + '/src/assets/audio/samples/' + req.params.categoryName + "/" +  albumArtName, function(err) {
    if(err) {
      console.log(err);
    }
  });

  // Server debug print
  console.log("Sent AlbumArt file: " + path.resolve(__dirname + '/../') + '/src/assets/audio/samples/' + req.params.categoryName + '/' + albumArtName);
});

// Serve static assets if in productions
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // If we hit any paths that aren't otherwise specified - serve the index.html built by react npm build
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
