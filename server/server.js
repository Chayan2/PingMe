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
    const response = await axios.post(
      `${OPENAI_BASE_URL}/chat/completions`,
      {
        model: 'gpt-4', // or another model if you prefer
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant. you can answer questions and provide information based on the user\'s input.'
            },
            { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

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