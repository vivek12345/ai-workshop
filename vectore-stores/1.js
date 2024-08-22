import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import dotenv from "dotenv";

dotenv.config();

const vectorStore = await FaissStore.fromTexts(
  [
    "The capital of France is Paris",
    "The capital of India is New Delhi",
    "The capital of Germany is Berlin",
  ],
  [{ id: 2 }, { id: 1 }, { id: 3 }],
  new OpenAIEmbeddings()
);

const query = "France capital?";

const response = await vectorStore.similaritySearchWithScore(query);

console.log(response);
