const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { log } = require('../utils/logger');
const config = require('../../config/config');

async function authorize() {
  const credentials = JSON.parse(fs.readFileSync(path.resolve(config.credentialsPath)));
  const { client_id, client_secret, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(path.resolve(config.tokenPath))) {
    const token = JSON.parse(fs.readFileSync(path.resolve(config.tokenPath)));
    oAuth2Client.setCredentials(token);
  } else {
    await getNewToken(oAuth2Client);
  }
  return oAuth2Client;
}

function getNewToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    });
    log('Authorize this app by visiting this url: ' + authUrl);
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question('Enter the code from that page here: ', (code) => {
      readline.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject(err);
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(path.resolve(config.tokenPath), JSON.stringify(token));
        log('Token stored to ' + config.tokenPath);
        resolve(oAuth2Client);
      });
    });
  });
}

module.exports = { authorize };
