import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import dotenv from "dotenv";

import { HumanMessage, AIMessage } from "@langchain/core/messages";

dotenv.config();

const ephimeralHistory = new ChatMessageHistory();

await ephimeralHistory.addMessage(
  new HumanMessage(
    "Translate this sentence from English to French: I love programming."
  )
);

await ephimeralHistory.addMessage(new AIMessage("J'adore la programmation."));

const memories = await ephimeralHistory.getMessages();

console.log(memories);
