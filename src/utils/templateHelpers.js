/**
 * Deep merge utility for combining configuration objects
 */
export function deepMerge(target, source) {
  const result = {...target};
  
  for (const key in source) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      // For objects, merge recursively (but only if target has this property as an object)
      if (target[key] !== null && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        // Otherwise just copy
        result[key] = source[key];
      }
    } else {
      // For primitives and arrays, replace with user value
      result[key] = source[key];
    }
  }
  
  return result;
}

/**
 * Helper for safely mapping array items
 */
export function safeMapItems(items, mapFn) {
  return Array.isArray(items) ? items.map(mapFn).join('') : '';
}

/**
 * Initialize a template's default values from its structure definition
 */
export function initializeDefaultsFromStructure(template) {
  // Initialize global properties
  template.global = {};
  template._structure.global.children.forEach(prop => {
    if (prop.default !== undefined) {
      template.global[prop.id] = prop.default;
    }
  });
  
  // Initialize all sections
  template._structure.sections.forEach(section => {
    template[section.id] = {}; // Create the section
    
    // Process direct children of the section
    section.children.forEach(child => {
      if (child.default !== undefined) {
        // Direct property with default
        template[section.id][child.id] = child.default;
      } 
      else if (child.type === 'array' && child.default) {
        // Array property
        template[section.id][child.id] = [...child.default];
      }
      else if (child.children) {
        // Nested object
        template[section.id][child.id] = {};
        
        child.children.forEach(grandchild => {
          if (grandchild.default !== undefined) {
            template[section.id][child.id][grandchild.id] = grandchild.default;
          }
          else if (grandchild.children) {
            // Handle deeper nesting if needed
            template[section.id][child.id][grandchild.id] = {};
            
            grandchild.children.forEach(ggchild => {
              if (ggchild.default !== undefined) {
                template[section.id][child.id][grandchild.id][ggchild.id] = ggchild.default;
              }
            });
          }
        });
      }
    });
  });
  
  return template; // Return the template with initialized values
}