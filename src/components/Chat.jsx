// src/components/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatControls from './ChatControls';
import { processMessage } from '../services/chatService';
import { generateCommandStructure } from '../utils/commandStructureGenerator';
import { sectionHandlers, buildCommand } from '../utils/sectionHandlers';
import useChatContext from '../hooks/useChatContext';

const Chat = ({ onPreviewUpdate, websiteConfig }) => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi, I'm your website editor assistant. Below you can find a selection of topics I can help you with.",
      buttons: ['Header', 'Hero', 'Features', 'Benefits', 'Footer']
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentContext, updateContext, resetContext } = useChatContext();
  
  const messagesEndRef = useRef(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [currentIconContext, setCurrentIconContext] = useState(null);
  const [currentColorContext, setCurrentColorContext] = useState(null);
  const [currentImageContext, setCurrentImageContext] = useState(null);

  // Generate command structure from website config
  const commandStructure = React.useMemo(() => generateCommandStructure(websiteConfig), [websiteConfig]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = async (option) => {
    // Add user's selection as a message
    setMessages(prev => [...prev, { text: option, isUser: true }]);

    if (!currentContext.section) {
      handleSectionSelection(option);
    } 
    else if (!currentContext.element) {
      handleElementSelection(option);
    }
    else if (!currentContext.property) {
      handlePropertySelection(option);
    }
    else if (!currentContext.value) {
      handleValueSelection(option);
    }
  };

  const handleSectionSelection = (section) => {
    updateContext({ section });
    const options = sectionHandlers[section].getOptions();
    setMessages(prev => [...prev, {
      text: `What would you like to modify in the ${section} section?`,
      buttons: options
    }]);
  };

  const handleElementSelection = (element) => {
    const normalizedElement = element.toLowerCase().replace(/\s+/g, '');
    updateContext({ element: normalizedElement });
    
    // Special handling for Social Links in Footer
    if (element === 'Social Links' && currentContext.section === 'Footer') {
      updateContext({ element: 'social' }); // Update to match the command structure
    }
    
    const options = sectionHandlers[currentContext.section].getElementOptions(element);
    setMessages(prev => [...prev, {
      text: `What would you like to change about ${element}?`,
      buttons: options
    }]);
  };

  const handlePropertySelection = (property) => {
    const normalizedProperty = property.toLowerCase();
    updateContext({ property: normalizedProperty });
    
    // Handle social media platforms in Footer
    if (currentContext.section === 'Footer' && currentContext.element === 'social') {
      // When a social platform is selected, show its options
      const options = sectionHandlers.Footer.getSocialOptions(property);
      setMessages(prev => [...prev, {
        text: `What would you like to do with ${property}?`,
        buttons: options
      }]);
      return;
    }
    
    if (normalizedProperty === 'color') {
      setShowColorPicker(true);
      setCurrentColorContext({
        section: currentContext.section,
        item: currentContext.element,
        property: normalizedProperty
      });
    }
    else if (normalizedProperty === 'icon') {
      if ((currentContext.section === 'Benefits' || currentContext.section === 'Features') && 
          currentContext.element.startsWith('item')) {
        const options = sectionHandlers[currentContext.section].getIconOptions();
        setMessages(prev => [...prev, {
          text: "What would you like to change about the icon?",
          buttons: options
        }]);
      }
    }
    else if (normalizedProperty === 'upload' || normalizedProperty === 'image') {
      setShowImageUploader(true);
      setCurrentImageContext({
        section: currentContext.section
      });
    }
    else {
      setMessages(prev => [...prev, {
        text: `Please enter the value for ${property.toLowerCase()}:`,
        isValuePrompt: true
      }]);
    }
  };

  const handleValueSelection = async (value) => {
    // Handle icon-specific options
    if (currentContext.property === 'icon') {
      if (value === 'Select Icon') {
        setShowIconPicker(true);
        setCurrentIconContext({
          section: currentContext.section,
          item: currentContext.element
        });
        return;
      } else if (value === 'Icon Color') {
        setShowColorPicker(true);
        setCurrentColorContext({
          section: currentContext.section,
          item: currentContext.element,
          property: 'icon'
        });
        return;
      }
    }

    try {
      setIsProcessing(true);
      const command = buildCommand(currentContext, value);
      
      // If command is null, it means we need to prompt for a value (like URL)
      if (command === null) {
        if (value === 'URL') {
          setMessages(prev => [...prev, {
            text: `Please enter the URL for ${currentContext.property}:`,
            isValuePrompt: true
          }]);
        }
        setIsProcessing(false);
        return;
      }
      
      const response = await processMessage(command, websiteConfig);
      
      setMessages(prev => [...prev, { text: response.message, isUser: false }]);
      
      if (response.updatedConfig) {
        onPreviewUpdate(response.updatedConfig);
      }
      
      resetContext();
      showInitialOptions();
      
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I had trouble processing that request. Let's try again.",
        buttons: ['Header', 'Hero', 'Features', 'Benefits', 'Footer']
      }]);
      resetContext();
    } finally {
      setIsProcessing(false);
    }
  };

  const showInitialOptions = () => {
    setMessages(prev => [...prev, {
      text: "What else would you like to modify?",
      buttons: ['Header', 'Hero', 'Features', 'Benefits', 'Footer']
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    if (currentContext.property && !currentContext.value) {
      handleOptionClick(input.trim());
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg} 
            isUser={msg.isUser || false}
            onOptionClick={handleOptionClick}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatControls
        input={input}
        setInput={setInput}
        isProcessing={isProcessing}
        currentContext={currentContext}
        showIconPicker={showIconPicker}
        showColorPicker={showColorPicker}
        showImageUploader={showImageUploader}
        currentIconContext={currentIconContext}
        currentColorContext={currentColorContext}
        currentImageContext={currentImageContext}
        onSubmit={handleSubmit}
        onIconSelect={(iconClass) => {
          handleOptionClick(iconClass);
          setShowIconPicker(false);
        }}
        onColorSelect={(color) => {
          handleOptionClick(color);
          setShowColorPicker(false);
        }}
        onImageSelect={(imageUrl) => {
          handleOptionClick(imageUrl);
          setShowImageUploader(false);
        }}
        onCloseIconPicker={() => setShowIconPicker(false)}
        onCloseColorPicker={() => setShowColorPicker(false)}
        onCloseImageUploader={() => setShowImageUploader(false)}
      />
    </div>
  );
};

export default Chat;
