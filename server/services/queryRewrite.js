import openai from '../config/openaiclient.js'


async function rewriteQuery(userMessage, chatHistory) {
  const prompt = `Rewrite the user query as a standalone question based on chat history.
Conversation: ${chatHistory.map(m => m.role + ": " + m.content).join("\n")}
User query: "${userMessage}"
Rewritten query:`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    // console.log("inside rewrite:", JSON.stringify(response, null, 2));
    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error in rewriteQuery:", err.message);
    return "Failed to rewrite query.";
  }
}

export default rewriteQuery;
 