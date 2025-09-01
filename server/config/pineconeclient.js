import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "pcsk_3V6qvg_6NNpNJzgGkrDRZcV2atAo6ByoSugaLAhB3zE7DTDicaSQBSCTpvxxSQYhUUbz5A" ,
});

const index = pinecone.index("chayan-dental"); //index name

export default index;
