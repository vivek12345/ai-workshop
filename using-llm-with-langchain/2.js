import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

// we have connected to our gpt model
// TODO: Change model to gpt-4
const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// we have a question

const question = "What is the capital of India?";
// we are invoking the model

const response = await llm.invoke(question);

console.log(response.content);
