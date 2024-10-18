# Email to Discord Summarizer Bot

(This README was generated with AI)

This project is a Node.js application that fetches emails from a specified sender using the Gmail API, summarizes their content, and sends the summary to a specified Discord channel. It is designed to run as a daily cron job, automating the process of summarizing new emails and notifying users on Discord.

## Features
- Fetches emails from a specified sender (e.g., notifications from a learning management system).
-	Summarizes the emails’ content (graded assignments, new assignments, announcements).
-	Sends the summary as a message to a specified Discord channel.
-	Can be scheduled to run at specific intervals using `node-cron`.

## Prerequisites

Before running this project, you will need the following:

1. Node.js: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
2. Gmail API Credentials: You need to set up a project on Google Cloud Console and enable the Gmail API.
3. Discord Bot Token: Create a Discord bot, add it to your server with DMs open

## Usage

1. Clone the repository:

```bash
git clone https://github.com/your-username/email-discord-summarizer.git
cd email-discord-summarizer
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the .env file:

Create a .env file in the root directory of your project with the following content:
```env
BOT_TOKEN=your_discord_bot_token
CHANNEL_ID=your_discord_channel_id
TARGET_SENDER=notifications@instructure.com
CREDENTIALS_PATH=./credentials.json
TOKEN_PATH=./token.json
```
Replace `your_discord_bot_token` and `your_discord_channel_id` with your actual Discord bot token and channel ID.

4. Add your `credentials.json` to the root directory of the project.
  * Download `credentials.json` from Google Cloud after setting up the Gmail API.

5. Run the application for the first time to authenticate with Google:

```bash
npm start
```
The app will prompt you to visit a URL, authorize access to your Gmail, and paste the generated token back into the terminal. This will generate a `token.json` file for future access.

Once everything is set up, this will fetch the emails from the specified sender, summarize their contents, and send the summary to the specified Discord channel.

## Scheduled Task

The script is scheduled to run daily at 12 AM UTC (8 PM EST) using `node-cron`. This is configured inside `src/index.js`:

```js
cron.schedule('0 0 * * *', () => {
  log('Running daily email summarization task...');
  processEmails();
});
```

You can modify this cron schedule as per your requirements by referring to [cron syntax](https://crontab.guru/).

## Gmail API Setup

To use the Gmail API, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project.
3. Enable the Gmail API for your project.
4. Create OAuth2 credentials (for desktop apps), and download the `credentials.json` file.
5. Place `credentials.json` in the root of your project.

## Discord Bot Setup

To set up a Discord bot:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Create a new application and create a bot for the application.
3. Add the bot to your server using OAuth2 URL Generator (make sure to give it the Bot scope).
4. Copy the bot token and place it in the `.env` file.

## Environment Variables

The application uses the following environment variables, which should be defined in the `.env` file:

* BOT_TOKEN: Your Discord bot token.
* CHANNEL_ID: The ID of the Discord channel where the summary will be sent.
* TARGET_SENDER: The email address from which to fetch emails (e.g., notifications@instructure.com).
* CREDENTIALS_PATH: Path to the `credentials.json` file for Gmail API access.
* TOKEN_PATH: Path to store the OAuth token.

