import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import dotenv from "dotenv";

dotenv.config();

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ephimeralHistory = new ChatMessageHistory();

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability.",
  ],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

const chain = promptTemplate.pipe(llm);

const chainWithMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: (_sessionID) => ephimeralHistory,
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

const response = await chainWithMessageHistory.invoke(
  {
    input:
      "Translate this sentence from English to French: I love programming.",
  },
  {
    configurable: {
      sessionId: "session1",
    },
  }
);

console.log(response.content);

const response1 = await chainWithMessageHistory.invoke(
  {
    input: "What language did I ask you to translate from and to",
  },
  {
    configurable: {
      sessionId: "session1",
    },
  }
);

console.log(response1.content);
