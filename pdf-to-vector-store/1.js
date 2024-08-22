import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import dotenv from "dotenv";
dotenv.config();

const loader = new PDFLoader(
  "/Users/viveknayyar/vivek/ai-workshop/docs/budget_speech.pdf"
);

const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 10,
});

const chunks = await splitter.splitDocuments(docs);

const vectorStore = await FaissStore.fromDocuments(
  chunks,
  new OpenAIEmbeddings()
);

const query = "What is the budget allocated for railways?";

const response = await vectorStore.similaritySearch(query);

console.log(response);
