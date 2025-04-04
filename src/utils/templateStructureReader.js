/**
 * Utility to read and process template structure metadata
 * Generates command structure based on template's _structure field
 */

/**
 * Gets the template's section structure
 * @param {Object} config - The website configuration object
 * @returns {Array} Array of available section names
 */
export function getTemplateSections(config) {
  // If the template has a structure defined, use it
  if (config && config._structure && config._structure.sections) {
    const sections = config._structure.sections.map(section => section.name);
    return sections;
  }
  
  // Fallback for templates without structure: check which sections exist in the config
  if (config) {
    const defaultSections = [];
    
    // Check for common sections
    if (config.header) defaultSections.push('Header');
    if (config.hero) defaultSections.push('Hero');
    if (config.benefits) defaultSections.push('Benefits');
    if (config.features) defaultSections.push('Features');
    if (config.cta) defaultSections.push('Call to Action');
    if (config.footer) defaultSections.push('Footer');
    if (config.navigation) defaultSections.push('Navigation');
    if (config.home) defaultSections.push('Home');
    if (config.about) defaultSections.push('About');
    if (config.services) defaultSections.push('Services');
    if (config.portfolio) defaultSections.push('Portfolio');
    if (config.contact) defaultSections.push('Contact');
    
    return defaultSections;
  }
  
  return [];
}

/**
 * Gets elements for a specific section
 * @param {Object} config - The website configuration
 * @param {String} sectionName - The display name of the section
 * @returns {Array} Available elements for the section
 */
export function getSectionElements(config, sectionName) {
  // If template has structure defined, use it
  if (config && config._structure && config._structure.sections) {
    // Find the section by display name
    const section = config._structure.sections.find(s => s.name === sectionName);
    if (section) {
      // Get elements and items
      const elements = section.elements ? section.elements.map(e => e.name) : [];
      const items = section.items ? section.items.map(i => i.name) : [];
      
      return [...elements, ...items];
    }
  }
  
  // Fallback for templates without structure
  const sectionId = sectionName.toLowerCase();
  
  // Common fallback elements for known sections
  switch (sectionId) {
    case 'header':
      return ['Logo', 'Background'];
      
    case 'hero':
      return ['Title', 'Subtitle', 'Button', 'Background'];
      
    case 'benefits':
      return ['Title', 'Subtitle', 'Background', 'Item 1', 'Item 2', 'Item 3'];
      
    case 'features':
      return ['Title', 'Subtitle', 'Background', 'Image', 'Item 1', 'Item 2', 'Item 3'];
      
    case 'footer':
      return ['Description', 'Address', 'Phone', 'Email', 'Background', 'Social Links'];
      
    case 'navigation':
      return ['Logo', 'Menu Items'];
      
    case 'home':
      return ['Title', 'Description', 'Author Image', 'Main Button', 'Secondary Button'];
      
    case 'about':
      return ['Title', 'Description', 'Image', 'Button'];
      
    case 'services':
      return ['First Service', 'Second Service'];
      
    case 'portfolio':
      return ['Portfolio Items']; 
      
    case 'contact':
      return ['Map', 'Form', 'Button Text'];
      
    default:
      // Try to inspect the config object for this section
      const sectionConfig = config[sectionId];
      if (sectionConfig && typeof sectionConfig === 'object') {
        return Object.keys(sectionConfig)
          .filter(key => typeof sectionConfig[key] === 'object' || 
                         typeof sectionConfig[key] === 'string')
          .map(key => key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim());
      }
      return [];
  }
}

/**
 * Gets properties for a specific element in a section
 * @param {Object} config - The website configuration
 * @param {String} sectionName - The display name of the section
 * @param {String} elementName - The display name of the element
 * @returns {Array} Available properties for the element
 */
