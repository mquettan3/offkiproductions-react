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

// Import the Paypal SDK package
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const payPalClient = require('./payPalClient.js');
const GoogleDriveAPI = require('./googleDrive.js');
var googleDrive = new GoogleDriveAPI('credentials.json');

// Import the emailer
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

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

// Respond with the names of all relevant files in ../src/assets/images
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

// Respond with the specified file in ../src/assets/images
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

// Respond with the names of all relevant files in ../src/assets/images
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

// Respond with the specified file in ../src/assets/audio/samples
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

// Respond with the specified file in ../src/assets/audio/samples
app.get('/basicmusic/:categoryName/:songName/:orderID', function (req, res) {
  // Send the file requested from the static location
  res.sendFile(path.resolve(__dirname + '/../') + '/src/assets/audio/samples/' + req.params.categoryName + "/" +  req.params.songName, function(err) {
    if(err) {
      console.log(err);
    }
  });

  // Server debug print
  console.log("Sent Music file: " + path.resolve(__dirname + '/../') + '/src/assets/audio/samples/' + req.params.categoryName + '/' + req.params.songName);
});

// Respond with the specified file in ../src/assets/audio/samples
app.get('/albumart/:categoryName/:songName', function (req, res) {
  var albumArtName = req.params.songName.split(".").slice(0, -1).join('.') + ".jpg";
  // Send the file requested from the static location
  res.sendFile(path.resolve(__dirname + '/../') + '/src/assets/audio/samples/' + req.params.categoryName + "/" +  albumArtName, function(err) {
    if(err) {
      console.log(err);
    }
  });

  // Server debug print
  console.log("Sent AlbumArt file: " + path.resolve(__dirname + '/../') + '/src/assets/audio/samples/' + req.params.categoryName + '/' + albumArtName);
});

// Handle a purchase - Validate it's authenticity - Create a directory which contains all of their purchased items - send a link to those items in an email.
app.post('/purchaseValidation', async function (req, res) {
  // 2a. Get the order ID from the request body
  const orderID = req.body.orderID;
  console.log(JSON.stringify(orderID));
  // 3. Call PayPal to get the transaction details
  let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);

  let order;
  try {
    order = await payPalClient.client().execute(request);
  } catch (err) {

    // 4. Handle any errors from the call
    console.error(err);
    return res.sendStatus(500);
  }

  // If we haven't returned yet - Payment valid
  let songList_array = [];

  for (item in order.result.purchase_units[0].items) {
    songList_array.push(order.result.purchase_units[0].items[item].description);
    
    // Determine which google drive directories to give the purchaser access to.
    googleDrive.providePermissionsToSong(order.result.purchase_units[0].items[item].name, order.result.purchase_units[0].items[item].description)
  }

  // Send order confirmation email to purchaser
  var mailOptions = {
    from: process.env.EMAIL_NAME,
    to: order.result.payer.email_address,
    subject: 'Off Ki Productions - Your Purchase Confirmation',
    text: 'Thank you for purchasing the following: \n' + songList_array.join("\n")
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  

  // TODO: Send Email to Josh to notify him of the purchase

  console.log("Songs Purchased:\n" + songList_array.join("\n"));

  // Send Email to customer containing their purchase or their "Make an Offer" instructions

  // 5. Validate the transaction details are as expected
  // if (order.result.purchase_units[0].amount.value !== '220.00') {
  //   return res.send(400);
  // }

  // 6. Save the transaction in your database
  // await database.saveTransaction(orderID);

  // 7. Return a successful response to the client
  return res.sendStatus(200);
});

// Serve static assets if in productions
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../build'));

  // If we hit any paths that aren't otherwise specified - serve the index.html built by react npm build
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

/////////////////////////////  Google Drive API Initialization

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  googleDrive.authorize(JSON.parse(content), googleDrive.assignDrive);
});