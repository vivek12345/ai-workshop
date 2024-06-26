import dotenv from "dotenv";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
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

console.log(chunks.slice(0, 3));
