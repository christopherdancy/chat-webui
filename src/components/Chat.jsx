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
    console.log('Initializing with config:', websiteConfig);
    
    if (websiteConfig) {
      try {
        // Get available sections for this template
        const sections = getTemplateSections(websiteConfig);
        console.log('Available sections:', sections);
        
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
      } catch (error) {
        console.error('Error initializing sections:', error);
        
        // Fallback to basic sections if something goes wrong
        const fallbackSections = ['Header', 'Hero', 'Benefits', 'Features', 'Call to Action', 'Footer'];
        sectionsRef.current = fallbackSections;
        setAvailableSections(fallbackSections);
        
        setMessages([{
          text: "Hi, I'm your website editor assistant. Below you can find a selection of topics I can help you with.",
          buttons: fallbackSections,
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

    try {
      let updatedContext;
      
      // Check if this option is a valid section name
      const availableSections = getTemplateSections(websiteConfig);
      const isValidSection = availableSections.some(
        section => section.toLowerCase() === option.toLowerCase()
      );
      
      if (!currentContext.section) {
        // Section selection
        updatedContext = await updateContext({ section: option });
        console.log('Updated context after section selection:', updatedContext);
        handleSectionSelection(option);
      } 
      else if (!currentContext.element) {
        // Element selection
        // Special case: If the option is a valid section name AND we're at the main menu
        // treat it as a section selection instead of an element
        if (isValidSection && navigationStack.length <= 1) {
          // This is actually a section selection from another view
          updatedContext = await updateContext({ section: option, element: null });
          console.log('Handling as section instead of element:', updatedContext);
          handleSectionSelection(option);
        } else {
          updatedContext = await updateContext({ element: option });
          console.log('Updated context after element selection:', updatedContext);
          // Pass the entire updated context to ensure we have the latest values
          handleElementSelection(option, updatedContext);
        }
      }
      else if (!currentContext.property) {
        // Property selection
        updatedContext = await updateContext({ property: option });
        console.log('Updated context after property selection:', updatedContext);
        // Pass the entire updated context to ensure we have the latest values
        handlePropertySelection(option, updatedContext);
      }
      else if (!currentContext.value) {
        // Already at value selection - no need to update context first
        handleValueSelection(option);
      }
    } catch (error) {
      console.error('Error updating context:', error);
      // If context update fails, try to continue with current context
      if (!currentContext.section) handleSectionSelection(option);
      else if (!currentContext.element) handleElementSelection(option);
      else if (!currentContext.property) handlePropertySelection(option);
      else handleValueSelection(option);
    }
  };

  const handleSectionSelection = (section) => {
    console.log('In handleSectionSelection with section:', section);
    
    // We now wait for the context to update in handleOptionClick,
    // but let's make sure it's being used correctly here
    const sectionToUse = section || currentContext.section;
    
    // Use the templateStructureReader to get section elements
    let options = getSectionElements(websiteConfig, sectionToUse);
    console.log('Section options for', sectionToUse, ':', options);
    
    // Check if we have proper elements - if not, try to refresh structure
    if (!options || options.length === 0) {
      console.warn('No elements found for section, trying structure directly');
      
      // Try to get the section from _structure
      const sectionInStructure = websiteConfig._structure?.sections?.find(s => 
        s.name.toLowerCase() === sectionToUse.toLowerCase()
      );
      
      if (sectionInStructure && sectionInStructure.elements) {
        // If we have elements, use them
        options = sectionInStructure.elements.map(e => e.name);
        console.log('Found elements in structure:', options);
      }
    }
    
    // If we still don't have options, use some reasonable defaults
    if (!options || options.length === 0) {
      console.warn('Using fallback elements for section:', sectionToUse);
      options = getDefaultElementsForSection(sectionToUse);
    }
    
    setMessages(prev => [...prev, {
      text: `What would you like to modify in the ${sectionToUse} section?`,
      buttons: options,
      commandId
    }]);
  };

  // Helper function to provide reasonable defaults for different sections
  const getDefaultElementsForSection = (section) => {
    const sectionLower = section.toLowerCase();
    
    if (sectionLower === 'header') {
      return ['Logo', 'Background'];
    } else if (sectionLower === 'hero') {
      return ['Title', 'Subtitle', 'Button', 'Background'];
    } else if (sectionLower === 'benefits') {
      return ['Title', 'Subtitle', 'Background', 'Item 1', 'Item 2', 'Item 3'];
    } else if (sectionLower === 'features') {
      return ['Title', 'Subtitle', 'Background', 'Image', 'Item 1', 'Item 2', 'Item 3'];
    } else if (sectionLower === 'footer') {
      return ['Description', 'Address', 'Phone', 'Email', 'Background', 'Social Links'];
    } else if (sectionLower.includes('call to action') || sectionLower === 'cta') {
      return ['Title', 'Subtitle', 'Button', 'Background'];
    }
    
    // Generic fallback
    return ['Title', 'Subtitle', 'Text', 'Background'];
  };

  const handleElementSelection = (element, updatedContext) => {
    // Use the passed updatedContext if available, otherwise fall back to currentContext
    const context = updatedContext || currentContext;
    
    console.log('In handleElementSelection with element:', element);
    console.log('Current context for processing:', context);
    
    // Make sure we use the current section from context
    const currentSection = context.section;
    console.log('Using section from context:', currentSection);
    
    // Special case: If the element name is the same as the current section name,
    // it means we're just displaying the first-level options. Try to get the first element.
    let elementToUse = element;
    if (element === currentSection) {
      const section = websiteConfig._structure?.sections.find(s => 
        s.name.toLowerCase() === currentSection.toLowerCase()
      );
      if (section && section.elements && section.elements.length > 0) {
        elementToUse = section.elements[0].name;
        console.log('Using first element instead:', elementToUse);
      }
    }
    
    // Use the templateStructureReader to get element properties
    let options = getElementProperties(websiteConfig, currentSection, elementToUse);
    console.log('Element options for', elementToUse, 'in section', currentSection, ':', options);
    
    // Make sure we have options
    if (!options || options.length === 0) {
      console.warn('No properties found for element, using fallbacks');
      
      // Provide reasonable defaults based on common element types
      const elementLower = elementToUse.toLowerCase();
      
      if (elementLower.includes('title') || 
          elementLower.includes('subtitle') || 
          elementLower.includes('description')) {
        options = ['Text'];
      } else if (elementLower.includes('background')) {
        options = ['Color'];
      } else if (elementLower.includes('button')) {
        options = ['Text', 'Color', 'URL'];
      } else if (elementLower.includes('image')) {
        options = ['Upload'];
      } else if (elementLower.includes('item')) {
        // For numbered items
        if (currentSection.toLowerCase() === 'benefits') {
          options = ['Title', 'Description', 'Icon'];
        } else if (currentSection.toLowerCase() === 'features') {
          options = ['Title', 'Description'];
        } else {
          options = ['Text'];
        }
      } else if (elementLower.includes('social')) {
        options = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
      } else {
        // Generic fallback
        options = ['Text'];
      }
    }
    
    setMessages(prev => [...prev, {
      text: `What would you like to change about ${elementToUse}?`,
      buttons: options,
      commandId
    }]);
  };

  // Update handlePropertySelection to use the template structure
  const handlePropertySelection = (property, updatedContext) => {
    // Use the passed updatedContext if available, otherwise fall back to currentContext
    const context = updatedContext || currentContext;
    
    console.log('Selecting property:', property);
    console.log('Current context for property selection:', context);
    
    // Try to map the UI display names to internal structure to get more details
    const internalStructure = mapToInternalStructure(
      websiteConfig,
      context.section,
      context.element,
      property
    );
    
    console.log('Internal structure for property:', internalStructure);
    
    // If we have structure metadata, use it to determine property type
    if (internalStructure) {
      // Handle different property types
      switch (internalStructure.propertyType) {
        case 'color':
          setShowColorPicker(true);
          setShowInput(false);
          setCurrentColorContext({
            section: context.section,
            item: context.element,
            property: internalStructure.propertyId
          });
          break;
          
        case 'icon':
          setShowIconPicker(true);
          setShowInput(false);
          setCurrentIconContext({
            section: context.section,
            item: context.element,
            property: internalStructure.propertyId
          });
          break;
          
        case 'image':
          setShowImageUploader(true);
          setShowInput(false);
          setCurrentImageContext({
            section: context.section,
            item: context.element,
            property: internalStructure.propertyId
          });
          break;
          
        case 'social':
          // For social type, check current hidden state to show Hide or Show
          const platform = property.toLowerCase();
          const socialData = websiteConfig.footer?.social?.[platform];
          console.log('socialData', socialData);
          
          // Determine if the platform is currently hidden or not
          const isCurrentlyHidden = socialData?.hidden || false;
          const visibilityOption = isCurrentlyHidden ? 'Show' : 'Hide';
          
          setMessages(prev => [...prev, {
            text: `What would you like to change about ${property}?`,
            buttons: ['URL', visibilityOption],
            commandId
          }]);
          setShowInput(false);
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
    } else {
      // When no structure metadata is available, use simple type inference from property name
      console.warn('No structure metadata for property, using fallbacks');
      const propertyLower = property.toLowerCase();
      
      if (propertyLower === 'color' || propertyLower.includes('color')) {
        setShowColorPicker(true);
        setShowInput(false);
        setCurrentColorContext({
          section: context.section,
          item: context.element,
          property: propertyLower
        });
      }
      else if (propertyLower === 'icon' || propertyLower.includes('icon')) {
        setShowIconPicker(true);
        setShowInput(false);
        setCurrentIconContext({
          section: context.section,
          item: context.element,
          property: propertyLower
        });
      }
      else if (propertyLower === 'upload' || propertyLower === 'image' || propertyLower.includes('image')) {
        setShowImageUploader(true);
        setShowInput(false);
        setCurrentImageContext({
          section: context.section,
          item: context.element,
          property: propertyLower
        });
      }
      else if (propertyLower === 'url' || propertyLower.includes('url')) {
        setMessages(prev => [...prev, {
          text: `Please enter the URL:`,
          isValuePrompt: true,
          commandId
        }]);
        setShowInput(true);
      }
      else {
        // Default to text input for most properties
        setMessages(prev => [...prev, {
          text: `Please enter the value for ${property}:`,
          isValuePrompt: true,
          commandId
        }]);
        setShowInput(true);
      }
    }
  };

  const handleValueSelection = async (value) => {
    try {
      setIsProcessing(true);
      
      // Special case for social links with URL, Hide or Show
      if (currentContext.section === 'Footer' && 
          currentContext.element === 'Social Links' && 
          currentContext.property) {
        
        const platform = currentContext.property;
        
        if (value === 'URL') {
          // For URL, prompt for value
          updateContext({ nestedProperty: 'url' });
          
          // Ask for URL
          setMessages(prev => [...prev, {
            text: `Please enter the url for ${platform}:`,
            isValuePrompt: true,
            commandId
          }]);
          setShowInput(true);
          setIsProcessing(false);
          return;
        }
        else if (value === 'Hide' || value === 'Show') {
          // Set hidden property value based on Hide/Show
          const hiddenValue = value === 'Hide' ? 'true' : 'false';
          
          // Add user selection to message history
          setMessages(prev => [...prev, { 
            text: value, 
            isUser: true,
            commandId
          }]);
          
          // Process a new message with the proper command format
          const command = `footer social.${platform} hidden ${hiddenValue}`;
          const response = await processMessage(command, websiteConfig);
          
          if (response.updatedConfig) {
            onPreviewUpdate(response.updatedConfig);
          }
          
          // Mark command as completed and reset
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
          
          setIsProcessing(false);
          return;
        }
      }
      
      // Add user input to messages (for all other cases)
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
      console.log('Command:', command);
      
      // If command is null, it means this was just a selection (like choosing "Icon Color")
      if (command === null) {
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
