import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
<<<<<<< HEAD
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
||||||| 5cc0fdb

=======

import { SystemMessage } from "@langchain/core/messages";

>>>>>>> 72d8f24bbf8adf884ec49c63c0f90d34f4218239
dotenv.config();

const messages = [
  new SystemMessage({ content: "You are a helpful assistant." }),
  ["human", "What is the capital of {country}?"],
];

const promptTemplate = ChatPromptTemplate.fromMessages(messages);

const llm = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
<<<<<<< HEAD

const messages = [
  new SystemMessage({content: ""}),
  ["human", "what is capital of {country}"]
];

const promptTemplate = ChatPromptTemplate.fromMessages(messages);




||||||| 5cc0fdb
=======

const prompt = await promptTemplate.format({ country: "France" });
const response = await chat.invoke(prompt);

console.log(response.content);
>>>>>>> 72d8f24bbf8adf884ec49c63c0f90d34f4218239
