/**
 * name
 * description
 * json schema of input
 * function to execute
 */

import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createRetrieverTool } from "langchain/tools/retriever";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
dotenv.config();

// calculator schema
const inputSchema = z.object({
  input1: z.number().describe("The first number to operate on."),
  input2: z.number().describe("The second number to operate on."),
  operation: z
    .enum(["add", "subtract", "multiply", "divide"])
    .describe("The operation to perform."),
});

const functionToExecute = async ({ operation, input1, input2 }) => {
  let result;
  switch (operation) {
    case "add":
      result = `${input1 + input2}`;
      break;
    case "subtract":
      result = `${input1 - input2}`;
      break;
  }
  return result;
};

const calculatorTool = tool(functionToExecute, {
  name: "calculator",
  description: "Can perform mathematical operations.",
  schema: inputSchema,
});

const loader = new PDFLoader(
  "/Users/viveknayyar/vivek/ai-workshop/docs/budget_speech.pdf"
);
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 10,
});

const chunks = await splitter.splitDocuments(docs);

const vectoreStore = await FaissStore.fromDocuments(
  chunks,
  new OpenAIEmbeddings()
);

const retriever = vectoreStore.asRetriever();

const retrievalTool = createRetrieverTool(retriever, {
  name: "retriever",
  description: "Can retrieve information from the document related to budget.",
});

const tools = [calculatorTool, retrievalTool];

const llm = new ChatOpenAI({
  model: "gpt-4o",
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant"],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
  ["placeholder", "{agent_scratchpad}"],
]);

const agent = createToolCallingAgent({
  llm,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
  verbose: true,
});

const response = await agentExecutor.invoke({
  input: "What is the budget for railways?",
});

console.log(response);
