import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAI } from "@langchain/openai";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

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

const formatDocs = (docs) => {
  return docs.map((doc) => doc.pageContent).join("\n");
};

const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = PromptTemplate.fromTemplate(
  `Answer the question based on the context provided.

    Context: {context}

    Question: {question}`
);

const chain = RunnableSequence.from([
  {
    context: retriever.pipe(formatDocs),
    question: new RunnablePassthrough(),
  },
  prompt,
  llm,
  new StringOutputParser(),
]);

const response = await chain.invoke("What is the budget for railways?");

console.log(response);
