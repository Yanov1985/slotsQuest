require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
  try {
    const models = await openai.models.list();
    console.log('Available models count:', models.data.length);
    console.log('API Key works!');
  } catch (error) {
    console.error('Error accessing OpenAI API:', error.message);
    process.exit(1);
  }
})();
