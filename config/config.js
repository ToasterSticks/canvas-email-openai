require('dotenv').config();

module.exports = {
  botToken: process.env.BOT_TOKEN,
  channelId: process.env.CHANNEL_ID,
  targetSender: process.env.TARGET_SENDER,
  credentialsPath: process.env.CREDENTIALS_PATH || './credentials.json',
  tokenPath: process.env.TOKEN_PATH || './token.json',
};
