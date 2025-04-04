// A flexible intent parser that works with template structure metadata
// and falls back to the rule-based approach for backward compatibility

/**
 * Parse user intent from a message
 * @param {string} message - The user's message
 * @returns {object} The parsed intent
 */
export function parseIntent(message) {
  // First try to parse as structured command
  const structuredIntent = parseStructuredCommand(message);
  if (structuredIntent && structuredIntent.section) {
    return structuredIntent;
  }
  
  // If no structured command was detected, return null
  return null;
}

/**
 * Parse a structured command like "section element property value"
 * Example: "header logo text My Company"
 * @param {string} message 
 */
function parseStructuredCommand(message) {
  const lowerMessage = message.toLowerCase().trim();
  
  // Handle multi-part commands with icon classes (contains spaces in value)
  // Example: "benefits item1 icon fas fa-chart-pie"
  const iconCommandRegex = /^(\w+)\s+(\w+(?:\.\w+)*)\s+icon\s+(.+)$/i;
  const iconMatch = message.match(iconCommandRegex);
  
  if (iconMatch) {
    const [_, section, element, iconValue] = iconMatch;
    
    let result = { section, property: 'icon', value: iconValue };
    
    // Check if element is an array item or contains a path
    if (/^item\d+$/.test(element)) {
      const itemIndex = element.replace('item', '');
      result.element = element;
      result.isArrayItem = true;
      result.itemIndex = itemIndex;
    } else if (element.includes('.')) {
      // Handle nested elements like 'social.facebook'
      result.element = element;
    } else {
      result.element = element;
    }
    
    return result;
  }
  
  // Match pattern: section element.subelement property value
  // Example: "footer social.facebook url https://facebook.com"
  const nestedElementRegex = /^(\w+)\s+(\w+\.\w+)\s+(\w+)\s+(.+)$/i;
  const nestedElementMatch = message.match(nestedElementRegex);
  
  if (nestedElementMatch) {
    const [_, section, element, property, value] = nestedElementMatch;
    return {
      section,
      element,
      property,
      value
    };
  }
  
  // Match pattern: section element property.subproperty value
  // Example: "benefits item1 background.color blue"
  const nestedPropertyRegex = /^(\w+)\s+(\w+(?:\.\w+)*)\s+(\w+\.\w+)\s+(.+)$/i;
  const nestedPropertyMatch = message.match(nestedPropertyRegex);
  
  if (nestedPropertyMatch) {
    const [_, section, element, property, value] = nestedPropertyMatch;
    
    let result = { section, property, value };
    
    // Check if element is an array item
    if (/^item\d+$/.test(element)) {
      const itemIndex = element.replace('item', '');
      result.element = element;
      result.isArrayItem = true;
      result.itemIndex = itemIndex;
    } else {
      result.element = element;
    }
    
    return result;
  }
  
  // Check for simple format: "section element property value"
  // Example: "header background color blue"
  const simpleFormatRegex = /^(\w+)\s+(\w+(?:\.\w+)*)\s+(\w+)\s+(.+)$/i;
  const simpleMatch = message.match(simpleFormatRegex);
  
  if (simpleMatch) {
    const [_, section, element, property, value] = simpleMatch;
    
    // Check if this is an array item
    if (/^item\d+$/.test(element)) {
      const itemIndex = element.replace('item', '');
      return {
        section,
        element,
        property,
        value,
        isArrayItem: true,
        itemIndex
      };
    }
    
    return {
      section,
      element,
      property,
      value
    };
  }
  
  return null;
}