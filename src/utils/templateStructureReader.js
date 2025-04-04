/**
 * Utility to read and process template structure
 * Simplified approach working directly with nested paths
 */

/**
 * Gets top-level nodes from the structure (sections)
 * @param {Object} config - The website configuration object
 * @returns {Array} Array of top-level node names
 */
export function getTemplateSections(config) {
  if (!config || !config._structure) return [];
  
  return (config._structure.sections || []).map(section => section.name);
}

/**
 * Gets child nodes by path in a generic way - no section/element/property categories
 * @param {Object} config - The configuration object
 * @param {String} path - Path to the current node (empty for top level)
 * @returns {Array} Names of child nodes
 */
export function getChildNodes(config, path) {
  if (!config || !config._structure) return [];
  
  // For top level, return sections
  if (!path) {
    return getTemplateSections(config);
  }
  
  // Find the node by path
  const node = findNodeByPath(config._structure, path);
  if (!node) return [];
  
  // If node has children, return their names
  if (node.children) {
    return node.children.map(child => child.name);
  }
  
  // If node is an array, return item names
  if (node.type === 'array' && node.default) {
    return node.default.map((_, index) => `Item ${index + 1}`);
  }
  
  return [];
}

/**
 * Find a node by its path in the structure
 * @param {Object} structure - The template structure
 * @param {String} path - The path to the node (e.g., "header.logo.text")
 * @returns {Object} The node at the path or null if not found
 */
export function findNodeByPath(structure, path) {
  if (!structure || !path) return null;
  
  const parts = path.split('.');
  
  // Find the section first
  const section = structure.sections.find(s => s.id === parts[0]);
  if (!section) return null;
  
  // If we only want the section, return it
  if (parts.length === 1) return section;
  
  // Otherwise, navigate through its children
  let current = section;
  
  // Navigate through remaining parts
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    // Check for array notation [n]
    const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
    if (arrayMatch) {
      const name = arrayMatch[1];
      const index = parseInt(arrayMatch[2]);
      
      // Find the array node
      const arrayNode = current.children.find(c => c.id === name);
      if (!arrayNode || !arrayNode.default || index >= arrayNode.default.length) {
        return null;
      }
      
      // If this is the last part, return the array item structure
      if (i === parts.length - 1) {
        return {
          ...arrayNode.itemStructure,
          arrayIndex: index,
          parentNode: arrayNode
        };
      }
      
      // Otherwise, continue with the next part
      current = arrayNode.itemStructure;
    } else {
      // Regular property navigation
      const child = current.children.find(c => c.id === part);
      if (!child) return null;
      current = child;
    }
  }
  
  return current;
}

/**
 * Gets property info for a node
 * @param {Object} node - The node from structure
 * @returns {Object} Property type and metadata
 */
export function getPropertyInfo(node) {
  if (!node) return null;
  
  return {
    type: node.type || 'text',
    path: node.path,
    default: node.default,
    note: node.note
  };
}

/**
 * Gets the path for a node in the navigation context
 * @param {Object} config - The website configuration
 * @param {String} currentPath - Current path in structure
 * @param {String} selectedName - Name of the selected node
 * @returns {String} Full path to the selected node
 */
export function getNodePath(config, currentPath, selectedName) {
  if (!config || !config._structure) return null;
  
  // For top level selection
  if (!currentPath) {
    const section = config._structure.sections.find(s => s.name === selectedName);
    return section ? section.id : null;
  }
  
  // Find the current node
  const currentNode = findNodeByPath(config._structure, currentPath);
  if (!currentNode) return null;
  
  // Handle array item selection (Item 1, Item 2, etc.)
  const itemMatch = selectedName.match(/Item\s+(\d+)/i);
  if (itemMatch && currentNode.type === 'array') {
    const index = parseInt(itemMatch[1]) - 1;
    return `${currentPath}[${index}]`;
  }
  
  // Find the selected child for non-array nodes
  if (currentNode.children) {
    const selectedChild = currentNode.children.find(c => c.name === selectedName);
    if (selectedChild) {
      return currentPath ? `${currentPath}.${selectedChild.id}` : selectedChild.id;
    }
  }
  
  return null;
}

/**
 * Check if a node is directly editable (has a type and no children)
 * @param {Object} node - The node to check
 * @returns {Boolean} True if node is editable
 */
export function isEditableNode(node) {
  return node && node.type && !node.children;
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

/**
 * Maps multi-step UI navigation to a property path
 * This maintains backward compatibility with the existing Chat component
 * @param {Object} config - The website configuration
 * @param {String} sectionName - The section name
 * @param {String} elementName - The element name
 * @param {String} propertyName - The property name
 * @returns {Object} Internal structure with path and type information
 */
export function mapToInternalStructure(config, sectionName, elementName, propertyName) {
  if (!config || !config._structure || !sectionName || !elementName) return null;
  
  // Find the section
  const section = config._structure.sections.find(s => s.name === sectionName);
  if (!section) return null;
  
  const sectionId = section.id;
  
  // Find the element
  const element = section.children.find(e => e.name === elementName);
  if (!element) return null;
  
  const elementId = element.id;
  
  // Special case for social links
  if (elementName === 'Social Links' && propertyName) {
    const socialElement = element.children.find(c => c.id === 'social');
    if (socialElement) {
      // Find the specific platform (Facebook, Twitter, etc.)
      const platform = socialElement.children.find(c => c.name === propertyName);
      if (platform) {
        return {
          sectionId,
          elementId: 'social',
          propertyId: platform.id,
          propertyType: 'social',
          path: `${sectionId}.social.${platform.id}`
        };
      }
    }
  }
  
  // Check if element is an array item (Item 1, Item 2, etc.)
  const itemMatch = elementName.match(/Item\s+(\d+)/i);
  if (itemMatch && element.type === 'array') {
    const index = parseInt(itemMatch[1]) - 1;
    // Find the property in the itemStructure
    const property = element.itemStructure.children.find(c => c.name === propertyName);
    if (property) {
      return {
        sectionId,
        elementId: `${element.id}[${index}]`,
        propertyId: property.id,
        propertyType: property.type,
        path: property.pathTemplate.replace('[INDEX]', index)
      };
    }
  }
  
  // Regular element with children
  if (element.children) {
    const property = element.children.find(c => c.name === propertyName);
    if (property) {
      // If this is a terminal property (has no children)
      if (property.type && !property.children) {
        return {
          sectionId,
          elementId,
          propertyId: property.id,
          propertyType: property.type,
          path: property.path
        };
      }
      
      // If this has children (like background.color)
      if (property.children && property.children.length > 0) {
        // Assume we want the first child for now (like color in background.color)
        const childProperty = property.children[0];
        return {
          sectionId,
          elementId,
          propertyId: `${property.id}.${childProperty.id}`,
          propertyType: childProperty.type,
          path: childProperty.path
        };
      }
    }
  }
  
  return null;
} 