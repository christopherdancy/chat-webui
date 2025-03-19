// src/components/Chat.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChatMessage from './ChatMessage';
import { processMessage } from '../services/chatService';
import { generateCommandStructure } from '../utils/commandStructureGenerator';
import IconPicker from './IconPicker';
import ColorPicker from './ColorPicker';
import ImageUploader from './ImageUploader';

const Chat = ({ onPreviewUpdate, websiteConfig }) => {
  const [messages, setMessages] = useState([
    { text: "Hi, I'm your website editor assistant. Customize your website by typing a command like 'header background color green'.", isUser: false }
  ]);

  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentLevel, setCurrentLevel] = useState('section');
  const [validationError, setValidationError] = useState('');
  const [isValidCommand, setIsValidCommand] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [currentIconContext, setCurrentIconContext] = useState(null);
  const [currentColorContext, setCurrentColorContext] = useState(null);
  const [showIconHint, setShowIconHint] = useState(false);
  const [showColorHint, setShowColorHint] = useState(false);
  const [showImageUploadHint, setShowImageUploadHint] = useState(false);
  const [currentImageContext, setCurrentImageContext] = useState(false);

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

  // Handle icon selection
  const handleIconSelect = (iconClass) => {
    if (!currentIconContext) return;
    
    const { section, item } = currentIconContext;
    // Format the command correctly: "benefits item1 icon image fas fa-home"
    const command = `${section} ${item} icon image ${iconClass}`;
    
    // Set the command in the input field
    setInput(command);
    
    // Close the icon picker
    setShowIconPicker(false);
    
    // Focus the input field and position cursor at the end
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const length = command.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 0);
  };

  // Show color picker for a specific context
  const showColorPickerFor = (section, item, property) => {
    // Store the full context including the current input
    setCurrentColorContext({ 
      section, 
      item, 
      property,
      currentInput: input // Store the current input to preserve structure
    });
    setShowColorPicker(true);
  };

  // Handle color selection
  const handleColorSelect = (colorValue) => {
    if (!currentColorContext) return;
    
    const { section, item, property, currentInput } = currentColorContext;
    
    // Format the command based on context
    let command = '';
    
    if (item) {
      // For item properties like "benefits item1 iconColor"
      // Check if we're dealing with a nested property like "icon color"
      const tokens = currentInput.trim().split(/\s+/);
      
      if (tokens.length >= 4 && tokens[2] === 'icon' && tokens[3] === 'color') {
        // For "benefits item1 icon color"
        command = `${section} ${item} icon color ${colorValue}`;
      } else {
        // For other item properties
        command = `${section} ${item} ${property} ${colorValue}`;
      }
    } else {
      // For section properties like "hero background color"
      const tokens = currentInput.trim().split(/\s+/);
      
      // Check if we're dealing with a compound property like "background color"
      if (tokens.length >= 2 && tokens[1].toLowerCase() === 'background') {
        command = `${section} background color ${colorValue}`;
      } else if (tokens.length >= 2 && tokens[1].toLowerCase() === 'text') {
        command = `${section} text color ${colorValue}`;
      } else if (tokens.length >= 2 && tokens[1].toLowerCase() === 'button') {
        command = `${section} button color ${colorValue}`;
      } else if (tokens.length >= 3 && tokens[2].toLowerCase() === 'background') {
        command = `${section} ${tokens[1]} background color ${colorValue}`;
      } else if (tokens.length >= 2 && tokens[1].toLowerCase() === 'primary') {
        command = `${section} primary color ${colorValue}`;
      } else if (tokens.length >= 2 && tokens[1].toLowerCase() === 'secondary') {
        command = `${section} secondary color ${colorValue}`;
      } else {
        // For simple properties like "color"
        command = `${section} ${property} ${colorValue}`;
      }
    }
    
    // Set the command in the input field
    setInput(command);
    
    // Close the color picker
    setShowColorPicker(false);
    
    // Focus the input field and position cursor at the end
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const length = command.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 0);
  };

  // Show icon picker for a specific context
  const showIconPickerFor = (section, item) => {
    setCurrentIconContext({ section, item });
    setShowIconPicker(true);
  };

  // Show image uploader for a specific context
  const showImageUploaderFor = (section) => {
    setCurrentImageContext({ section });
    setShowImageUploader(true);
  };

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
      setShowIconHint(false);
      setShowColorHint(false);
      setShowImageUploadHint(false);
      return;
    }

    const tokens = input.toLowerCase().trim().split(/\s+/);
    
    // Check if we're in the "features image upload" context or if we already have a URL
    if ((tokens.length >= 3 && 
         (tokens[0] === 'features' || tokens[0] === 'header') && 
         (tokens[1] === 'image' || tokens[1] === 'logo') && 
         (tokens[2] === 'upload' || tokens[2] === 'image')) ||
        (input.includes('features image url ') && input.includes('.jpg'))) {
      
      // Show the upload option regardless of whether we already have a URL
      setCurrentOptions(["[Click to upload an image]"]);
      setCurrentLevel('value');
      setShowImageUploadHint(true);
      return;
    }
    
    // For "features image" context, make sure "upload" is in the options
    if (tokens.length === 2 && 
        tokens[0] === 'features' && 
        tokens[1] === 'image') {
      
      // Make sure "upload" is one of the options
      const options = ['upload'];
      setCurrentOptions(options);
      setCurrentLevel('property');
      return;
    }
    
    // Check if we should show the image upload hint
    if (tokens.length === 3) {
      const section = tokens[0];
      const property = tokens[1];
      const action = tokens[2];
      
      if (section === 'features' && 
          property === 'image' && 
          action === 'upload') {
        setShowImageUploadHint(true);
        setShowIconHint(false);
        setShowColorHint(false);
        return;
      }
    }
    
    // Check if we should show the icon hint
    if (tokens.length === 4) {
      const section = tokens[0];
      const item = tokens[1];
      const property = tokens[2];
      const subproperty = tokens[3];
      
      if ((section === 'benefits' || section === 'features') && 
          item.match(/^item[1-3]$/) && 
          property === 'icon' &&
          subproperty === 'image') {
        setShowIconHint(true);
        setShowColorHint(false);
        setShowImageUploadHint(false);
      } else if ((section === 'benefits' || section === 'features') && 
                item.match(/^item[1-3]$/) && 
                property === 'icon' &&
                subproperty === 'color') {
        setShowColorHint(true);
        setShowIconHint(false);
        setShowImageUploadHint(false);
      } else {
        setShowIconHint(false);
        setShowColorHint(false);
        setShowImageUploadHint(false);
      }
    } else if (tokens.length >= 3) {
      // Check for color properties
      const lastToken = tokens[tokens.length - 1].toLowerCase();
      
      if (lastToken === 'color') {
        // For section color properties like "hero background color"
        setShowColorHint(true);
        setShowIconHint(false);
        setShowImageUploadHint(false);
      } else if (tokens.length === 3 && 
                 tokens[0] === 'features' && 
                 tokens[1] === 'image' && 
                 tokens[2] === 'upload') {
        // For "features image upload"
        setShowImageUploadHint(true);
        setShowColorHint(false);
        setShowIconHint(false);
      } else {
        setShowColorHint(false);
        setShowIconHint(false);
        setShowImageUploadHint(false);
      }
    } else {
      setShowIconHint(false);
      setShowColorHint(false);
      setShowImageUploadHint(false);
    }
    
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

    // Check if we should automatically show the icon picker
    if (tokens.length >= 3) {
      const section = tokens[0];
      const item = tokens[1];
      const property = tokens[2];
      
      // If user has typed something like "benefits item1 icon" or "features item1 icon"
      if ((section === 'benefits' || section === 'features') && 
          item.match(/^item[1-3]$/) && 
          property === 'icon image') {
        
        // If the next token is not "image", show the icon picker
        if (true) {
          showIconPickerFor(section, item);
        }
      }
    }

    // Check if we should automatically show the image uploader
    if (tokens.length >= 3) {
      const section = tokens[0];
      const property = tokens[1];
      const action = tokens[2];
      
      // If user has typed something like "features image upload"
      if (section === 'features' && 
          property === 'image' && 
          action === 'upload') {
        showImageUploaderFor(section);
      }
      // If user has typed something like "header logo image"
      if (section === 'header' && 
          property === 'logo' && 
          action === 'image') {
        showImageUploaderFor(section);
      }
    }
  }, [input, commandStructure, validateInput]);

  // Handle option click
  const handleOptionClick = (option) => {
    // Special handling for the upload image option
    if (option === "[Click to upload an image]") {
      // Check if we're in the features image upload context, regardless of what's in the input field
      const tokens = input.toLowerCase().trim().split(/\s+/);
      
      // Handle logo upload
      if (tokens.length >= 3 && 
          tokens[0] === 'header' && 
          tokens[1] === 'logo' && 
          tokens[2] === 'image') {
        
        showImageUploaderFor('header');
        return;
      }
      
      // Handle features image upload (existing code)
      if ((tokens.length >= 3 && 
        tokens[0] === 'features' && 
        tokens[1] === 'image' && 
        tokens[2] === 'upload') ||
       (input.includes('features image url') || input.includes('features image upload'))) {
     
     // Show the image uploader
     showImageUploaderFor('features');
     return;
   }
 }
    
    // Get current tokens
    const tokens = input.trim().split(/\s+/);
    
    // Special handling for icon properties
    if (option === 'image' && tokens.length >= 3) {
      const section = tokens[0];
      const item = tokens[1];
      const property = tokens[2];
      
      // Check if we're in an icon property context
      if ((section === 'benefits' || section === 'features') && 
          item.match(/^item[1-3]$/) && 
          property === 'icon') {
        showIconPickerFor(section, item);
        return;
      }

      // For image properties
      if (section === 'features' && 
          item === 'image' && 
          property === 'upload') {
        showImageUploaderFor(section);
        return;
      }
    }
    
    // Special handling for color properties
    if (option === 'color') {
      const section = tokens[0];
      
      // For nested properties like "icon color"
      if (tokens.length >= 3 && tokens[2] === 'icon') {
        const item = tokens[1];
        
        // Store the current input to preserve the structure
        setCurrentColorContext({ 
          section, 
          item, 
          property: 'icon color',
          currentInput: `${section} ${item} icon color` // Explicitly set the structure
        });
        setShowColorPicker(true);
        return;
      }
      
      // For compound properties like "background color"
      if (tokens.length >= 2) {
        const previousToken = tokens[1].toLowerCase();
        
        if (previousToken === 'background' || 
            previousToken === 'text' || 
            previousToken === 'button') {
          // For "hero background color", "hero text color", etc.
          showColorPickerFor(section, null, option);
          return;
        }
      }
      
      // For simple color properties
      showColorPickerFor(section, null, option);
      return;
    }
    
    // Special handling for [Enter your value] when in color context
    if (option === '[Enter your value]') {
      const section = tokens[0];
      
      // Check for icon color context
      if (tokens.length >= 4 && 
          tokens[1].match(/^item[1-3]$/) && 
          tokens[2] === 'icon' && 
          tokens[3] === 'color') {
        
        setCurrentColorContext({ 
          section, 
          item: tokens[1], 
          property: 'icon color',
          currentInput: input
        });
        setShowColorPicker(true);
        return;
      }
      
      // Check for compound properties like "background color"
      if (tokens.length >= 3 && 
          (tokens[1] === 'background' || tokens[1] === 'text' || tokens[1] === 'button') && 
          tokens[2] === 'color') {
        showColorPickerFor(section, null, 'color');
        return;
      }
      
      // Check for simple color property
      if (tokens.length >= 2 && tokens[1] === 'color') {
        showColorPickerFor(section, null, 'color');
        return;
      }
      
      // Check for item color properties
      if (tokens.length >= 3 && 
          tokens[1].match(/^item[1-3]$/) && 
          (tokens[2] === 'iconColor' || tokens[2] === 'color')) {
        showColorPickerFor(section, tokens[1], tokens[2]);
        return;
      }
      
      // For icon image properties
      if (tokens.length >= 4 && 
          tokens[1].match(/^item[1-3]$/) && 
          tokens[2] === 'icon' && 
          tokens[3] === 'image') {
        showIconPickerFor(section, tokens[1]);
        return;
      }
      
      // If not a special case, just focus the input
      inputRef.current?.focus();
      return;
    }
    
    // Special handling for image uploads
    if (option === 'upload' && tokens.length >= 2) {
      const section = tokens[0];
      const property = tokens[1];
      
      if (section === 'features' && property === 'image') {
        showImageUploaderFor(section);
        return;
      }
    }
    
    // Determine how to add the option based on the current level
    let newInput = '';
    
    if (currentLevel === 'section') {
      // Starting a new command with a section
      newInput = option + ' ';  // Add space after section
    } else if (currentLevel === 'elementOrSubsection' || 
               currentLevel === 'element' || 
               currentLevel === 'subsection') {
      // Adding an element or subsection to a section
      newInput = `${tokens[0]} ${option} `;  // Add space after element/subsection
    } else if (currentLevel === 'property' || currentLevel === 'subsectionElement') {
      // Adding a property to an element or an element to a subsection
      newInput = `${tokens[0]} ${tokens[1]} ${option} `;  // Add space after property/element
    } else if (currentLevel === 'subsectionProperty') {
      // Adding a property to a subsection element
      newInput = `${tokens[0]} ${tokens[1]} ${tokens[2]} ${option} `;  // Add space after property
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

  // Function to get more explicit option text
  const getOptionText = (option, currentLevel) => {
    // For value placeholders, make them more explicit
    if (option === '[Enter your value]') {
      // Check current input to determine context
      const tokens = input.trim().split(/\s+/);
      
      // For icon image context
      if (tokens.length >= 4 && 
          tokens[1].match(/^item[1-3]$/) && 
          tokens[2] === 'icon' && 
          tokens[3] === 'image') {
        return '[Click to select an icon]';
      }
      
      // For color contexts
      if (tokens.length >= 3 && tokens[tokens.length - 1] === 'color') {
        return '[Click to select a color]';
      }
      
      // For icon color context
      if (tokens.length >= 4 && 
          tokens[1].match(/^item[1-3]$/) && 
          tokens[2] === 'icon' && 
          tokens[3] === 'color') {
        return '[Click to select a color]';
      }

      // For image upload context
      if (tokens.length >= 3 && 
          tokens[1] === 'image' && 
          tokens[2] === 'upload') {
        return '[Click to upload an image]';
      }
    }

    
    return option;
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
              {getOptionText(option, currentLevel)}
            </div>
          ))}
        </div>
        {showIconHint && (
          <div className="guide-hint icon-hint">
            <i className="fas fa-info-circle"></i> Click on "[Click to select an icon]" to open the icon picker
          </div>
        )}
        {showColorHint && (
          <div className="guide-hint color-hint">
            <i className="fas fa-info-circle"></i> Click on "[Click to select a color]" to open the color picker
          </div>
        )}
        {showImageUploadHint && (
          <div className="guide-hint image-upload-hint">
            <i className="fas fa-info-circle"></i> Click on "[Click to upload an image]" to open the image uploader
          </div>
        )}
        {(currentLevel === 'property' || currentLevel === 'subsectionProperty') && 
         !showIconHint && !showColorHint && !showImageUploadHint && (
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
      
      {showIconPicker && (
        <div className="icon-picker-container">
          <div className="icon-picker-header">
            <h4>Select an icon for {currentIconContext?.section} {currentIconContext?.item}</h4>
            <button 
              className="close-icon-picker"
              onClick={() => setShowIconPicker(false)}
            >
              &times;
            </button>
          </div>
          <IconPicker onSelectIcon={handleIconSelect} />
        </div>
      )}
      
      {showImageUploader && (
        <div className="image-uploader-container">
          <div className="image-uploader-header">
            <h4>Upload Image for {currentImageContext?.section}</h4>
            <button 
              className="close-image-uploader"
              onClick={() => setShowImageUploader(false)}
            >
              &times;
            </button>
          </div>
          <ImageUploader 
            onImageSelect={(imageUrl) => {
              // Format the command with the image URL
              const command = currentImageContext?.section === "header" ? `${currentImageContext?.section} logo image ${imageUrl}` : `${currentImageContext?.section} image upload ${imageUrl}`;
              
              setInput(command);
              
              // Close the uploader after the state updates
              setTimeout(() => {
                setShowImageUploader(false);
                
                // Focus the input field and position cursor at the end
                if (inputRef.current) {
                  inputRef.current.focus();
                  const length = command.length;
                  inputRef.current.setSelectionRange(length, length);
                }
              }, 100);
            }}
            onClose={() => {
              setShowImageUploader(false);
            }}
          />
        </div>
      )}
      
      {showColorPicker && (
        <div className="color-picker-container">
          <div className="color-picker-header">
            <h4>
              {currentColorContext?.item 
                ? `Select a color for ${currentColorContext?.section} ${currentColorContext?.item} ${currentColorContext?.property}`
                : `Select a color for ${currentColorContext?.section} ${currentColorContext?.property}`
              }
            </h4>
            <button 
              className="close-color-picker"
              onClick={() => setShowColorPicker(false)}
            >
              &times;
            </button>
          </div>
          <ColorPicker onSelectColor={handleColorSelect} />
        </div>
      )}
      
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
