import React from 'react';
const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;