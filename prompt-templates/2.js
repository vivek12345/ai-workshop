import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
dotenv.config();

// prompt templates with system messages

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const messages = [
  new SystemMessage({content: ""}),
  ["human", "what is capital of {country}"]
];

const promptTemplate = ChatPromptTemplate.fromMessages(messages);




