import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 10,
  chunkOverlap: 1,
});

const text = "Hi.\n\nI'm Vivek.How are you doing?";

const chunks = await splitter.createDocuments([text]);

console.log(chunks);
