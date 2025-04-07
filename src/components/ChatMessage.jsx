import React from 'react';

const ChatMessage = ({ message, isUser, onOptionClick, isLatestMessage = false }) => {
  const handleOptionClick = (option) => {
    if (!isLatestMessage) return; // Only allow clicks on the latest message
    onOptionClick(option);
  };

  // Get current time for the message
  const timestamp = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      {!isUser && <div className="bot-avatar">🤖</div>}
      <div className="message-content">
        <p>{message.text}</p>
        {message.buttons && (
          <div className="message-buttons">
            {message.buttons.map((button, index) => (
              <button 
                key={index} 
                onClick={() => handleOptionClick(button)}
                className={`option-button ${!isLatestMessage ? 'disabled-button' : ''}`}
                disabled={!isLatestMessage}
              >
                {button}
              </button>
            ))}
          </div>
        )}
        <div className="message-timestamp">{timestamp}</div>
      </div>
      {isUser && <div className="user-avatar">👤</div>}
    </div>
  );
};

export default ChatMessage;