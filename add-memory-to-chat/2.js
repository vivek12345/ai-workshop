import { ChatOpenAI } from "@langchain/openai";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import dotenv from "dotenv";

import { HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

dotenv.config();

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ephimeralHistory = new ChatMessageHistory();
ephimeralHistory.addMessage(
  new HumanMessage(
    "Translate this sentence from English to French: I love programming."
  )
);

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability.",
  ],
  new MessagesPlaceholder("messages"),
]);

const prompt = await promptTemplate.format({
  messages: await ephimeralHistory.getMessages(),
});
const response = await llm.invoke(prompt);

await ephimeralHistory.addMessage(response);

const memories = await ephimeralHistory.getMessages();

console.log(memories);
