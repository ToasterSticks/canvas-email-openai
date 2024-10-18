const cron = require('node-cron');
const { authorize } = require('./gmail/auth');
const { fetchEmails } = require('./gmail/gmailService');
const { summarizeText } = require('./summarizer/summarizer');
const { sendSummaryDM } = require('./discord/discordService');
const { log } = require('./utils/logger');
const config = require('../config/config');

async function processEmails() {
	try {
		const auth = await authorize();
		const emails = await fetchEmails(auth, config.targetSender);
		if (!emails) {
			log('No emails to summarize.');
			return;
		}

		log('Summarizing emails...');
		const summary = await summarizeText(emails);
		if (summary) {
			await sendSummaryDM(summary);
		} else {
			log('No summary generated.');
		}
	} catch (error) {
		log(`Error processing emails: ${error}`);
	}
}

// Schedule the script to run every day at 12AM UTC (8PM EST)
cron.schedule('0 0 * * *', () => {
	log('Running daily email summarization task...');
	processEmails();
});

// Run immediately on start
processEmails();
