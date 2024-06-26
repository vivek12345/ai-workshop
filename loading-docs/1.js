import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";

dotenv.config();

const loader = new PDFLoader(
  "/Users/viveknayyar/vivek/ai-workshop/docs/budget_speech.pdf"
);

const docs = await loader.load();

console.log(docs);
