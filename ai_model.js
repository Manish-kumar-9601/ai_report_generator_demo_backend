import { ChatOpenAI } from "@langchain/openai";
const { ChatOpenAI } = require("@langchain/openai"); // ✅ Use require instead of import
 
const model = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0, // Adjust as needed
    openAIApiKey: process.env.OPENAI_API_KEY,
});
 