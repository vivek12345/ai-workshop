import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const embedding = new OpenAIEmbeddings();


// docs

const result1 = await embedding.embedDocuments();

console.log(result1);
