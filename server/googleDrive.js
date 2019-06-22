const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

module.exports = class GoogleDriveAPI {
    constructor(credentialsJsonLocation){
        this.authorize = this.authorize.bind(this);
        this.assignDrive = this.assignDrive.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.authorize = this.authorize.bind(this);

        this.drive = {};

        // Load client secrets from a local file.
        fs.readFile(credentialsJsonLocation, (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Drive API.
          this.authorize(JSON.parse(content), this.assignDrive);
        });

    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

      
    /**
     * Assigns the authorized google drive to the drive global varaible.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    assignDrive(auth) {
        this.drive = google.drive({version: 'v3', auth});
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
          rl.close();
          oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
          });
        });
      }

    /**
     * Lists the names and IDs of up to 10 files.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    providePermissionsToSong(songName, description) {
        // First, find the ID of the folder for the license tier
        var licenseTier = description.split("License Tier: ")[1]
        var mimeType = "mimeType = 'application/vnd.google-apps.folder' and name = '" + licenseTier + " Packages'";

        this.drive.files.list({
            pageSize: 1,
            fields: 'nextPageToken, files(id, name)',
            q: mimeType
        }, (err, res) => {

            // Handle errors finding the license tier directory
            if (err) return console.log('The API returned an error: ' + err);

            const files = res.data.files;
            if (files.length) {
                console.log('License Directory Found: ' + licenseTier + " Packages/");
                files.map((file) => {
                    mimeType = "mimeType = 'application/vnd.google-apps.folder' and name = '" + songName + "' and '" + file.id + "' in parents"
                    this.drive.files.list({
                        pageSize: 1,
                        fields: 'nextPageToken, files(id, name)',
                        q: mimeType
                    }, (nestedErr, nestedRes) => {
                        const nestedFiles = nestedRes.data.files;
                        // Handle errors finding the song name directory
                        if (nestedErr) return console.log('The API returned an error: ' + err);

                        if (nestedFiles.length) {
                            console.log('Add permissions here!');
                        } else {
                            console.log('No Song directory found for: ' + songName + "/");
                        }
        
                    });
                });
            } else {
                console.log('No license directory found for: ' + licenseTier);
            }
        });
    }
}
// Global storage for the Google drive object returned from the authorize callback.
// var drive = {};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
// function authorize(credentials, callback) {
//   const {client_secret, client_id, redirect_uris} = credentials.installed;
//   const oAuth2Client = new google.auth.OAuth2(
//       client_id, client_secret, redirect_uris[0]);

//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) return getAccessToken(oAuth2Client, callback);
//     oAuth2Client.setCredentials(JSON.parse(token));
//     callback(oAuth2Client);
//   });
// }

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
// function getAccessToken(oAuth2Client, callback) {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//   });
//   console.log('Authorize this app by visiting this url:', authUrl);
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('Enter the code from that page here: ', (code) => {
//     rl.close();
//     oAuth2Client.getToken(code, (err, token) => {
//       if (err) return console.error('Error retrieving access token', err);
//       oAuth2Client.setCredentials(token);
//       // Store the token to disk for later program executions
//       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//         if (err) return console.error(err);
//         console.log('Token stored to', TOKEN_PATH);
//       });
//       callback(oAuth2Client);
//     });
//   });
// }

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
// function findDirectory(searchName, isChild=false, parentId="") {
//     var mimeType = ""
//     if(isChild) {
//         mimeType = "mimeType = 'application/vnd.google-apps.folder' and name = '" + searchName + "' and '" + parentId + "' in parents"
//     } else {
//         mimeType = "mimeType = 'application/vnd.google-apps.folder' and name = '" + searchName + "'";
//     }

//     drive.files.list({
//         pageSize: 10,
//         fields: 'nextPageToken, files(id, name)',
//         q: mimeType
//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const files = res.data.files;
//         if (files.length) {
//         console.log('Files:');
//         files.map((file) => {
//             console.log(`${file.name} (${file.id})`);
//         });
//         } else {
//         console.log('No files found.');
//         }
//     });
//  }
// /**
//  * Assigns the authorized google drive to the drive global varaible.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function assignDrive(auth) {
//   drive = google.drive({version: 'v3', auth});
// }

// module.exports = {findDirectory: findDirectory, authorize:authorize, assignDrive: assignDrive};