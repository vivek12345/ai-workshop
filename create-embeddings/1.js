import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const embeddings = new OpenAIEmbeddings();

// embed query
const response = await embeddings.embedQuery("What is the capital of France?");
