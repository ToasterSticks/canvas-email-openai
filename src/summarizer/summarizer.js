const { log } = require('../utils/logger');
const { prompt } = require('../utils/prompt');

async function summarizeText(text) {
	try {
		const { Client } = await import('@gradio/client');
		const client = await Client.connect('yuntian-deng/ChatGPT4');

		await client.predict('/reset_textbox');

		const response = await client.predict('/predict', {
			inputs: `${prompt}\n\n${text}`,
			top_p: 0.1,
			temperature: 0,
			chat_counter: 0,
		});

		const summary = response?.data?.[0][0][1] || 'No summary available.';
		log('Summary generated successfully.');
		return summary;
	} catch (error) {
		log(`Error summarizing text: ${error}`);
		return null;
	}
}

module.exports = { summarizeText };
