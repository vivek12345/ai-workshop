import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";
dotenv.config();

const loader = new PDFLoader(
  "/Users/viveknayyar/vivek/ai-workshop/docs/budget_speech.pdf"
);

const docs = await loader.load();

const vectorStore = await FaissStore.fromDocuments(
  docs,
  new OpenAIEmbeddings()
);

const query = "What is the budget for railways?";
const response = await vectorStore.similaritySearch(query, 1);

console.log(response);
