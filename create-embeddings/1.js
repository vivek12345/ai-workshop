import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";

dotenv.config();

const embedding = new OpenAIEmbeddings();

const loader = new PDFLoader(
  "/Users/viveknayyar/vivek/ai-workshop/docs/budget_speech.pdf"
);

const docs = await loader.load();

// docs

const result = await embedding.embedDocuments();

console.log(result);
