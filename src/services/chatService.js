import { parseIntent } from '../utils/parseIntent';

/**
 * Process a command and update the website configuration
 * This version uses template structure metadata where available
 */
export async function processMessage(message, currentConfig) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Parse the user's intent
  const intent = parseIntent(message);
  console.log('Intent:', intent);
  
  // Check if we have a valid intent
  if (!intent || !intent.section) {
    return {
      message: "I couldn't understand that command. Try something like 'header title text My Website'.",
      updatedConfig: null
    };
  }
  
  // Make a copy of the current config
  const updatedConfig = JSON.parse(JSON.stringify(currentConfig));
  
  // Check if we have structure info to use
  if (updatedConfig._structure) {
    const success = updateConfigWithIntent(updatedConfig, intent);
    if (success) {
      // Create a user-friendly response message
      const elementPart = intent.element.includes('.') 
        ? intent.element.replace('.', ' ') 
        : intent.element;
      
      const propertyPart = intent.property.includes('.')
        ? intent.property.replace('.', ' ')
        : intent.property;
        
      const responseMessage = `I've updated the ${intent.section} ${elementPart} ${propertyPart} to "${intent.value}".`;
      
      return {
        message: responseMessage,
        updatedConfig
      };
    }
  }
  
  // No successful update
  return {
    message: "I couldn't update that property. Make sure the section, element, and property exist in the template.",
    updatedConfig: null
  };
}

/**
 * Update the configuration using the template structure metadata
 * This is a flexible approach that works with any template structure
 */
function updateConfigWithIntent(config, intent) {
  try {
    // Normalize inputs
    const sectionKey = intent.section.toLowerCase();
    let elementKey = intent.element.toLowerCase();
    let propertyKey = intent.property.toLowerCase();
    
    console.log('Processing intent:', { sectionKey, elementKey, propertyKey, value: intent.value });
    
    // Make sure the section exists
    if (!config[sectionKey]) {
      console.log(`Section ${sectionKey} not found in config`);
      return false;
    }
    
    // Find the property path using the structure metadata
    const propertyPath = findPropertyPath(config, sectionKey, elementKey, propertyKey);
    if (propertyPath) {
      console.log(`Found property path: ${propertyPath}`);
      
      // Apply the update using the property path
      const success = setValueByPath(config, propertyPath, intent.value);
      return success;
    }
    
    // If no path was found with structure metadata, try direct object navigation
    return navigateAndUpdateConfig(config, sectionKey, elementKey, propertyKey, intent.value, intent.isArrayItem, intent.itemIndex);
  } catch (error) {
    console.error('Error updating config with intent:', error);
    return false;
  }
}

/**
 * Find the property path in the configuration using structure metadata
 */
function findPropertyPath(config, section, element, property) {
  if (!config._structure || !config._structure.sections) {
    return null;
  }
  
  // Find the section in structure
  const sectionMetadata = config._structure.sections.find(s => s.id.toLowerCase() === section.toLowerCase());
  if (!sectionMetadata) {
    return null;
  }
  
  // Handle array items
  if (element.match(/^item\d+$/)) {
    const itemIndex = parseInt(element.replace('item', '')) - 1;
    if (sectionMetadata.items && itemIndex >= 0 && itemIndex < sectionMetadata.items.length) {
      const itemMetadata = sectionMetadata.items[itemIndex];
      
      // Find the property in the item
      const propertyMetadata = itemMetadata.properties.find(p => p.id.toLowerCase() === property.toLowerCase());
      if (propertyMetadata) {
        return `${section}.items[${itemIndex}].${property}`;
      }
      
      // Handle nested properties like "background.color"
      if (property.includes('.')) {
        const [baseProp, subProp] = property.split('.');
        const basePropertyMetadata = itemMetadata.properties.find(p => p.id.toLowerCase() === baseProp.toLowerCase());
        if (basePropertyMetadata) {
          return `${section}.items[${itemIndex}].${baseProp}.${subProp}`;
        }
      }
    }
    return null;
  }
  
  // Handle nested elements like "social.facebook"
  if (element.includes('.')) {
    const [baseElement, subElement] = element.split('.');
    
    // First, check if the section has items that might contain this element
    if (sectionMetadata.items) {
      for (let i = 0; i < sectionMetadata.items.length; i++) {
        const item = sectionMetadata.items[i];
        // Look for a property that matches the base element
        if (item.id.toLowerCase() === baseElement.toLowerCase()) {
          // Find the property that matches the sub-element
          const propertyMetadata = item.properties.find(p => 
            p.id.toLowerCase() === subElement.toLowerCase());
          
          if (propertyMetadata) {
            return `${section}.${baseElement}.${subElement}.${property}`;
          }
        }
      }
    }
    
    // If not found in items, try to navigate directly
    if (config[section] && config[section][baseElement] && 
        config[section][baseElement][subElement]) {
      return `${section}.${baseElement}.${subElement}.${property}`;
    }
    
    return null;
  }
  
  // Regular element property
  const elementMetadata = sectionMetadata.elements.find(e => e.id.toLowerCase() === element.toLowerCase());
  if (!elementMetadata) {
    return null;
  }
  
  // Find the property in the element
  const propertyMetadata = elementMetadata.properties.find(p => p.id.toLowerCase() === property.toLowerCase());
  if (propertyMetadata) {
    return `${section}.${element}.${property}`;
  }
  
  // Handle nested properties like "background.color"
  if (property.includes('.')) {
    const [baseProp, subProp] = property.split('.');
    const basePropertyMetadata = elementMetadata.properties.find(p => p.id.toLowerCase() === baseProp.toLowerCase());
    if (basePropertyMetadata) {
      return `${section}.${element}.${baseProp}.${subProp}`;
    }
  }
  
  return null;
}

