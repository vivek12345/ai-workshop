import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const joke = z.object({
  setup: z.string().describe("The setup of the joke"),
  punchline: z.string().describe("The punchline to the joke"),
  rating: z.number().optional().describe("How funny the joke is, from 1 to 10"),
});

const jsonModel = model.withStructuredOutput(joke);

const question = "Tell me a joke about cats";
const response = await jsonModel.invoke(question);

console.log(response);
