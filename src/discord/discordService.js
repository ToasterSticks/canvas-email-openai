const axios = require('axios');
const { log } = require('../utils/logger');
const config = require('../../config/config');

async function sendSummaryDM(content) {
	const url = `https://discord.com/api/v10/channels/${config.channelId}/messages`;

	try {
		await axios.post(
			url,
			{ content: content.substring(0, 2000) },
			{
				headers: {
					Authorization: `Bot ${config.botToken}`,
					'Content-Type': 'application/json',
				},
			}
		);
		log('Summary sent to Discord successfully.');
	} catch (error) {
		const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
		log(`Error sending message to Discord: ${errorMsg}`);
	}
}

module.exports = { sendSummaryDM };
