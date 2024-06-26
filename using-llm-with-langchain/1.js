import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const chat = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const question = "What is the capital of France?";
const response = await chat.invoke(question);

console.log(response.content);
