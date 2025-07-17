const express = require('express');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(express.json()); // Enable JSON body parsing

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';

console.log("Server is starting...");

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const userMessage = req.body.messages;
  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required in the request body.' });
  }

  try {
    console.log('Received message:', OPENAI_API_KEY);
    let data = JSON.stringify({
      "model": "gpt-4",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant that processes text based on user instructions."
        },
        {
          "role": "user",
          "content": userMessage + "\nInstruction:\ always respond in a concise manner, no more than 100 words."
        }
      ],
      "temperature": 0.7
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.chatanywhere.org/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-FuoJ5sVtxyYL5XrfbkqEKwAlDDVFWSN9tNCRBDDl42EpqaqH'
      },
      data: data
    };

    const response = await axios(config);



    const answer = response.data.choices?.[0]?.message?.content || 'No response from OpenAI.';
    res.json({ answer });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from OpenAI API.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});