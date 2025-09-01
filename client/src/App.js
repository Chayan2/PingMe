import React, { useState } from "react";
import chatService from './services/callChatCompletion';
import ChatHistoryArea from './components/chatarea';
import './css/App.css';

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    // Only proceed if there's a message and not already loading
    if (!message.trim() || loading) return;

    // Add user message to history
    const newUserMessage = { role: "user", content: message };
    setChatHistory(prevHistory => [...prevHistory, newUserMessage]);
    setMessage(""); // Clear input immediately
    setLoading(true);

    try {
      const currentChatHistory = [...chatHistory, newUserMessage];
      const res = await chatService(message, currentChatHistory);
      
      const newAssistantMessage = { 
        role: "assistant", 
        content: res.answer || "Sorry, I couldn't get a response. Please try again." 
      };
      
      setChatHistory(prevHistory => [...prevHistory, newAssistantMessage]);
      setResponse(res);
    } catch (err) {
      console.error("Failed to get response", err);
      setResponse({ error: "Failed to get response" });
      const errorMessage = { 
        role: "assistant", 
        content: "Oops! Something went wrong. Please try again." 
      };
      setChatHistory(prevHistory => [...prevHistory, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <ChatHistoryArea chatHistory={chatHistory} loading={loading} />
      <div className="input-group fixed-bottom">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          disabled={loading}
        />
        <button className="btn btn-primary" onClick={handleSend} disabled={loading || !message.trim()}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;