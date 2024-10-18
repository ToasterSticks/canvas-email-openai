const { log } = require('../utils/logger');

async function summarizeText(text) {
	try {
		const { Client } = await import('@gradio/client');
		const client = await Client.connect('yuntian-deng/ChatGPT4');

		await client.predict('/reset_textbox');

		const response = await client.predict('/predict', {
			inputs: `
      Summarize the content of these emails without any introduction or concluding statements
			Provide dates in (month, dd, yyyy)
			Use exact class/assignment names
			Truncate decimals over 3 places
			Keep character count below 2000
			
			Ensure the summary uses the following structure:
			## Graded Assignments (as of {date})
				* **{class}**:
				* * {name}: {score (e.g. 10/20)}
			## New Assignments
				* **{class}**:
				* * {name}: Due {date & time}
			## Announcements
				* **{class or group}**:
				* * {content}\n\n${text}`,
			top_p: 1,
			temperature: 1,
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
