import React from 'react';

const ChatMessage = ({ message, isUser, options, onOptionClick }) => {
  // If message is an object with text and buttons
  if (typeof message === 'object' && message.text) {
    return (
      <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
        <div className="message-avatar">
          {isUser ? '👤' : '🤖'}
        </div>
        <div className="message-content">
          <div className="message-text">{message.text}</div>
          {message.buttons && (
            <div className="message-buttons">
              {message.buttons.map((button, index) => (
                <button
                  key={index}
                  className="message-button"
                  onClick={() => onOptionClick(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular text message
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className="message-content">
        <div className="message-text">{message}</div>
        {options && options.length > 0 && (
          <div className="message-buttons">
            {options.map((option, index) => (
              <button
                key={index}
                className="message-button"
                onClick={() => onOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;