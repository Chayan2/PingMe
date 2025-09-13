require("dotenv").config();

module.exports = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL
};
