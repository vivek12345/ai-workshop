import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

dotenv.config();

const embeddings = new OpenAIEmbeddings();

<<<<<<< HEAD
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
||||||| 5cc0fdb
const loader = new PDFLoader(
  "/Users/viveknayyar/vivek/ai-workshop/docs/budget_speech.pdf"
);

const docs = await loader.load();

// docs

const result = await embedding.embedDocuments();

console.log(result);
=======
// embed query
const response = await embeddings.embedQuery("What is the capital of France?");
>>>>>>> 72d8f24bbf8adf884ec49c63c0f90d34f4218239
