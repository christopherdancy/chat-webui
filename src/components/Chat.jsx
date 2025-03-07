// src/components/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { processMessage } from '../services/chatService';

const Chat = ({ onPreviewUpdate, websiteConfig }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your website editor assistant. How would you like to customize your Hello World template?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // Process the message and get a response
      const response = await processMessage(userMessage, websiteConfig);
      
      // Add bot response
      setMessages(prev => [...prev, { text: response.message, isUser: false }]);
      
      // If there are updates to the website, notify parent component
      if (response.updatedConfig) {
        onPreviewUpdate(response.updatedConfig);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I had trouble processing that request. Could you try again?", 
        isUser: false 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages" style={{ height: '400px', overflowY: 'auto' }}>
        <div className="system-message">
          Welcome to Website Chat Editor! Describe changes you'd like to make to your website.
        </div>
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.text} 
            isUser={msg.isUser} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your changes here..."
          className="chat-input"
          disabled={isProcessing}
        />
        <button type="submit" className="chat-submit-button" disabled={isProcessing}>
          {isProcessing ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
