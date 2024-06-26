import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import dotenv from "dotenv";
import { count } from "console";

dotenv.config();

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const messages = [
  new SystemMessage({ content: "You are a helpful assistant." }),
  ["human", "What is the capital of {country}?"],
];

const promptTemplate = ChatPromptTemplate.fromMessages(messages);

const prompt = await promptTemplate.invoke({ country: "France" });

const response = await model.invoke(prompt);

console.log(response.content);
