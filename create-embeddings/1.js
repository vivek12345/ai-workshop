import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

dotenv.config();

const embedding = new OpenAIEmbeddings();

const loader = new PDFLoader(
  "/Users/viveknayyar/vivek/ai-workshop/docs/budget_speech.pdf"
);

const docs = await loader.load();
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 10,
});

const chunks = await splitter.splitDocuments(docs);

// docs

const result = await embedding.embedDocuments(chunks.slice(0, 3));

console.log(result);
