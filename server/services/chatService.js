import axios from "axios";


async function fetchChatCompletion(data, apiKey) {
  const config = {
    method: "post",
    url: "https://api.chatanywhere.org/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    data
  };

  const response = await axios(config);
  return response.data.choices?.[0]?.message?.content || "No response from OpenAI.";
}

export default fetchChatCompletion;


