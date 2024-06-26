import { ChatAnthropic } from "@langchain/anthropic";
import dotenv from "dotenv";

dotenv.config();

const chat = new ChatAnthropic({
  apiKey: process.env.CLAUDE_API_KEY,
  model: "claude-3-5-sonnet-20240620",
});

const question = "What is the capital of France?";
const response = await chat.invoke(question);

console.log(response.content);
