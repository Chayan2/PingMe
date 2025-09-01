import openai from "../config/openaiclient.js";
async function generateEmbedding(text) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });
  return embedding.data[0].embedding;
}


export default generateEmbedding; 