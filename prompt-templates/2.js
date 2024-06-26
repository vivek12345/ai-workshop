import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

// prompt templates with system messages

const chat = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
