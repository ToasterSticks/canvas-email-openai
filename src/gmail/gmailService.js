const { google } = require('googleapis');
const { log } = require('../utils/logger');

async function fetchEmails(auth, targetSender) {
  const gmail = google.gmail({ version: 'v1', auth });
  try {
    let allMessages = [];
    let nextPageToken = null;

    // Fetch all message IDs matching the query
    do {
      const res = await gmail.users.messages.list({
        userId: 'me',
        q: `from:${targetSender} newer_than:36h`,
        maxResults: 500,
        pageToken: nextPageToken,
      });

      const messages = res.data.messages || [];
      allMessages = allMessages.concat(messages);
      nextPageToken = res.data.nextPageToken;
    } while (nextPageToken);

    log(`Found ${allMessages.length} emails from ${targetSender} in the past 36 hours.`);

    const emailPromises = allMessages.map((message) =>
      gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full',
      })
    );

    const messagesData = await Promise.all(emailPromises);

    // Extract subject and body from each email
    const emailContents = messagesData.map((msg) => {
      const headers = msg.data.payload.headers;
      const subjectHeader = headers.find((header) => header.name === 'Subject');
      const subject = subjectHeader ? subjectHeader.value : '(No Subject)';

      const parts = msg.data.payload.parts;
      let body = '';

      if (parts) {
        for (const part of parts) {
          if (part.mimeType === 'text/plain' && part.body.data) {
            body += Buffer.from(part.body.data, 'base64').toString('utf-8');
          }
        }
      } else if (msg.data.payload.body.data) {
        body = Buffer.from(msg.data.payload.body.data, 'base64').toString('utf-8');
      }

      return `Subject: ${subject}\nBody: ${body}`;
    });

    return emailContents.join('\n\n');
  } catch (error) {
    log(`Error fetching emails: ${error}`);
    return null;
  }
}

module.exports = { fetchEmails };