export function getElementProperties(config, sectionName, elementName) {
  // If template has structure defined, use it
  if (config && config._structure && config._structure.sections) {
    // Find the section by display name
    const section = config._structure.sections.find(s => 
      s.name.toLowerCase() === sectionName.toLowerCase()
    );
    
    if (section) {
      // Find the element
      const element = findElementByName(section, elementName);
      
      if (element) {
        // If this is a parent array element
        if (element.type === 'array' && element.items) {
          return element.items.map(item => item.name);
        }
        
        // If this was found as an array item with a parent reference
        if (element._parentElement) {
          // Return properties of this array item
          return element.type ? [element.type] : ['text'];
        }
        
        // For regular elements with properties
        if (element.properties) {
          return element.properties.map(p => p.name);
        }
        
        // If element has a type but no properties
        if (element.type) {
          switch (element.type) {
            case 'text': return ['Text'];
            case 'image': return ['Upload'];
            case 'color': return ['Color'];
            case 'boolean': return ['Toggle'];
            default: return ['Text'];
          }
        }
      }
      
      // Special case for "Item X" type elements
      const itemMatch = elementName.match(/Item\s+(\d+)/i);
      if (itemMatch) {
        // Find an array element in the section
        for (const el of section.elements) {
          if (el.type === 'array' && el.items) {
            // Return the properties available for items in this array
            return el.items.map(item => item.name);
          }
        }
      }
    }
  }
  
  // Fallback logic for when structure is not available
  const sectionId = sectionName.toLowerCase();
  const elementId = elementName.toLowerCase().replace(/\s+/g, '');
  
  // Special case for numbered items (like Item 1, Item 2, etc.)
  const itemMatch = elementName.match(/Item\s+(\d+)/i);
  if (itemMatch) {
    if (sectionId === 'benefits') {
      return ['Title', 'Description', 'Icon', 'Background'];
    }
    if (sectionId === 'features') {
      return ['Title', 'Description', 'Icon'];
    }
    return ['Text'];
  }
  
  // Common fallback properties for known elements
  switch (elementId) {
    case 'logo':
      return ['Text', 'Image'];
      
    case 'background':
      return ['Color'];
      
    case 'title':
    case 'subtitle':
    case 'description':
    case 'address':
    case 'phone':
    case 'email':
      return ['Text'];
      
    case 'button':
    case 'mainbutton':
    case 'secondarybutton':
      return ['Text', 'Color', 'URL'];
      
    case 'image':
    case 'authorimage':
      return ['Upload'];
      
    case 'map':
      return ['URL'];
      
    case 'sociallinks':
      return ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
      
    case 'firstservice':
    case 'secondservice':
      return ['Title', 'Description', 'Image', 'Button Text', 'Button URL'];
      
    case 'portfolioitems':
      return ['Title', 'Description', 'Thumbnail', 'Full Image'];
      
    default:
      // Try to inspect the config object for this section and element
      try {
        // Try to find the element in the config
        const sectionConfig = config[sectionId];
        if (sectionConfig && typeof sectionConfig === 'object') {
          // Look for the element in the section
          let elementConfig = null;
          
          // Handle special cases
          if (elementId === 'menuitem' && sectionConfig.items) {
            return ['Text', 'URL', 'Icon'];
          }
          
          // Try direct match
          if (sectionConfig[elementId]) {
            elementConfig = sectionConfig[elementId];
          } 
          // Try without spaces
          else {
            const possibleKey = Object.keys(sectionConfig)
              .find(key => key.toLowerCase() === elementId);
            
            if (possibleKey) {
              elementConfig = sectionConfig[possibleKey];
            }
          }
          
          if (elementConfig && typeof elementConfig === 'object') {
            return Object.keys(elementConfig)
              .filter(key => typeof elementConfig[key] !== 'object')
              .map(key => {
                if (key.includes('color') || key.includes('Color')) return 'Color';
                if (key.includes('url') || key.includes('Url')) return 'URL';
                if (key.includes('image') || key.includes('Image')) return 'Image';
                if (key.includes('icon') || key.includes('Icon')) return 'Icon';
                return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
              });
          }
        }
      } catch (e) {
        console.error('Error in fallback property detection:', e);
      }
      
      // Default generic properties
      return ['Text'];
  }
}

/**
 * Gets specific property options
 * @param {Object} config - The website configuration
 * @param {String} sectionName - The display name of the section
 * @param {String} elementName - The display name of the element
 * @param {String} propertyName - The display name of the property
 * @returns {Object} Details about the property including type and possible actions
 */
