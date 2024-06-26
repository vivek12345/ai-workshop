import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const embeddings = new OpenAIEmbeddings();

// embed query
const response = await embeddings.embedQuery("What is the capital of France?");

// embed documents

const docsEmbeddings = await embeddings.embedDocuments([
  "The capital of France is Paris.",
  "The Eiffel Tower is in Paris.",
]);

console.log(docsEmbeddings);
