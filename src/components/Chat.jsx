// src/components/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatControls from './ChatControls';
import { processMessage } from '../services/chatService';
import { getTemplateSections, getChildNodes, findNodeByPath, getNodePath, isEditableNode, getCurrentValue } from '../utils/templateStructureReader';

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
  const [showToggle, setShowToggle] = useState(false);
  const [currentToggleContext, setCurrentToggleContext] = useState(null);

  // Track current navigation path directly
  const [currentPath, setCurrentPath] = useState('');

  // Track previous template ID for comparison
  const prevTemplateIdRef = useRef(null);

  // Initialize with top-level sections
  useEffect(() => {
    if (websiteConfig) {
      try {
        const currentTemplateId = websiteConfig._templateId;
        const templateChanged = prevTemplateIdRef.current !== currentTemplateId;
        
        // Update ref for next comparison
        prevTemplateIdRef.current = currentTemplateId;
        
        // If the template has changed, reset the messages
        if (templateChanged) {
          // Get available sections for this template
          const sections = getTemplateSections(websiteConfig);
          
          // Reset messages for new template
          setMessages([{
            text: "Hi, I'm your website editor assistant. Modify your website by clicking the buttons below.",
            buttons: sections,
            commandId: commandId + 1
          }]);
          
          // Increment command ID for fresh state
          setCommandId(prev => prev + 1);
        } else {
          // Check if the latest message is a success message that we should preserve
          const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
          const isSuccessMessage = lastMessage && (lastMessage.isSuccess || (lastMessage.text && lastMessage.text.includes("✅")));
          
          // If we need to initialize messages and don't have a success message
          if (messages.length === 0 || !isSuccessMessage) {
            // Get available sections for this template
            const sections = getTemplateSections(websiteConfig);
            
            // Update initial message buttons with available sections
            setMessages([{
              text: "Hi, I'm your website editor assistant. Modify your website by clicking the buttons below.",
              buttons: sections,
              commandId: 0
            }]);
          }
          // If we have a success message, just update its buttons
          else if (isSuccessMessage) {
            // Get available sections for this template
            const sections = getTemplateSections(websiteConfig);

            // Update the last message's buttons without changing the message text
            const updatedMessage = {
              ...lastMessage,
              buttons: sections
            };
            
            setMessages([updatedMessage]);
          }
        }
      } catch (error) {
        console.error('Error initializing sections:', error);
      }
    }
  // Fix the dependencies array properly
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websiteConfig?._templateId]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    // Reset navigation state
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
      // Otherwise just show the standard greeting
      setMessages([{
        text: "Hi, I'm your website editor assistant. Modify your website by clicking the buttons below.",
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
      let nodePath;
      let selectedNode;
      
      // Check if we're dealing with an array item
      if (option.startsWith('Item ')) {
        const itemIndex = parseInt(option.split(' ')[1]) - 1;
        // Get the current array node from the navigation stack
        const currentArrayNode = navigationStack[navigationStack.length - 1];
        
        if (currentArrayNode && currentArrayNode.itemStructure) {
          // Use the array item structure for the selected node
          selectedNode = {
            ...currentArrayNode.itemStructure,
            id: `${currentArrayNode.id}[${itemIndex}]`,
            children: currentArrayNode.itemStructure.children,
            type: 'object' // Mark as object type to show children
          };
          nodePath = `${currentPath}[${itemIndex}]`;
        }
      } else {
        // Check if we're inside an array item by looking at the current path
        const isInArrayItem = currentPath.includes('[');
        if (isInArrayItem) {
          // Get the current array item index
          const matches = currentPath.match(/\[(\d+)\]/);
          const itemIndex = matches ? parseInt(matches[1]) : 0;
          
          // Get the array node from navigation stack
          const arrayNode = navigationStack.find(node => node.type === 'array');
          if (arrayNode && arrayNode.itemStructure) {
            // Find the child node in the item structure that matches the option
            const childNode = arrayNode.itemStructure.children.find(child => child.name === option);
            if (childNode) {
              selectedNode = {
                ...childNode,
                id: childNode.id,
                pathTemplate: childNode.pathTemplate
              };
              // Use the template path with the current index
              nodePath = childNode.pathTemplate.replace('[INDEX]', `[${itemIndex}]`);
            }
          }
        }
        
        // If not in array item or no matching child found, do regular lookup
        if (!selectedNode) {
          nodePath = getNodePath(websiteConfig, currentPath, option);
          if (!nodePath) return;
          selectedNode = findNodeByPath(websiteConfig._structure, nodePath);
          if (!selectedNode) return;
        }
      }
      
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
              path: selectedNode.path || nodePath
            });
            break;
          case 'icon':
            setShowIconPicker(true);
            setCurrentIconContext({
              path: selectedNode.path || nodePath
            });
            break;
          case 'image':
            setShowImageUploader(true);
            setCurrentImageContext({
              path: selectedNode.path || nodePath
            });
            break;
          case 'boolean':
            // Show toggle UI
            let index = 0;
            // Extract index from currentPath (e.g., "portfolio.items[2]")
            const matches = currentPath.match(/\[(\d+)\]/);
            if (matches) {
              index = parseInt(matches[1]);
            }
            
            const path = selectedNode.pathTemplate ? 
              selectedNode.pathTemplate.replace('[INDEX]', `[${index}]`) : 
              selectedNode.path || nodePath;
            
            // Get the raw value
            const rawValue = getCurrentValue(websiteConfig, path);
            // Convert to proper boolean (handle both boolean and string values)
            const booleanValue = rawValue === true || 
                                (typeof rawValue === 'string' && rawValue.toLowerCase() === 'true');
            
            setShowToggle(true);
            setCurrentToggleContext({
              path: path,
              currentValue: booleanValue // Use properly converted boolean value
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
      } else if (selectedNode.children) {
        // Get child options for this node
        const childOptions = selectedNode.children.map(child => child.name);
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
      if (!currentNode) {
        setIsProcessing(false);
        return;
      }
      
      // Create command using the current path which already has the correct syntax
      const command = `${currentPath} ${value}`;
      
      // Process the command
      const response = await processMessage(command, websiteConfig);
      
      if (response.updatedConfig) {
        onPreviewUpdate(response.updatedConfig);
      }
      
      // Instead of resetting completely, go back one step
      if (navigationStack.length > 1) {
        // Get the parent node's state
        const parentNode = navigationStack[navigationStack.length - 2];
        const { previousState } = parentNode;
        
        // Restore the parent state
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
        const parentPath = newStack.length > 0 
          ? newStack.map(n => n.id).join('.') 
          : '';
        setCurrentPath(parentPath);
          
        // Format success message to be more visible
        const successMessage = `✅ ${response.message} What would you like to modify next?`;
        
        // Get the parent node from navigation stack instead of looking it up
        const parentNodeStructure = parentNode;
        
        // If parent is an array, show array items
        let nextOptions = [];
        if (parentNodeStructure && parentNodeStructure.type === 'array') {
          const items = parentNodeStructure.default || [];
          nextOptions = items.map((_, index) => `Item ${index + 1}`);
        } else if (parentNodeStructure && parentNodeStructure.children) {
          // Use children directly from the parent node
          nextOptions = parentNodeStructure.children.map(child => child.name);
        } else {
          // Fallback to getting child nodes
          nextOptions = getChildNodes(websiteConfig, parentPath);
        }
        
        // Add success message to the restored messages
        setMessages(prev => [...prev, {
          text: successMessage,
          buttons: nextOptions,
          commandId: commandId + 1,
          isSuccess: true
        }]);
      } else {
        // If we're at the root level, show main menu
        handleMainMenu();
      }
      
      // Increment command ID for next interaction
      setCommandId(prev => prev + 1);
      
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleSelect = async (value) => {
    try {
      setIsProcessing(true);
      
      // Get the path from context
      const path = currentToggleContext?.path;
      if (!path) {
        setIsProcessing(false);
        return;
      }
      
      // Add user's selection as a message
      setMessages(prev => [...prev, { 
        text: value ? "Show" : "Hide", 
        isUser: true,
        commandId
      }]);
      
      // Create command using the path and value
      const command = `${path} ${value}`;
      
      // Process the command
      const response = await processMessage(command, websiteConfig);
      
      if (response.updatedConfig) {
        onPreviewUpdate(response.updatedConfig);
      }
      
      // Instead of resetting completely, go back one step
      if (navigationStack.length > 1) {
        // Get the parent node's state
        const parentNode = navigationStack[navigationStack.length - 2];
        const { previousState } = parentNode;
        
        // Restore the parent state
        if (previousState) {
          setMessages(previousState.messages);
          setShowInput(previousState.showInput);
          setShowColorPicker(previousState.showColorPicker || false);
          setShowIconPicker(previousState.showIconPicker || false);
          setShowImageUploader(previousState.showImageUploader || false);
          setShowToggle(false);
        }
        
        // Update the navigation stack
        setNavigationStack(prev => prev.slice(0, -1));
        
        // Update current path
        const newStack = navigationStack.slice(0, -1);
        const parentPath = newStack.length > 0 
          ? newStack.map(n => n.id).join('.') 
          : '';
        setCurrentPath(parentPath);
          
        // Format success message to be more visible
        const successMessage = `✅ ${response.message} What would you like to modify next?`;
        
        // Get the parent node from navigation stack instead of looking it up
        const parentNodeStructure = parentNode;
        
        // If parent is an array, show array items
        let nextOptions = [];
        if (parentNodeStructure && parentNodeStructure.type === 'array') {
          const items = parentNodeStructure.default || [];
          nextOptions = items.map((_, index) => `Item ${index + 1}`);
        } else if (parentNodeStructure && parentNodeStructure.children) {
          // Use children directly from the parent node
          nextOptions = parentNodeStructure.children.map(child => child.name);
        } else {
          // Fallback to getting child nodes
          nextOptions = getChildNodes(websiteConfig, parentPath);
        }
        
        // Add success message to the restored messages
        setMessages(prev => [...prev, {
          text: successMessage,
          buttons: nextOptions,
          commandId: commandId + 1,
          isSuccess: true
        }]);
      } else {
        // If we're at the root level, show main menu
        handleMainMenu();
      }
      
      // Increment command ID for next interaction
      setCommandId(prev => prev + 1);
      
    } catch (error) {
      console.error('Error processing toggle selection:', error);
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
  const currentMessages = messages; // Display all messages without filtering

  // Check if we're at the initial options screen
  const isInitialScreen = navigationStack.length === 0;

  // Get current node for passing to ChatControls
  const currentNode = navigationStack.length > 0 ? navigationStack[navigationStack.length - 1] : null;

  return (
    <div className="chat-container">
      <div className="chat-navigation">
        {navigationStack.length > 0 && !commandCompleted && !isInitialScreen && (
          <button 
            className="nav-button"
            onClick={handleBack}
            title="Go back one step"
          >
            ← Back
          </button>
        )}
        <button 
          className="nav-button"
          onClick={handleMainMenu}
          title="Return to main menu"
        >
          Main Menu
        </button>
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
        showToggle={showToggle}
        currentIconContext={currentIconContext}
        currentColorContext={currentColorContext}
        currentImageContext={currentImageContext}
        currentToggleContext={currentToggleContext}
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
        onToggleSelect={(value) => {
          handleToggleSelect(value);
          setShowToggle(false);
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
        onCloseToggle={() => {
          setShowToggle(false);
          handleBack();
        }}
      />
    </div>
  );
};

export default Chat;