export function getPropertyDetails(config, sectionName, elementName, propertyName) {
  if (!config || !config._structure) return null;
  
  // Find the section
  const section = config._structure.sections.find(s => s.name === sectionName);
  if (!section) return null;
  
  // Find the element (in elements or items)
  let element = section.elements?.find(e => e.name === elementName);
  if (!element && section.items) {
    element = section.items.find(i => i.name === elementName);
  }
  
  if (!element) {
    // If not found directly, check if it's an array item
    for (const el of section.elements || []) {
      if (el.type === 'array' && el.items) {
        // Try to find the property in array items
        const item = el.items.find(i => i.name === propertyName);
        if (item) {
          return {
            id: item.id || item.name.toLowerCase(),
            name: item.name,
            type: item.type,
            actions: item.actions || null
          };
        }
      }
    }
    return null;
  }
  
  // If it's an array type element with items
  if (element.type === 'array' && element.items) {
    const item = element.items.find(i => i.name === propertyName);
    if (item) {
      return {
        id: item.id || item.name.toLowerCase(),
        name: item.name,
        type: item.type,
        actions: item.actions || null
      };
    }
  }
  
  // Find the property
  const property = element.properties?.find(p => p.name === propertyName);
  if (!property) return null;
  
  return {
    id: property.id || property.name.toLowerCase(),
    name: property.name,
    type: property.type,
    actions: property.actions || null
  };
}

/**
 * Generate command structure from template metadata
 * This replaces the hardcoded commandStructureGenerator.js approach with one driven by template metadata
 * @param {Object} websiteConfig - The website configuration
 * @returns {Object} Command structure
 */
export function generateCommandStructure(websiteConfig) {
  // If the template doesn't define structure, return an empty structure
  if (!websiteConfig || !websiteConfig._structure) {
    return {
      sections: [],
      elements: {},
      properties: {},
      subsections: {},
      subsectionElements: {},
      aliases: {}
    };
  }
  
  const structure = {
    sections: [],
    elements: {},
    properties: {},
    subsections: {},
    subsectionElements: {},
    aliases: {}
  };
  
  // Process sections
  websiteConfig._structure.sections.forEach(section => {
    // Use section.id if available, otherwise use name converted to lowercase
    const sectionId = section.id || section.name.toLowerCase();
    structure.sections.push(sectionId);
    structure.elements[sectionId] = [];
    structure.subsections[sectionId] = [];
    
    // Process elements
    if (section.elements) {
      section.elements.forEach(element => {
        // Use element.id if available, otherwise use name converted to lowercase
        const elementId = element.id || element.name.toLowerCase();
        structure.elements[sectionId].push(elementId);
        
        // Process properties for regular elements
        if (element.properties) {
          const propertyKey = `${sectionId}.${elementId}`;
          structure.properties[propertyKey] = [];
          
          element.properties.forEach(prop => {
            const propId = prop.id || prop.name.toLowerCase();
            structure.properties[propertyKey].push(propId);
          });
        }
        
        // Process properties for array type elements
        if (element.type === 'array' && element.items) {
          const itemKey = `${sectionId}.${elementId}`;
          structure.subsections[sectionId].push(elementId);
          structure.subsectionElements[itemKey] = [];
          
          element.items.forEach(item => {
            const itemId = item.id || item.name.toLowerCase();
            structure.subsectionElements[itemKey].push(itemId);
            
            // Set up property actions based on item type
            structure.properties[`${itemKey}.${itemId}`] = [];
            if (item.type === 'text') {
              structure.properties[`${itemKey}.${itemId}`].push('text');
            } else if (item.type === 'color') {
              structure.properties[`${itemKey}.${itemId}`].push('color');
            } else if (item.type === 'image') {
              structure.properties[`${itemKey}.${itemId}`].push('image');
            } else if (item.type === 'boolean') {
              structure.properties[`${itemKey}.${itemId}`].push('toggle');
            }
          });
        }
      });
    }
    
    // Process items (subsections)
    if (section.items) {
      section.items.forEach(item => {
        const itemId = item.id || item.name.toLowerCase();
        structure.subsections[sectionId].push(itemId);
        
        // Process item properties
        if (item.properties) {
          const itemKey = `${sectionId}.${itemId}`;
          structure.subsectionElements[itemKey] = [];
          
          // Set up empty property arrays for social or special types
          if (itemId === 'social') {
            item.properties.forEach(prop => {
              const propId = prop.id || prop.name.toLowerCase();
              structure.subsectionElements[itemKey].push(propId);
              structure.properties[`${itemKey}.${propId}`] = [];
              
              if (prop.actions) {
                prop.actions.forEach(action => {
                  structure.properties[`${itemKey}.${propId}`].push(action);
                });
              }
            });
          } 
          // For regular items like benefit1, feature2, etc.
          else {
            // Group properties by type for the item
            const propGroups = {};
            item.properties.forEach(prop => {
              const propType = prop.type || 'text';
              const propId = prop.id || prop.name.toLowerCase();
              
              if (!propGroups[propType]) {
                propGroups[propType] = [];
              }
              propGroups[propType].push(propId);
            });
            
            // Add each property as an element of the subsection
            Object.keys(propGroups).forEach(type => {
              structure.subsectionElements[itemKey].push(...propGroups[type]);
              
              // For each property, set its available actions
              propGroups[type].forEach(propId => {
                structure.properties[`${itemKey}.${propId}`] = [];
                
                // Based on type, add appropriate actions
                if (type === 'text') {
                  structure.properties[`${itemKey}.${propId}`].push('text');
                } else if (type === 'color') {
                  structure.properties[`${itemKey}.${propId}`].push('color');
                } else if (type === 'icon') {
                  structure.properties[`${itemKey}.${propId}`].push('image', 'color');
                } else if (type === 'image') {
                  structure.properties[`${itemKey}.${propId}`].push('image');
                } else if (type === 'boolean') {
                  structure.properties[`${itemKey}.${propId}`].push('toggle');
                }
              });
            });
          }
        }
      });
    }
  });
  
  return structure;
}

/**
 * Helper to find a section by name in the template structure
 */
export function findSectionByName(config, sectionName) {
  if (!config || !config._structure || !config._structure.sections) {
    return null;
  }
  
  return config._structure.sections.find(s => 
    s.name.toLowerCase() === sectionName.toLowerCase()
  );
}

/**
 * Finds an element in a section by its display name
 * Handles array items, nested elements, and parent elements
 * @param {Object} section - The section object from the template structure
 * @param {String} elementName - The display name of the element to find
 * @returns {Object} The element object or null if not found
 */
export function findElementByName(section, elementName) {
  if (!section || !elementName) return null;
  
  const elementNameLower = elementName.toLowerCase();
  
  // Check if this is a direct element match
  if (section.elements) {
    // Try to find by display name first
    const directElement = section.elements.find(e => 
      e.name.toLowerCase() === elementNameLower
    );
    
    if (directElement) return directElement;
    
    // Try to find by ID
    const idElement = section.elements.find(e => 
      e.id && e.id.toLowerCase() === elementNameLower
    );
    
    if (idElement) return idElement;
    
    // Check if this is a nested element (like "social.facebook")
    if (elementName.includes('.')) {
      const [parentName, childName] = elementName.split('.');
      const parentElement = section.elements.find(e => 
        e.name.toLowerCase() === parentName.toLowerCase() || 
        (e.id && e.id.toLowerCase() === parentName.toLowerCase())
      );
      
      // If parent is found and has properties that include child element
      if (parentElement && parentElement.properties) {
        const childProperty = parentElement.properties.find(p => 
          p.name.toLowerCase() === childName.toLowerCase() ||
          (p.id && p.id.toLowerCase() === childName.toLowerCase())
        );
        
        if (childProperty) {
          // Return the child property enhanced with parent reference
          return {
            ...childProperty,
            _parentElement: parentElement
          };
        }
      }
    }
  }
  
  // Check if this is an array item (like "Item 1", "Item 2", etc.)
  if (section.items) {
    // First try direct match with item name
    const directItem = section.items.find(item => 
      item.name.toLowerCase() === elementNameLower
    );
    
    if (directItem) return directItem;
    
    // Try to match "Item X" format
    const itemMatch = elementName.match(/Item\s+(\d+)/i);
    if (itemMatch) {
      const itemIndex = parseInt(itemMatch[1]) - 1;
      if (itemIndex >= 0 && itemIndex < section.items.length) {
        return section.items[itemIndex];
      }
    }
  }
  
  // Check elements again for array elements
  if (section.elements) {
    // Try to find arrays and check if element name is referring to an item
    for (const element of section.elements) {
      if (element.type === 'array' && element.items) {
        // Check if requested element is actually a property of an array item
        const itemProperty = element.items.find(item => 
          item.name.toLowerCase() === elementNameLower ||
          (item.id && item.id.toLowerCase() === elementNameLower)
        );
        
        if (itemProperty) {
          // Return the property with a reference to its parent array
          return {
            ...itemProperty,
            _parentElement: element
          };
        }
        
        // Check for nested properties in each item
        for (const item of element.items) {
          if (item.properties) {
            const nestedProperty = item.properties.find(p =>
              p.name.toLowerCase() === elementNameLower ||
              (p.id && p.id.toLowerCase() === elementNameLower)
            );
            
            if (nestedProperty) {
              return {
                ...nestedProperty,
                _parentElement: item,
                _grandParentElement: element
              };
            }
          }
        }
      }
    }
  }
  
  return null;
}

