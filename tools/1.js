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

const llm = new ChatOpenAI();

const llmWithTools = llm.bindTools([calculatorTool]);

const result = await llmWithTools.invoke("what is 10 + 20");

console.log(result);
