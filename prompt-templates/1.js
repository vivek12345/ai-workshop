import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const chat = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
