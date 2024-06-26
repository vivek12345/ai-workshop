import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const promptTemplate = PromptTemplate.fromTemplate(
  `What is the capital of {country}?`
);

const prompt = await promptTemplate.partial({ country: "India" });

console.log(prompt);

const response = await llm.invoke(prompt);

console.log(response.content);
