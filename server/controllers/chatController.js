import rewriteQuery from "../services/queryRewrite.js";
import generateEmbedding from '../services/embeddingService.js'
import fetchChatCompletion from '../services/chatService.js'
import index from "../config/pineconeclient.js";

console.log("process.env.OPENAI_API_KEY "+process.env.OPENAI_API_KEY)

async function chatController(req, res) {
  try {
    const { messages: userMessage, chatHistory } = req.body;

    console.log("📩 Incoming request body:", req.body);

    if (!userMessage) {
      console.warn(" No user message provided");
      return res.status(400).json({ error: "Message required" });
    }

    // Step 1: Rewrite query

    const finalQuery = await rewriteQuery(userMessage,chatHistory);
    console.log("Rewritten query:", finalQuery);

    // Step 2: Create embedding
    const vector = await generateEmbedding(finalQuery);
    // console.log(" Generated embedding vector length:", vector?.length);

    // Step 3: Search Pinecone
    const results = await index.query({ vector, topK: 3, includeMetadata: true });
    // console.log(" Pinecone raw results:", JSON.stringify(results, null, 2));

    const context = results?.matches?.map(m => m.metadata?.text || "").join("\n\n");
    // console.log(" Extracted context:", context);

    // Step 4: Create Chat Payload
    const data = {
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant that only answers from KB context." },
        { role: "system", content: `KB Context:\n${context}` },
        ...chatHistory,
        {
          role: "user",
          content: `User: ${userMessage}\nAnswer strictly using KB. If KB is missing, give generic advice but mention it's not KB verified.`
        }
      ],
      temperature: 0.7
    };
    // console.log("🛠 Chat payload:", JSON.stringify(data, null, 2));

    // Step 5: Get Response
    const answer = await fetchChatCompletion(data, process.env.OPENAI_API_KEY);
    // console.log("OpenAI Answer:", answer);

    res.json({ answer });
  } catch (err) {
    console.error("ChatController error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// module.exports = chatController;
export default chatController;