import React, { useEffect, useRef } from 'react';

function ChatHistoryArea({ chatHistory, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, loading]);

  return (
    <div className="chat-history">
      {chatHistory && chatHistory.length > 0 ? (
        chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`message ${chat.role === 'user' ? 'user' : 'assistant'}`}
          >
            {chat.content}
          </div>
        ))
      ) : (
        <div className="text-muted text-center">Start the conversation!</div>
      )}
      {loading && (
        <div className="message assistant loader-message">
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
          <div className="loader-dot"></div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatHistoryArea;