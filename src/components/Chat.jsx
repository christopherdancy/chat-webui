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
      buttons: ['Header', 'Hero', 'Benefits', 'Features', 'Footer']
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
  const [showInput, setShowInput] = useState(false);
  const [navigationStack, setNavigationStack] = useState([]);
  const [commandCompleted, setCommandCompleted] = useState(false);
  const [commandId, setCommandId] = useState(0); // Track current command ID

  // Generate command structure from website config
  const commandStructure = React.useMemo(() => generateCommandStructure(websiteConfig), [websiteConfig]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to get current context description
  const getContextDescription = () => {
    const parts = [];
    if (currentContext.section) parts.push(currentContext.section);
    if (currentContext.element) parts.push(currentContext.element.replace(/([A-Z])/g, ' $1').trim());
    if (currentContext.property) parts.push(currentContext.property.replace(/([A-Z])/g, ' $1').trim());
    return parts.join(' → ');
  };

  // Function to go back one step
  const handleBack = () => {
    if (commandCompleted) return; // Prevent going back after command completion
    
    if (navigationStack.length > 0) {
      const previousState = navigationStack[navigationStack.length - 1];
      setNavigationStack(prev => prev.slice(0, -1));
      updateContext(previousState.context);
      setMessages(previousState.messages);
      setShowInput(previousState.showInput);
      setShowColorPicker(false);
      setShowIconPicker(false);
      setShowImageUploader(false);
    }
  };

  // Function to return to main menu
  const handleMainMenu = () => {
    resetContext();
    setNavigationStack([]);
    setShowInput(false);
    setShowColorPicker(false);
    setShowIconPicker(false);
    setShowImageUploader(false);
    setCommandCompleted(false);
    setCommandId(prev => prev + 1); // Increment command ID to start fresh
    setMessages([{
      text: "Hi, I'm your website editor assistant. Below you can find a selection of topics I can help you with.",
      buttons: ['Header', 'Hero', 'Benefits', 'Features', 'Footer']
    }]);
  };

  // Update handleOptionClick to save navigation state
  const handleOptionClick = async (option) => {
    // If this is a new command (after completion of previous), clear messages
    if (commandCompleted) {
      setMessages([]);
      setCommandCompleted(false);
      setNavigationStack([]);
      setCommandId(prev => prev + 1); // Increment command ID to start fresh
    }
    
    // Save current state before making changes
    const currentState = {
      context: { ...currentContext },
      messages: [...messages],
      showInput
    };
    setNavigationStack(prev => [...prev, currentState]);
    
    // Add user's selection as a message
    setMessages(prev => [...prev, { text: option, isUser: true, commandId }]);

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
      buttons: options,
      commandId
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
      buttons: options,
      commandId
    }]);
  };

  // Update handlePropertySelection to control input visibility
  const handlePropertySelection = (property) => {
    const normalizedProperty = property.toLowerCase();
    updateContext({ property: normalizedProperty });
    
    // Handle social media platforms in Footer
    if (currentContext.section === 'Footer' && currentContext.element === 'social') {
      const options = sectionHandlers.Footer.getSocialOptions(property);
      setMessages(prev => [...prev, {
        text: `What would you like to do with ${property}?`,
        buttons: options,
        commandId
      }]);
      setShowInput(false);
      return;
    }
    
    if (normalizedProperty === 'color') {
      setShowColorPicker(true);
      setShowInput(false);
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
          text: `What would you like to change about the icon?`,
          buttons: options,
          commandId
        }]);
        setShowInput(false);
      }
    }
    else if (normalizedProperty === 'upload' || normalizedProperty === 'image') {
      setShowImageUploader(true);
      setShowInput(false);
      setCurrentImageContext({
        section: currentContext.section
      });
    }
    else {
      setMessages(prev => [...prev, {
        text: `Please enter the value for ${property.toLowerCase()}:`,
        isValuePrompt: true,
        commandId
      }]);
      setShowInput(true);
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
      
      // If command is null, it means this was just a selection (like choosing "Icon Color")
      if (command === null) {
        if (value === 'URL') {
          setMessages(prev => [...prev, {
            text: `Please enter the URL for ${currentContext.property}:`,
            isValuePrompt: true,
            commandId
          }]);
          setShowInput(true);
        }
        setIsProcessing(false);
        return;
      }
      
      const response = await processMessage(command, websiteConfig);
      
      if (response.updatedConfig) {
        onPreviewUpdate(response.updatedConfig);
      }
      
      // Mark command as completed to disable back functionality
      setCommandCompleted(true);
      resetContext();
      
      // Reset to new command immediately
      const newCommandId = commandId + 1;
      setCommandId(newCommandId);
      setCommandCompleted(false);
      setShowInput(false);
      setNavigationStack([]);
      
      // Combine success message with next options
      setMessages([{
        text: `${response.message} What else would you like to modify?`,
        buttons: ['Header', 'Hero', 'Benefits', 'Features', 'Footer'],
        commandId: newCommandId
      }]);
      
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I had trouble processing that request. Let's try again.",
        buttons: ['Header', 'Hero', 'Benefits', 'Features', 'Footer'],
        commandId
      }]);
      resetContext();
    } finally {
      setIsProcessing(false);
    }
  };

  // Show options for the next command (used after command completion)
  const showInitialOptions = () => {
    // Start a fresh message thread for the new command
    const newCommandId = commandId + 1;
    setCommandId(newCommandId);
    setShowInput(false);
    setNavigationStack([]);
    setMessages([{
      text: "What else would you like to modify?",
      buttons: ['Header', 'Hero', 'Features', 'Benefits', 'Footer'],
      commandId: newCommandId
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    if (currentContext.property && !currentContext.value) {
      // Add user input to messages
      setMessages(prev => [...prev, { 
        text: input.trim(), 
        isUser: true,
        commandId
      }]);
      
      handleValueSelection(input.trim());
      setInput('');
    }
  };

  // Filter messages to only show the current command
  const currentMessages = commandCompleted 
    ? messages.filter(msg => msg.completed) // Only show completion message if command is done
    : messages;

  // Check if we're at the initial options screen (no section selected and no navigation stack)
  const isInitialScreen = !currentContext.section && navigationStack.length === 0;

  return (
    <div className="chat-container">
      <div className="chat-navigation">
        {navigationStack.length > 0 && !commandCompleted && !isInitialScreen && (
          <button 
            className="nav-button back-button" 
            onClick={handleBack}
            title="Go back one step"
          >
            ← Back
          </button>
        )}
        <button 
          className="nav-button home-button" 
          onClick={handleMainMenu}
          title="Return to main menu"
        >
          🏠 Main Menu
        </button>
        {currentContext.section && (
          <div className="context-breadcrumb">
            Current: {getContextDescription()}
          </div>
        )}
      </div>

      <div className="chat-messages">
        {currentMessages.map((msg, index) => (
          <ChatMessage 
            key={`${commandId}-${index}`}
            message={msg} 
            isUser={msg.isUser || false}
            onOptionClick={handleOptionClick}
            isLatestMessage={index === currentMessages.length - 1}
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
        showInput={showInput}
        onSubmit={handleSubmit}
        onIconSelect={(iconClass) => {
          // Add to messages
          setMessages(prev => [...prev, { 
            text: iconClass, 
            isUser: true,
            commandId
          }]);
          
          handleValueSelection(iconClass);
          setShowIconPicker(false);
        }}
        onColorSelect={(color) => {
          // Add to messages
          setMessages(prev => [...prev, { 
            text: color, 
            isUser: true,
            commandId
          }]);
          
          handleValueSelection(color);
          setShowColorPicker(false);
        }}
        onImageSelect={(imageUrl) => {
          // Add to messages
          setMessages(prev => [...prev, { 
            text: imageUrl, 
            isUser: true,
            commandId
          }]);
          
          handleValueSelection(imageUrl);
          setShowImageUploader(false);
        }}
        onCloseIconPicker={() => {
          setShowIconPicker(false);
          handleBack();
        }}
        onCloseColorPicker={() => {
          setShowColorPicker(false);
          handleBack();
        }}
        onCloseImageUploader={() => {
          setShowImageUploader(false);
          handleBack();
        }}
      />

      <style jsx>{`
        .chat-navigation {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
          background: #f8f9fa;
        }

        .nav-button {
          padding: 8px 12px;
          margin-right: 10px;
          border: none;
          border-radius: 4px;
          background: #007bff;
          color: white;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .nav-button:hover {
          background: #0056b3;
        }

        .context-breadcrumb {
          font-size: 14px;
          color: #6c757d;
          margin-left: auto;
        }
      `}</style>
    </div>
  );
};

export default Chat;
