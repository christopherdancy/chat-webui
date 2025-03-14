// src/components/Chat.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChatMessage from './ChatMessage';
import { processMessage } from '../services/chatService';
import { generateCommandStructure } from '../utils/commandStructureGenerator';

const Chat = ({ onPreviewUpdate, websiteConfig }) => {
  const [messages, setMessages] = useState([
    { text: "Hi, I'm your website editor assistant. Customize your website by typing a command like 'change header color to green'.", isUser: false }
  ]);

  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentLevel, setCurrentLevel] = useState('section');
  const [validationError, setValidationError] = useState('');
  const [isValidCommand, setIsValidCommand] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Generate command structure from website config - memoize this to prevent recreation on every render
  const commandStructure = React.useMemo(() => generateCommandStructure(websiteConfig), [websiteConfig]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []); // Empty dependency array - only runs once on mount

  // Focus input after processing is complete
  useEffect(() => {
    if (!isProcessing) {
      inputRef.current?.focus();
    }
  }, [isProcessing]); // Only depends on isProcessing

  // Memoize the validateInput function
  const validateInput = useCallback((inputText) => {
    // Move state updates outside this function to prevent infinite loops
    let error = '';
    let isValid = false;

    if (!inputText.trim()) {
      error = '';
      isValid = false;
    } else {
      const tokens = inputText.toLowerCase().trim().split(/\s+/);
      
      // Check if first token is a valid section
      if (tokens.length >= 1) {
        const section = tokens[0];
        if (!commandStructure.sections.includes(section)) {
          error = `"${section}" is not a valid section. Please choose from the available options.`;
          isValid = false;
          return { error, isValid };
        }
      }
      
      // Check if second token is a valid element or subsection for the selected section
      if (tokens.length >= 2) {
        const section = tokens[0];
        const elementOrSubsection = tokens[1];
        
        // Check if it's a subsection
        if (commandStructure.subsections[section] && 
            commandStructure.subsections[section].includes(elementOrSubsection)) {
          // It's a valid subsection, continue validation
        } 
        // Check if it's an element
        else if (commandStructure.elements[section] && 
                 commandStructure.elements[section].includes(elementOrSubsection)) {
          // It's a valid element, continue validation
        }
        else {
          error = `"${elementOrSubsection}" is not a valid element or subsection for the ${section} section. Please choose from the available options.`;
          isValid = false;
          return { error, isValid };
        }
      }
      
      // Check if third token is valid based on whether the second token is a subsection or element
      if (tokens.length >= 3) {
        const section = tokens[0];
        const elementOrSubsection = tokens[1];
        const thirdToken = tokens[2];
        
        // If second token is a subsection
        if (commandStructure.subsections[section] && 
            commandStructure.subsections[section].includes(elementOrSubsection)) {
          
          // Check if third token is a valid element for this subsection
          const subsectionKey = `${section}.${elementOrSubsection}`;
          if (!commandStructure.subsectionElements[subsectionKey] || 
              !commandStructure.subsectionElements[subsectionKey].includes(thirdToken)) {
            error = `"${thirdToken}" is not a valid element for the ${elementOrSubsection} subsection. Please choose from the available options.`;
            isValid = false;
            return { error, isValid };
          }
        } 
        // If second token is an element
        else if (commandStructure.elements[section] && 
                 commandStructure.elements[section].includes(elementOrSubsection)) {
          
          // Check if third token is a valid property for this element
          const elementKey = `${section}.${elementOrSubsection}`;
          if (!commandStructure.properties[elementKey] || 
              !commandStructure.properties[elementKey].includes(thirdToken)) {
            error = `"${thirdToken}" is not a valid property for the ${elementOrSubsection} element. Please choose from the available options.`;
            isValid = false;
            return { error, isValid };
          }
        }
      }
      
      // Check if fourth token is valid for subsection element properties
      if (tokens.length >= 4) {
        const section = tokens[0];
        const subsection = tokens[1];
        const element = tokens[2];
        const property = tokens[3];
        
        // Only validate if we're dealing with a subsection element property
        if (commandStructure.subsections[section] && 
            commandStructure.subsections[section].includes(subsection)) {
          
          const subsectionElementKey = `${section}.${subsection}.${element}`;
          if (!commandStructure.properties[subsectionElementKey] || 
              !commandStructure.properties[subsectionElementKey].includes(property)) {
            error = `"${property}" is not a valid property for the ${element} element in the ${subsection} subsection. Please choose from the available options.`;
            isValid = false;
            return { error, isValid };
          }
        }
      }
      
      // If we've made it this far, the command is valid enough to submit
      error = '';
      isValid = true;
    }
    
    return { error, isValid };
  }, [commandStructure]);

  // Update validation state and available options based on current input
  useEffect(() => {
    // Get validation results without setting state directly in the validation function
    const { error, isValid } = validateInput(input);
    setValidationError(error);
    setIsValidCommand(isValid);
    
    // Initialize with sections if input is empty
    if (!input.trim()) {
      setCurrentOptions(commandStructure.sections);
      setCurrentLevel('section');
      return;
    }

    const tokens = input.toLowerCase().trim().split(/\s+/);
    
    // Determine current level and set appropriate options
    if (tokens.length === 1) {
      // User has typed a section or partial section
      const matchingSections = commandStructure.sections.filter(
        section => section.startsWith(tokens[0])
      );
      
      if (matchingSections.length > 0) {
        // If we have exact match for a section, show elements and subsections for that section
        if (commandStructure.sections.includes(tokens[0])) {
          const section = tokens[0];
          // Combine elements and subsections
          const options = [
            ...(commandStructure.elements[section] || []),
            ...(commandStructure.subsections[section] || [])
          ];
          setCurrentOptions(options);
          setCurrentLevel('elementOrSubsection');
        } else {
          // Otherwise show matching sections
          setCurrentOptions(matchingSections);
          setCurrentLevel('section');
        }
      } else {
        // No matching sections, reset to all sections
        setCurrentOptions(commandStructure.sections);
        setCurrentLevel('section');
      }
    } 
    else if (tokens.length === 2) {
      const section = tokens[0];
      const secondToken = tokens[1];
      
      // Check if section exists
      if (commandStructure.sections.includes(section)) {
        // Check if second token might be a subsection
        if (commandStructure.subsections[section]) {
          const matchingSubsections = commandStructure.subsections[section].filter(
            subsection => subsection.startsWith(secondToken)
          );
          
          // If we have an exact match for a subsection
          if (matchingSubsections.includes(secondToken)) {
            // Show elements for this subsection
            const subsectionKey = `${section}.${secondToken}`;
            setCurrentOptions(commandStructure.subsectionElements[subsectionKey] || []);
            setCurrentLevel('subsectionElement');
            return;
          }
          
          // If we have partial matches for subsections
          if (matchingSubsections.length > 0) {
            setCurrentOptions(matchingSubsections);
            setCurrentLevel('subsection');
            return;
          }
        }
        
        // Check if second token might be an element
        const matchingElements = (commandStructure.elements[section] || []).filter(
          element => element.startsWith(secondToken)
        );
        
        // If we have an exact match for an element
        if (matchingElements.includes(secondToken)) {
          // Show properties for this element
          const key = `${section}.${secondToken}`;
          setCurrentOptions(commandStructure.properties[key] || []);
          setCurrentLevel('property');
          return;
        }
        
        // If we have partial matches for elements
        if (matchingElements.length > 0) {
          setCurrentOptions(matchingElements);
          setCurrentLevel('element');
          return;
        }
        
        // If no matches for elements or subsections, show all options
        const options = [
          ...(commandStructure.elements[section] || []),
          ...(commandStructure.subsections[section] || [])
        ];
        setCurrentOptions(options);
        setCurrentLevel('elementOrSubsection');
      }
    }
    else if (tokens.length === 3) {
      const section = tokens[0];
      const secondToken = tokens[1];
      const thirdToken = tokens[2];
      
      // Check if second token is a subsection
      if (commandStructure.subsections[section] && 
          commandStructure.subsections[section].includes(secondToken)) {
        
        const subsectionKey = `${section}.${secondToken}`;
        const matchingElements = (commandStructure.subsectionElements[subsectionKey] || []).filter(
          element => element.startsWith(thirdToken)
        );
        
        // If we have an exact match for a subsection element
        if (matchingElements.includes(thirdToken)) {
          // Show properties for this subsection element
          const key = `${section}.${secondToken}.${thirdToken}`;
          setCurrentOptions(commandStructure.properties[key] || []);
          setCurrentLevel('subsectionProperty');
          return;
        }
        
        // If we have partial matches for subsection elements
        if (matchingElements.length > 0) {
          setCurrentOptions(matchingElements);
          setCurrentLevel('subsectionElement');
          return;
        }
        
        // If no matches, show all subsection elements
        setCurrentOptions(commandStructure.subsectionElements[subsectionKey] || []);
        setCurrentLevel('subsectionElement');
      }
      // Check if second token is an element
      else if (commandStructure.elements[section] && 
               commandStructure.elements[section].includes(secondToken)) {
        
        const key = `${section}.${secondToken}`;
        const matchingProperties = (commandStructure.properties[key] || []).filter(
          property => property.startsWith(thirdToken)
        );
        
        // If we have an exact match for a property
        if (matchingProperties.includes(thirdToken)) {
          // Show value placeholder
          setCurrentOptions(["[Enter your value]"]);
          setCurrentLevel('value');
          return;
        }
        
        // If we have partial matches for properties
        if (matchingProperties.length > 0) {
          setCurrentOptions(matchingProperties);
          setCurrentLevel('property');
          return;
        }
        
        // If no matches, show all properties
        setCurrentOptions(commandStructure.properties[key] || []);
        setCurrentLevel('property');
      }
    }
    else if (tokens.length === 4) {
      const section = tokens[0];
      const secondToken = tokens[1];
      
      // Check if second token is a subsection
      if (commandStructure.subsections[section] && 
          commandStructure.subsections[section].includes(secondToken)) {
        
        const subsectionElement = tokens[2];
        const property = tokens[3];
        
        const key = `${section}.${secondToken}.${subsectionElement}`;
        const matchingProperties = (commandStructure.properties[key] || []).filter(
          prop => prop.startsWith(property)
        );
        
        // If we have an exact match for a property
        if (matchingProperties.includes(property)) {
          // Show value placeholder
          setCurrentOptions(["[Enter your value]"]);
          setCurrentLevel('subsectionValue');
          return;
        }
        
        // If we have partial matches for properties
        if (matchingProperties.length > 0) {
          setCurrentOptions(matchingProperties);
          setCurrentLevel('subsectionProperty');
          return;
        }
        
        // If no matches, show all properties
        setCurrentOptions(commandStructure.properties[key] || []);
        setCurrentLevel('subsectionProperty');
      }
      else {
        // For regular elements, show value placeholder
        setCurrentOptions(["[Enter your value]"]);
        setCurrentLevel('value');
      }
    }
    else if (tokens.length >= 5) {
      // For subsection commands or completed commands, show value placeholder
      setCurrentOptions(["[Enter your value]"]);
      setCurrentLevel('value');
    }
  }, [input, commandStructure, validateInput]);

  // Handle option click
  const handleOptionClick = (option) => {
    // Get current tokens
    const tokens = input.trim().split(/\s+/);
    
    // If the option is a placeholder, don't add it
    if (option === '[Enter your value]') {
      // Focus the input field for the user to type the value
      inputRef.current?.focus();
      return;
    }
    
    // Determine how to add the option based on the current level
    let newInput = '';
    
    if (currentLevel === 'section') {
      // Starting a new command with a section
      newInput = option;
    } else if (currentLevel === 'elementOrSubsection' || 
               currentLevel === 'element' || 
               currentLevel === 'subsection') {
      // Adding an element or subsection to a section
      newInput = `${tokens[0]} ${option}`;
    } else if (currentLevel === 'property' || currentLevel === 'subsectionElement') {
      // Adding a property to an element or an element to a subsection
      newInput = `${tokens[0]} ${tokens[1]} ${option}`;
    } else if (currentLevel === 'subsectionProperty') {
      // Adding a property to a subsection element
      newInput = `${tokens[0]} ${tokens[1]} ${tokens[2]} ${option}`;
    } else if (currentLevel === 'value' || currentLevel === 'subsectionValue') {
      // For values, we'll just focus the input field
      inputRef.current?.focus();
      return;
    }
    
    // Update the input field
    setInput(newInput);
    
    // Focus the input field and position cursor at the end
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        // Set cursor position to the end of the input text
        const length = newInput.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) {
      return;
    }
    
    // Check if command is valid before submitting
    if (!isValidCommand) {
      // Show error message if command is invalid
      if (validationError) {
        setMessages(prev => [...prev, { 
          text: validationError, 
          isUser: false,
          isError: true
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: "Your command is incomplete. Please finish constructing a valid command.", 
          isUser: false,
          isError: true
        }]);
      }
      return;
    }
    
    // Add user message
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    setIsProcessing(true);
    setValidationError('');
    
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
      // Focus will be handled by the useEffect that watches isProcessing
    }
  };

  // Get the label for the current level
  const getLevelLabel = () => {
    switch (currentLevel) {
      case 'section': return 'Available sections:';
      case 'elementOrSubsection': return 'Available elements and subsections:';
      case 'element': return 'Available elements:';
      case 'subsection': return 'Available subsections:';
      case 'property': return 'Available properties:';
      case 'subsectionElement': return 'Available elements for this subsection:';
      case 'subsectionProperty': return 'Available properties for this element:';
      case 'value': 
      case 'subsectionValue': 
        return 'Enter your desired value:';
      default: return 'Options:';
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="system-message">
          Welcome to Website Chat Editor! Type commands or click on options below to make changes to your website.
        </div>
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.text} 
            isUser={msg.isUser}
            isError={msg.isError} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="command-guide">
        <div className="guide-label">{getLevelLabel()}</div>
        <div className="guide-options">
          {currentOptions.map((option, index) => (
            <div 
              key={index} 
              className="guide-option clickable"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
        {(currentLevel === 'property' || currentLevel === 'subsectionProperty') && (
          <div className="guide-hint">
            After selecting a property, enter the value you want to set
          </div>
        )}
        {validationError && (
          <div className="validation-error">
            {validationError}
          </div>
        )}
      </div>
      
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your changes here or click on options above..."
            className="chat-input"
            disabled={isProcessing}
            // Add this to ensure cursor is at the end when input gets focus
            onFocus={(e) => {
              const length = e.target.value.length;
              e.target.setSelectionRange(length, length);
            }}
          />
        </div>
        <button 
          type="submit" 
          className={`chat-submit-button ${!isValidCommand && input.trim() ? 'invalid' : ''}`} 
          disabled={isProcessing}
        >
          {isProcessing ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
