const prompt = `
Summarize the content of these emails without any introduction or concluding statements
Provide dates in (MM/DD)
Use exact class/assignment names
Truncate decimals over 3 places, otherwise preserve precision
Keep announcements concise

Ensure the summary uses this exact following structure:
## Graded Assignments (as of {date in Eastern Standard Time})
  * **{class}**:
    * {name}: {score (e.g. 10/20)}
## New Assignments
  * **{class}**:
    * {name}: Due {date & time}
## Announcements
  * **{class or group}**:
    * {content}`;

module.exports = { prompt };
