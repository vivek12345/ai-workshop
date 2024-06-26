import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const promptTemplate = PromptTemplate.fromTemplate(
  `What is the capital of {country}?`
);

const chat = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = await promptTemplate.format({ country: "France" });
console.log(prompt);
const response = await chat.invoke(prompt);

console.log(response.content);
