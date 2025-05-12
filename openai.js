require("dotenv").config();
const { OpenAI } = require("openai");

// ✅ Ensure correct baseURL and model access (GPT-4 requires elevated access)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.openai.com/v1", // Default base URL
  organization: process.env.OPENAI_ORGANIZATION_ID, // Optional but recommended
});

module.exports = openai;
