// src/components/Chat.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatControls from './ChatControls';
import { processMessage } from '../services/chatService';
import { getTemplateSections, getSectionElements, getElementProperties, mapToInternalStructure } from '../utils/templateStructureReader';
import { sectionHandlers, buildCommand } from '../utils/sectionHandlers';
import useChatContext from '../hooks/useChatContext';

const Chat = ({ onPreviewUpdate, websiteConfig, updateWebsiteConfig }) => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi, I'm your website editor assistant. Below you can find a selection of topics I can help you with.",
      buttons: [] // Will be populated in useEffect
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
  // eslint-disable-next-line no-unused-vars
  const [availableSections, setAvailableSections] = useState([]);

  // Get available sections from template structure
  const sectionsRef = useRef([]);

  useEffect(() => {
    if (websiteConfig) {
      // Get available sections for this template
      const sections = getTemplateSections(websiteConfig);
      
      // Only update if sections have changed to prevent unnecessary rerenders
      const previousSections = sectionsRef.current;
      const sectionsHaveChanged = 
        !Array.isArray(previousSections) || 
        previousSections.length !== sections.length ||
        sections.some((section, i) => previousSections[i] !== section);
      
      if (sectionsHaveChanged) {
        sectionsRef.current = sections;
        setAvailableSections(sections);
        
        // Set the initial context if not already set and there are sections
        if (!currentContext.section && sections.length > 0) {
          updateContext({ section: sections[0] });
        }
        
        // Update initial message buttons with available sections
        setMessages([{
          text: "Hi, I'm your website editor assistant. Below you can find a selection of topics I can help you with.",
          buttons: sections,
          commandId: 0
        }]);
      }
    }
    // We intentionally don't include currentContext or updateContext in dependencies
    // to avoid circular updates and infinite rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websiteConfig]);

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
    
    // Get sections from template structure
    const sections = getTemplateSections(websiteConfig);
    
    setMessages([{
      text: "Hi, I'm your website editor assistant. Below you can find a selection of topics I can help you with.",
      buttons: sections,
      commandId: commandId + 1
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
    
    // Use the new templateStructureReader to get section elements
    const options = getSectionElements(websiteConfig, section);
    
    // Check if we have proper elements - if not, try to refresh structure
    if (!options || options.length === 0) {
      // Try to get the section from _structure
      const sectionInStructure = websiteConfig._structure?.sections?.find(s => 
        s.name.toLowerCase() === section.toLowerCase()
      );
      
      if (sectionInStructure && sectionInStructure.elements) {
        // If we have elements, use them
        const elementNames = sectionInStructure.elements.map(e => e.name);
        
        setMessages(prev => [...prev, {
          text: `What would you like to modify in the ${section} section?`,
          buttons: elementNames,
          commandId
        }]);
        return;
      }
    }
    
    setMessages(prev => [...prev, {
      text: `What would you like to modify in the ${section} section?`,
      buttons: options,
      commandId
    }]);
  };

  const handleElementSelection = (element) => {
    // Special case: If the element name is the same as the current section name,
    // it means we're just displaying the first-level options. Try to get the first element.
    if (element === currentContext.section) {
      const section = websiteConfig._structure?.sections.find(s => 
        s.name.toLowerCase() === currentContext.section.toLowerCase()
      );
      if (section && section.elements && section.elements.length > 0) {
        element = section.elements[0].name;
      }
    }
    
    updateContext({ element });
    
    // Use the new templateStructureReader to get element properties
    const options = getElementProperties(websiteConfig, currentContext.section, element);
    
    setMessages(prev => [...prev, {
      text: `What would you like to change about ${element}?`,
      buttons: options,
      commandId
    }]);
  };

  // Update handlePropertySelection to use the template structure
  const handlePropertySelection = (property) => {
    updateContext({ property });
    
    // Map the UI display names to internal structure to get more details
    const internalStructure = mapToInternalStructure(
      websiteConfig,
      currentContext.section,
      currentContext.element,
      property
    );
    
    if (!internalStructure) {
      // Fallback to the old approach if mapping fails
      fallbackHandlePropertySelection(property);
      return;
    }
    
    // Handle different property types
    switch (internalStructure.propertyType) {
      case 'color':
        setShowColorPicker(true);
        setShowInput(false);
        setCurrentColorContext({
          section: currentContext.section,
          item: currentContext.element,
          property: internalStructure.propertyId
        });
        break;
        
      case 'icon':
        setShowIconPicker(true);
        setShowInput(false);
        setCurrentIconContext({
          section: currentContext.section,
          item: currentContext.element,
          property: internalStructure.propertyId
        });
        break;
        
      case 'image':
        setShowImageUploader(true);
        setShowInput(false);
        setCurrentImageContext({
          section: currentContext.section,
          item: currentContext.element,
          property: internalStructure.propertyId
        });
        break;
        
      case 'social':
        // Social media links have special actions
        if (internalStructure.actions && internalStructure.actions.length > 0) {
          setMessages(prev => [...prev, {
            text: `What would you like to do with ${property}?`,
            buttons: internalStructure.actions.map(a => a.charAt(0).toUpperCase() + a.slice(1)),
            commandId
          }]);
          setShowInput(false);
        }
        break;
        
      case 'text':
      case 'url':
      default:
        setMessages(prev => [...prev, {
          text: `Please enter the value for ${property}:`,
          isValuePrompt: true,
          commandId
        }]);
        setShowInput(true);
        break;
    }
  };
  
  // Fallback to original handling for backward compatibility
  const fallbackHandlePropertySelection = (property) => {
    const normalizedProperty = property.toLowerCase();
    
    // Handle social media platforms in Footer
    if (currentContext.section === 'Footer' && currentContext.element === 'Social Links') {
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
      setShowIconPicker(true);
      setShowInput(false);
      setCurrentIconContext({
        section: currentContext.section,
        item: currentContext.element
      });
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
    try {
      setIsProcessing(true);
      
      // Add user input to messages
      setMessages(prev => [...prev, { 
        text: value, 
        isUser: true,
        commandId
      }]);
      
      // Build and process the command
      const command = buildCommand({
        ...currentContext,
        websiteConfig // Pass the website config to the command builder
      }, value);
      
      // If command is null, it means this was just a selection (like choosing "Icon Color")
      if (command === null) {
        if (value.toLowerCase() === 'url') {
          setMessages(prev => [...prev, {
            text: `Please enter the URL:`,
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
      
      // Get sections from template structure for the next message
      const sections = getTemplateSections(websiteConfig);
      
      // Combine success message with next options
      setMessages([{
        text: `${response.message} What else would you like to modify?`,
        buttons: sections,
        commandId: newCommandId
      }]);
      
    } catch (error) {
      console.error('Error processing message:', error.response?.data || error.message);
      
      // Get sections from template structure for error recovery
      const sections = getTemplateSections(websiteConfig);
      
      setMessages(prev => [...prev, {
        text: "Sorry, I had trouble processing that request. Let's try again.",
        buttons: sections,
        commandId
      }]);
      resetContext();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    if (currentContext.property && !currentContext.value) {
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
        {currentContext.section && (
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
