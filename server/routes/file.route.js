// files.route.js
const express = require('express');
const fileRoutes = express.Router();

// Glob and path Used for file manipulation
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname + '/../../')

// Respond with the names of all relevant files in ../src/assets/images
fileRoutes.get('/herofiles', function (req, res) {
    // Send the list of files from the specified location
    glob(__dirname + '/../../src/assets/images/hero*', function (er, files) {
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

// Respond with the specified file in ../src/assets/images
fileRoutes.get('/herofiles/:fileName', function (req, res) {
    // Send the file requested from the static location
    res.sendFile(projectRoot + '/src/assets/images/' + path.basename(req.params.fileName), function(err) {
      if(err) {
        console.error(err);
      }
    });
  
    // Server debug print
    console.log("Sent file: " + projectRoot + '/src/assets/images/' + path.basename(req.params.fileName));
});

// Respond with the specified file in ../src/assets/images/Logos
fileRoutes.get('/logo/:fileName', function (req, res) {
    // Send the file requested from the static location
    res.sendFile(projectRoot + '/src/assets/images/Logos/' + path.basename(req.params.fileName), function(err) {
      if(err) {
        console.error(err);
      }
    });
  
    // Server debug print
    console.log("Sent file: " + projectRoot + '/src/assets/images/Logos/' + path.basename(req.params.fileName));
});  

// Respond with the names of all relevant files in ../src/assets/images
fileRoutes.get('/musiclist', function (req, res) {
    var count = 0;
    var directorySongObject = {}
    // Send the list of files from the specified location
    glob(__dirname + '/../../src/assets/audio/samples/**', function (er, items) {
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

// Respond with the specified file in ../src/assets/audio/samples
fileRoutes.get('/samplemusic/:categoryName/:songName', function (req, res) {
    // Send the file requested from the static location
    res.sendFile(projectRoot + '/src/assets/audio/samples/' + req.params.categoryName + "/" +  req.params.songName, function(err) {
      if(err) {
        console.error(err);
      }
    });
  
    // Server debug print
    console.log("Sent Music file: " + projectRoot + '/src/assets/audio/samples/' + req.params.categoryName + '/' + req.params.songName);
});
  
// Respond with the specified file in ../src/assets/audio/samples
fileRoutes.get('/albumart/:categoryName/:songName', function (req, res) {
    var albumArtName = req.params.songName.split(".").slice(0, -1).join('.') + ".jpg";
    // Send the file requested from the static location
    res.sendFile(projectRoot + '/src/assets/audio/samples/' + req.params.categoryName + "/" +  albumArtName, function(err) {
      if(err) {
        console.error(err);
      }
    });
  
    // Server debug print
    console.log("Sent AlbumArt file: " + projectRoot + '/src/assets/audio/samples/' + req.params.categoryName + '/' + albumArtName);
});

module.exports = fileRoutes;