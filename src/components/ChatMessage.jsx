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

  // Format message text to handle long URLs
  const formatMessageText = (text) => {
    // Check if this is a success message with a long URL
    if (text.includes('✅') && text.includes('https://')) {
      // Find the URL within quotes
      const urlMatch = text.match(/"(https:\/\/[^"]+)"/);
      if (urlMatch && urlMatch[1]) {
        const url = urlMatch[1];
        // Split the message around the URL
        const parts = text.split(url);
        return (
          <>
            {parts[0]}
            <span className="truncated-url" title={url}>
              {url.substring(0, 25)}...{url.substring(url.length - 15)}
            </span>
            {parts[1]}
          </>
        );
      }
    }
    return text;
  };

  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'bot-message'}`}>
      {!isUser && <div className="bot-avatar">🤖</div>}
      <div className="message-content">
        <p>{formatMessageText(message.text)}</p>
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