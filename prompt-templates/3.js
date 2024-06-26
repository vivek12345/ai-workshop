import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import dotenv from "dotenv";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";

dotenv.config();

// prompt templates with placeholders messages

const chat = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
