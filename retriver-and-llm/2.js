import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from "dotenv";
import { OpenAI } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "@langchain/core/prompts";
dotenv.config();

// loaded pdf
const loader = new PDFLoader(
  "/Users/viveknayyar/vivek/ai-workshop/docs/budget_speech.pdf"
);

const docs = await loader.load();

// chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 10,
});

const chunks = await splitter.splitDocuments(docs);

// created embedding and stored in vector db
const vectorStore = await FaissStore.fromDocuments(
  chunks,
  new OpenAIEmbeddings()
);

// created a retriver to fetch data from vector db
const retriever = vectorStore.asRetriever();

// created llm

const llm = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

// created a chaim to load all docs and pass to llm
const documentChain = await createStuffDocumentsChain({
  llm,
  prompt: questionAnsweringPrompt,
});

// we created chain to fetch the data from vector db and then pass to doc chain which will
// eventually pass it to the llm
const retrivalChain = await createRetrievalChain({
  retriever,
  combineDocsChain: documentChain,
});

const query = "What is the budget allocated for railways";

const response = await retrivalChain.invoke({
  input: query,
});

console.log(response.answer);
