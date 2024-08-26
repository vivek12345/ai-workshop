import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
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

const vectoreStore = await FaissStore.fromDocuments(
  chunks,
  new OpenAIEmbeddings()
);

const retriever = vectoreStore.asRetriever();

const query = "What is the budget for railways?";

const response = await retriever.invoke(query);

console.log(response);