/**
 * Navigate the configuration object and update the value
 * This is a fallback approach for when structure metadata doesn't provide a clear path
 */
function navigateAndUpdateConfig(config, section, element, property, value, isArrayItem, itemIndex) {
  // Special case for social platform properties
  if (element && element.includes('.') && element.startsWith('social.')) {
    const platform = element.split('.')[1];
    
    // Make sure the social platform exists
    if (!config[section]?.social?.[platform]) {
      console.log(`Social platform not found: ${section}.social.${platform}`);
      return false;
    }
    
    if (property === 'url') {
      // Ensure URL has http/https prefix
      let urlValue = value;
      if (urlValue && !urlValue.match(/^https?:\/\//i) && !urlValue.includes('://')) {
        urlValue = `https://${urlValue}`;
      }
      config[section].social[platform].url = urlValue;
      console.log(`Updated social URL: ${section}.social.${platform}.url = ${urlValue}`);
      return true;
    }
    
    if (property === 'hidden') {
      // Convert to boolean
      const boolValue = value === 'true' || value === true;
      config[section].social[platform].hidden = boolValue;
      console.log(`Updated social visibility: ${section}.social.${platform}.hidden = ${boolValue}`);
      return true;
    }
    
    // Any other property
    config[section].social[platform][property] = value;
    console.log(`Updated social property: ${section}.social.${platform}.${property} = ${value}`);
    return true;
  }
  
  // Handle array items
  if (isArrayItem && itemIndex) {
    const index = parseInt(itemIndex) - 1;
    if (Array.isArray(config[section].items) && 
        index >= 0 && 
        index < config[section].items.length) {
      
      // Handle nested properties like "background.color"
      if (property.includes('.')) {
        const [baseProp, subProp] = property.split('.');
        if (!config[section].items[index][baseProp]) {
          config[section].items[index][baseProp] = {};
        }
        config[section].items[index][baseProp][subProp] = value;
      } else {
        config[section].items[index][property] = value;
      }
      
      console.log(`Updated array item: ${section}.items[${index}].${property} = ${value}`);
      return true;
    }
    return false;
  }
  
  // Handle nested elements like "social.facebook" (when not handled by the special case above)
  if (element.includes('.')) {
    const parts = element.split('.');
    let current = config[section];
    
    // Navigate through all parts except the last one
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    
    // Update the property in the final part
    const finalPart = parts[parts.length - 1];
    if (property.includes('.')) {
      const [baseProp, subProp] = property.split('.');
      if (!current[finalPart][baseProp]) {
        current[finalPart][baseProp] = {};
      }
      current[finalPart][baseProp][subProp] = value;
    } else {
      current[finalPart][property] = value;
    }
    
    console.log(`Updated nested element: ${section}.${element}.${property} = ${value}`);
    return true;
  }
  
  // Handle nested properties like "background.color"
  if (property.includes('.')) {
    const [baseProp, subProp] = property.split('.');
    
    // Try to update at element level first
    if (config[section][element]) {
      if (!config[section][element][baseProp]) {
        config[section][element][baseProp] = {};
      }
      config[section][element][baseProp][subProp] = value;
      console.log(`Updated nested property: ${section}.${element}.${baseProp}.${subProp} = ${value}`);
      return true;
    }
    
    // Then try at section level
    if (!config[section][baseProp]) {
      config[section][baseProp] = {};
    }
    config[section][baseProp][subProp] = value;
    console.log(`Updated section nested property: ${section}.${baseProp}.${subProp} = ${value}`);
    return true;
  }
  
  // Handle regular section.element.property path
  if (config[section][element] && typeof config[section][element] === 'object') {
    // Special case for text property
    if (property === 'text' && config[section][element].text !== undefined) {
      config[section][element].text = value;
      console.log(`Updated ${section}.${element}.text = ${value}`);
      return true;
    }
    
    // Regular property
    if (config[section][element][property] !== undefined) {
      config[section][element][property] = value;
      console.log(`Updated ${section}.${element}.${property} = ${value}`);
      return true;
    }
  }
  
  // Direct property on section
  if (config[section][property] !== undefined) {
    config[section][property] = value;
    console.log(`Updated ${section}.${property} = ${value}`);
    return true;
  }
  
  // If we got here, we couldn't find a valid update path
  console.log(`Could not find property to update:`, { section, element, property });
  return false;
}

/**
 * Set a value in an object using a dot-notation path with array support
 * Example paths: "section.element.property", "section.items[0].property"
 */
function setValueByPath(obj, path, value) {
  if (!path) return false;
  
  console.log(`Setting value by path: ${path} = ${value}`);
  
  const parts = path.split('.');
  
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
    const lastPart = parts[parts.length - 1];
    
    // Boolean conversion for 'hidden' properties 
    if (lastPart === 'hidden' && typeof value === 'string') {
      current[lastPart] = value.toLowerCase() === 'true';
      console.log(`Updated boolean property: ${path} = ${current[lastPart]}`);
    } else {
      current[lastPart] = value;
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
          current[arrayName][index] = value;
          return true;
        }
        
        // Otherwise, move to the next part
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
        current[part] = value;
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