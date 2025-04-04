// src/components/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatControls from './ChatControls';
import { processMessage } from '../services/chatService';
import { getTemplateSections, getChildNodes, findNodeByPath, getNodePath, isEditableNode } from '../utils/templateStructureReader';

const Chat = ({ onPreviewUpdate, websiteConfig, updateWebsiteConfig }) => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi, I'm your website editor assistant. Below you can find a selection of topics I can help you with.",
      buttons: [] // Will be populated in useEffect
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
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

  // Track current navigation path directly
  const [currentPath, setCurrentPath] = useState('');

  // Initialize with top-level sections
  useEffect(() => {
    if (websiteConfig) {
      try {
        // Get available sections for this template
        const sections = getTemplateSections(websiteConfig);
        
        // Update initial message buttons with available sections
        setMessages([{
          text: "Hi, I'm your website editor assistant. Below you can find what you can modify.",
          buttons: sections,
          commandId: 0
        }]);
      } catch (error) {
        console.error('Error initializing sections:', error);
      }
    }
  }, [websiteConfig]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to get current context description
  const getContextDescription = () => {
    return navigationStack.map(node => node.name).join(' → ');
  };

  // Function to go back one step
  const handleBack = () => {
    if (commandCompleted) return; // Prevent going back after command completion
    
    if (navigationStack.length > 0) {
      // Get the state from the node we're removing
      const nodeToRemove = navigationStack[navigationStack.length - 1];
      const { previousState } = nodeToRemove;
      
      // Restore the previous state
      if (previousState) {
        setMessages(previousState.messages);
        setShowInput(previousState.showInput);
        setShowColorPicker(previousState.showColorPicker || false);
        setShowIconPicker(previousState.showIconPicker || false);
        setShowImageUploader(previousState.showImageUploader || false);
      }
      
      // Update the navigation stack
      setNavigationStack(prev => prev.slice(0, -1));
      
      // Update current path
      const newStack = navigationStack.slice(0, -1);
      setCurrentPath(newStack.length > 0 
        ? newStack.map(n => n.id).join('.') 
        : '');
    }
  };

  // Function to return to main menu
  const handleMainMenu = () => {
    setNavigationStack([]);
    setShowInput(false);
    setShowColorPicker(false);
    setShowIconPicker(false);
    setShowImageUploader(false);
    setCommandCompleted(false);
    setCommandId(prev => prev + 1); // Increment command ID to start fresh
    setCurrentPath('');
    
    // Get sections from template structure
    const sections = getTemplateSections(websiteConfig);
    
    setMessages([{
      text: "Hi, I'm your website editor assistant. Below you can find a what you can modify.",
      buttons: sections,
      commandId: commandId + 1
    }]);
  };

  // Handle option selection
  const handleOptionClick = async (option) => {
    // Save current state for back navigation
    const currentState = {
      messages: [...messages],
      showInput,
      showColorPicker,
      showIconPicker,
      showImageUploader
    };
    
    // Add user's selection as a message
    setMessages(prev => [...prev, { text: option, isUser: true, commandId }]);
    
    try {
      // Get the path to the selected node
      const nodePath = getNodePath(websiteConfig, currentPath, option);
      if (!nodePath) return;
      
      // Find the selected node
      const selectedNode = findNodeByPath(websiteConfig._structure, nodePath);
      console.log('Selected node:', selectedNode);
      if (!selectedNode) return;
      
      // Add this node to the navigation stack along with current state
      const newStack = [...navigationStack, { 
        ...selectedNode,
        previousState: currentState
      }];
      setNavigationStack(newStack);
      setCurrentPath(nodePath);
      
      // Check if this is an array type
      if (selectedNode.type === 'array') {
        // Get default items from the array or fallback to empty array
        const items = selectedNode.default || [];
        
        // Create buttons for each item in the array
        const itemButtons = items.map((_, index) => `Item ${index + 1}`);
        
        // Display item options
        setMessages(prev => [...prev, {
          text: `Please select which ${selectedNode.name} item you want to modify:`,
          buttons: itemButtons,
          commandId
        }]);
      }
      // Check if this is an editable node (has type and no children)
      else if (isEditableNode(selectedNode)) {
        // Show appropriate editor based on node type
        switch (selectedNode.type) {
          case 'color':
            setShowColorPicker(true);
            setCurrentColorContext({
              path: selectedNode.path
            });
            break;
          case 'icon':
            setShowIconPicker(true);
            setCurrentIconContext({
              path: selectedNode.path
            });
            break;
          case 'image':
            setShowImageUploader(true);
            setCurrentImageContext({
              path: selectedNode.path
            });
            break;
          default:
            // Text or URL input
            setShowInput(true);
            setMessages(prev => [...prev, {
              text: `Please enter the value for ${selectedNode.name}:`,
              isValuePrompt: true,
              commandId
            }]);
            break;
        }
      } else {
        // Get child options for this node
        const childOptions = getChildNodes(websiteConfig, nodePath);
        
        // Display child options
        setMessages(prev => [...prev, {
          text: `What would you like to modify in ${option}?`,
          buttons: childOptions,
          commandId
        }]);
      }
    } catch (error) {
      console.error('Error updating navigation:', error);
    }
  };

  // Handle value selection (when user provides a value)
  const handleValueSelection = async (value) => {
    try {
      setIsProcessing(true);
      
      // Add user input to messages
      setMessages(prev => [...prev, { 
        text: value, 
        isUser: true,
        commandId
      }]);
      
      // Get current node from navigation stack
      const currentNode = navigationStack[navigationStack.length - 1];
      console.log('Current node:', currentNode);
      
      if (!currentNode) {
        setIsProcessing(false);
        return;
      }
      
      // Use the current path directly since it already has the correct brackets
      if (currentNode.pathTemplate) {
        console.log('PathTemplate:', currentNode.pathTemplate);
      }
      
      // Create command using the current path which already has the correct syntax
      const command = `${currentPath} ${value}`;
      console.log('Command:', command);
      
      // Process the command
      const response = await processMessage(command, websiteConfig);
      
      if (response.updatedConfig) {
        onPreviewUpdate(response.updatedConfig);
      }
      
      // Reset navigation and show success
      setNavigationStack([]);
      setCurrentPath('');
      setShowInput(false);
      setShowColorPicker(false);
      setShowIconPicker(false);
      setShowImageUploader(false);
      
      // Get sections for next options
      const sections = getTemplateSections(websiteConfig);
      
      // Show success message with options
      setMessages([{
        text: `${response.message} What else would you like to modify?`,
        buttons: sections,
        commandId: commandId + 1
      }]);
      
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    // Check if we're at an editable node
    if (navigationStack.length > 0) {
      // Get the current node from the navigation stack
      const currentNode = navigationStack[navigationStack.length - 1];
      
      // If it's an editable node, handle the value input
      if (isEditableNode(currentNode)) {
        handleValueSelection(input.trim());
        setInput('');
      }
    }
  };

  // Filter messages to only show the current command
  const currentMessages = commandCompleted 
    ? messages.filter(msg => msg.completed) // Only show completion message if command is done
    : messages;

  // Check if we're at the initial options screen
  const isInitialScreen = navigationStack.length === 0;

  // Get current node for passing to ChatControls
  const currentNode = navigationStack.length > 0 ? navigationStack[navigationStack.length - 1] : null;

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatNavigation}>
        {navigationStack.length > 0 && !commandCompleted && !isInitialScreen && (
          <button 
            style={styles.navButton} 
            onClick={handleBack}
            title="Go back one step"
          >
            ← Back
          </button>
        )}
        <button 
          style={styles.navButton} 
          onClick={handleMainMenu}
          title="Return to main menu"
        >
          🏠 Main Menu
        </button>
        {navigationStack.length > 0 && (
          <div style={styles.contextBreadcrumb}>
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
        currentNode={currentNode}
        showIconPicker={showIconPicker}
        showColorPicker={showColorPicker}
        showImageUploader={showImageUploader}
        currentIconContext={currentIconContext}
        currentColorContext={currentColorContext}
        currentImageContext={currentImageContext}
        showInput={showInput}
        onSubmit={handleSubmit}
        onIconSelect={(iconClass) => {
          handleValueSelection(iconClass);
          setShowIconPicker(false);
        }}
        onColorSelect={(color) => {
          handleValueSelection(color);
          setShowColorPicker(false);
        }}
        onImageSelect={(imageUrl) => {
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
    </div>
  );
};

// Navigation and UI styles
const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  chatNavigation: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
    background: '#f8f9fa'
  },
  navButton: {
    padding: '8px 12px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  navButtonHover: {
    background: '#0056b3'
  },
  contextBreadcrumb: {
    fontSize: '14px',
    color: '#6c757d',
    marginLeft: 'auto'
  }
};

export default Chat;
