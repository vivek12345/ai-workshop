import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

import { SystemMessage } from "@langchain/core/messages";

dotenv.config();

const messages = [
  new SystemMessage({ content: "You are a helpful assistant." }),
  ["human", "What is the capital of {country}?"],
];

const promptTemplate = ChatPromptTemplate.fromMessages(messages);

const chat = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = await promptTemplate.format({ country: "France" });
const response = await chat.invoke(prompt);

console.log(response.content);
