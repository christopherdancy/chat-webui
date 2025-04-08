/**
 * Process a command and update the website configuration
 * This version accepts direct path updates
 */
export async function processMessage(message, currentConfig) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Make a copy of the current config
  const updatedConfig = JSON.parse(JSON.stringify(currentConfig));
  
  try {
    // Split the message into path and value
    const firstSpaceIndex = message.indexOf(' ');
    if (firstSpaceIndex === -1) {
      return {
        message: "Invalid format. Please provide a path and value separated by a space.",
        updatedConfig: null
      };
    }
    
    const path = message.substring(0, firstSpaceIndex);
    const value = message.substring(firstSpaceIndex + 1);
    
    // Update the configuration using the direct path
    const success = setValueByPath(updatedConfig, path, value);
    
    if (success) {
      // Create a user-friendly response message
      // Format the path for display (e.g., "benefits.items[0].title" -> "Benefits Items Title")
      const formattedPath = path
        .replace(/\./g, ' ')
        .replace(/\[(\d+)\]/g, ' $1')
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
        .split(' ')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');

      
      return {
        message: `I've updated the ${formattedPath} to "${value}".`,
        updatedConfig
      };
    }
    
    return {
      message: "I couldn't update that property. Make sure the path exists in the configuration.",
      updatedConfig: null
    };
  } catch (error) {
    console.error('Error processing direct path update:', error);
    return {
      message: "An error occurred while updating the configuration.",
      updatedConfig: null
    };
  }
}

/**
 * Set a value in an object using a dot-notation path with array support
 * Example paths: "section.element.property", "section.items[0].property"
 */
function setValueByPath(obj, path, value) {
  if (!path) return false;
  
  
  const parts = path.split('.');
  const lastPart = parts[parts.length - 1];
  
  // Check if this is a URL property
  const isUrlProperty = lastPart === 'url' || path.includes('.url');
  
  // Format URL if needed (add https:// if no protocol is specified)
  let formattedValue = value;
  if (isUrlProperty && typeof value === 'string' && value.trim() !== '') {
    if (!value.match(/^https?:\/\//i) && !value.startsWith('#')) {
      formattedValue = `https://${value}`;
      console.log(`Formatted URL: ${value} → ${formattedValue}`);
    }
  }
  
  // Handle the simple case with no arrays
  if (!path.includes('[')) {
    let current = obj;
    
    // Navigate through all parts except the last one
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        console.log(`Creating missing object at ${parts.slice(0, i+1).join('.')}`);
        current[part] = {};
      }
      current = current[part];
    }
    
    // Set the value on the last part
    
    // Boolean conversion for 'hidden' properties 
    if (lastPart === 'hidden' && typeof value === 'string') {
      current[lastPart] = value.toLowerCase() === 'true';
      console.log(`Updated boolean property: ${path} = ${current[lastPart]}`);
    } else {
      // Use the formatted value
      current[lastPart] = formattedValue;
    }
    
    return true;
  }
  
  // Handle more complex case with arrays
  let current = obj;
  let pathSoFar = '';
  
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    pathSoFar += (i > 0 ? '.' : '') + part;
    
    // Check if this part contains an array index
    if (part.includes('[')) {
      const match = part.match(/(\w+)\[(\d+)\]/);
      if (match) {
        const arrayName = match[1];
        const index = parseInt(match[2]);
        
        // Make sure the array exists
        if (!current[arrayName]) {
          current[arrayName] = [];
        }
        
        // Make sure the array is long enough
        while (current[arrayName].length <= index) {
          current[arrayName].push({});
        }
        
        // If this is the last part, set the value
        if (i === parts.length - 1) {
          // Use the formatted value
          current[arrayName][index] = formattedValue;
          return true;
        }
        
        // If the array item doesn't exist or isn't an object, initialize it
        if (!current[arrayName][index] || typeof current[arrayName][index] !== 'object') {
          current[arrayName][index] = {};
        }
        
        // Move to the next part
        current = current[arrayName][index];
        continue;
      }
    }
    
    // Regular property
    if (i === parts.length - 1) {
      // Boolean conversion for 'hidden' properties
      if (part === 'hidden' && typeof value === 'string') {
        current[part] = value.toLowerCase() === 'true';
        console.log(`Updated boolean property: ${pathSoFar} = ${current[part]}`);
      } else {
        // Use the formatted value
        current[part] = formattedValue;
      }
      return true;
    }
    
    if (!current[part]) {
      current[part] = {};
    }
    current = current[part];
  }
  
  return true;
}

/**
 * Get the current value from configuration
 * @param {Object} config - The website configuration
 * @param {String} path - Path to the property
 * @returns {*} The current value
 */
export function getCurrentValue(config, path) {
  if (!config || !path) return undefined;
  
  const parts = path.split('.');
  let current = config;
  
  for (const part of parts) {
    // Handle array notation [n]
    const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
    if (arrayMatch) {
      const name = arrayMatch[1];
      const index = parseInt(arrayMatch[2]);
      
      if (!current[name] || !Array.isArray(current[name]) || index >= current[name].length) {
        return undefined;
      }
      
      current = current[name][index];
    } else {
      if (!current || current[part] === undefined) return undefined;
      current = current[part];
    }
  }
  
  return current;
}