/**
 * Helper to find a property by name in a specific element
 */
export function findPropertyByName(element, propertyName) {
  if (!element || !element.properties) return null;
  
  return element.properties.find(p => 
    p.name.toLowerCase() === propertyName.toLowerCase()
  );
}

/**
 * Map from UI names to internal property structure
 * Used for generating commands
 */
export function mapToInternalStructure(config, sectionName, elementName, propertyName) {
  if (!config || !sectionName || !elementName) return null;
  
  // Try to find the section
  const section = findSectionByName(config, sectionName);
  if (!section) return null;
  
  const sectionId = section.id || section.name.toLowerCase();
  
  // Special case for Social Links: check if the element is actually a social platform
  // and the property is either 'URL' or 'Hidden'
  if (elementName === 'Social Links' && propertyName) {
    const platformProperty = section.items?.find(i => 
      i.id === 'social' || i.name === 'Social Links'
    );
    
    if (platformProperty && platformProperty.properties) {
      // Find the platform in properties (Facebook, Twitter, etc.)
      const platform = platformProperty.properties.find(p => 
        p.name.toLowerCase() === propertyName.toLowerCase() || 
        p.id?.toLowerCase() === propertyName.toLowerCase()
      );
      
      if (platform) {
        return {
          sectionId,
          elementId: 'social',
          propertyId: platform.id || platform.name.toLowerCase(),
          propertyType: 'social',
          actions: platform.actions || ['url', 'hidden'],
          platform: platform.id || platform.name.toLowerCase()
        };
      }
    }
  }
  
  // Handle case where elementName includes platform name (social.facebook)
  if (elementName.includes('.')) {
    const [baseElement, subElement] = elementName.split('.');
    
    // Check if this is a social element
    if (baseElement.toLowerCase() === 'social' && propertyName) {
      // For social elements, propertyName should be 'url' or 'hidden'
      return {
        sectionId,
        elementId: `${baseElement}.${subElement}`,
        propertyId: propertyName.toLowerCase(),
        propertyType: propertyName.toLowerCase() === 'hidden' ? 'boolean' : 'url',
        platform: subElement
      };
    }
  }
  
  // Standard case - find the element then property
  const element = findElementByName(section, elementName);
  if (!element) return null;
  
  const elementId = element.id || element.name.toLowerCase();
  
  // If it's an array element with items
  if (element.type === 'array' && element.items) {
    const item = element.items.find(i => i.name === propertyName);
    if (item) {
      return {
        sectionId,
        elementId,
        propertyId: item.id || item.name.toLowerCase(),
        propertyType: item.type,
        actions: item.actions || []
      };
    }
  }
  
  const property = findPropertyByName(element, propertyName);
  if (!property) return null;
  
  return {
    sectionId,
    elementId,
    propertyId: property.id || property.name.toLowerCase(),
    propertyType: property.type,
    actions: property.actions || []
  };
} 