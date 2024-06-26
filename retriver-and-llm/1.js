import { OpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import dotenv from "dotenv";
dotenv.config();

const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

const retriever = vectorStore.asRetriever();

const SYSTEM_TEMPLATE = `Answer the user's questions based on the below context. 
If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know":

<context>
{context}
</context>
`;

const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
  ["system", SYSTEM_TEMPLATE],
  ["user", "{input}"],
]);

const documentChain = await createStuffDocumentsChain({
  llm,
  prompt: questionAnsweringPrompt,
});

const retrivalChain = await createRetrievalChain({
  retriever,
  combineDocsChain: documentChain,
});

const response = await retrivalChain.invoke({
  input: "what is the budget for railways?",
});

console.log(response);
