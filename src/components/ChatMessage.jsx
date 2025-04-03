import React from 'react';

const ChatMessage = ({ message, isUser, onOptionClick, isLatestMessage = false }) => {
  const handleOptionClick = (option) => {
    if (!isLatestMessage) return; // Only allow clicks on the latest message
    onOptionClick(option);
  };

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
      </div>
      {isUser && <div className="user-avatar">👤</div>}
      
      <style jsx>{`
        .chat-message {
          display: flex;
          margin-bottom: 16px;
          max-width: 100%;
        }

        .user-message {
          justify-content: flex-end;
        }

        .bot-message {
          justify-content: flex-start;
        }

        .message-content {
          background-color: ${isUser ? '#4a86e8' : '#f1f1f1'};
          padding: 10px 16px;
          border-radius: 12px;
          max-width: 80%;
        }

        .user-message .message-content {
          color: white;
          margin-right: 10px;
        }

        .bot-message .message-content {
          color: #333;
          margin-left: 10px;
        }

        .message-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .option-button {
          padding: 6px 12px;
          background: ${isUser ? '#3871c8' : '#ddd'};
          border: 1px solid ${isUser ? '#2e5da9' : '#ccc'};
          color: ${isUser ? 'white' : '#333'};
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .option-button:hover:not(.disabled-button) {
          background: ${isUser ? '#2e5da9' : '#ccc'};
        }

        .disabled-button {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .bot-avatar, .user-avatar {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default ChatMessage;