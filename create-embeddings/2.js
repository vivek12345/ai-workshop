<<<<<<< HEAD
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const embedding = new OpenAIEmbeddings();


// docs

const result1 = await embedding.embedDocuments();

console.log(result1);
||||||| 5cc0fdb
=======
// TODO: Create embeddings for documents - Array of chunks
>>>>>>> 72d8f24bbf8adf884ec49c63c0f90d34f4218239
