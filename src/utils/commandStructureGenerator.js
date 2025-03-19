/**
 * Generates a command structure based on the website configuration
 * @param {Object} websiteConfig - The current website configuration
 * @returns {Object} Command structure with sections, elements, properties
 */
export const generateCommandStructure = (websiteConfig) => {
  const structure = {
    sections: [],
    elements: {},
    properties: {},
    subsections: {}, // New field to store subsections
    subsectionElements: {}, // New field to store elements for each subsection
    aliases: {}
  };

  // Extract sections from the config
  if (websiteConfig) {
    // Add standard sections
    const standardSections = ['global', 'header', 'hero', 'benefits', 'features', 'cta', 'footer'];
    
    // Filter to only include sections that exist in the config
    structure.sections = standardSections.filter(section => websiteConfig[section]);

    // For each section, extract elements and their properties
    structure.sections.forEach(section => {
      const sectionConfig = websiteConfig[section];
      structure.elements[section] = [];
      structure.subsections[section] = []; // Initialize subsections array
      
      // Extract elements based on section type
      switch (section) {
        // case 'global':
        //   structure.elements[section] = ['primary', 'secondaryColor'];
        //   structure.properties[`${section}.primary`] = ['color'];
        //   structure.properties[`${section}.secondaryColor`] = ['color'];
        //   structure.properties[`${section}.textColor`] = ['color'];
        //   break;
        
        case 'header':
            structure.elements[section] = ['logo', 'background'];
            structure.properties[`${section}.logo`] = ['text', 'image'];
            structure.properties[`${section}.background`] = ['color'];
            break;
            
        case 'hero':
            structure.elements[section] = ['title', 'subtitle', 'button', 'background'];
            structure.properties[`${section}.title`] = ['text'];
            structure.properties[`${section}.subtitle`] = ['text'];
            structure.properties[`${section}.button`] = ['text', 'color', 'url'];
            structure.properties[`${section}.background`] = ['color'];
            break;

        case 'benefits':
          // Define main section elements
          structure.elements[section] = ['title', 'subtitle', 'background'];
          structure.properties[`${section}.title`] = ['text'];
          structure.properties[`${section}.subtitle`] = ['text'];
          structure.properties[`${section}.background`] = ['color'];
          
          // Define subsections (items)
          structure.subsections[section] = ['item1', 'item2', 'item3'];
          
          // Define elements for each subsection
          structure.subsectionElements[`${section}.item1`] = ['title', 'description', 'icon', 'background'];
          structure.subsectionElements[`${section}.item2`] = ['title', 'description', 'icon', 'background'];
          structure.subsectionElements[`${section}.item3`] = ['title', 'description', 'icon', 'background'];
          
          // Define properties for subsection elements
          structure.properties[`${section}.item1.title`] = ['text'];
          structure.properties[`${section}.item1.description`] = ['text'];
          structure.properties[`${section}.item2.title`] = ['text'];
          structure.properties[`${section}.item2.description`] = ['text'];
          structure.properties[`${section}.item3.title`] = ['text'];
          structure.properties[`${section}.item3.description`] = ['text'];
          structure.properties[`${section}.item1.icon`] = ['image', 'color'];
          structure.properties[`${section}.item2.icon`] = ['image', 'color'];
          structure.properties[`${section}.item3.icon`] = ['image', 'color'];
          structure.properties[`${section}.item1.background`] = ['color'];
          structure.properties[`${section}.item2.background`] = ['color'];
          structure.properties[`${section}.item3.background`] = ['color'];
          break;
          
        case 'features':
          structure.elements[section] = ['title', 'subtitle', 'background', 'image'];
          structure.properties[`${section}.title`] = ['text'];
          structure.properties[`${section}.subtitle`] = ['text'];
          structure.properties[`${section}.background`] = ['color'];
          structure.properties[`${section}.image`] = ['upload'];
          
          // Define subsections (items)
          structure.subsections[section] = ['item1', 'item2', 'item3'];
          
          // Define elements for each subsection
          structure.subsectionElements[`${section}.item1`] = ['title', 'description'];
          structure.subsectionElements[`${section}.item2`] = ['title', 'description'];
          structure.subsectionElements[`${section}.item3`] = ['title', 'description'];
          
          // Define properties for subsection elements
          structure.properties[`${section}.item1.title`] = ['text'];
          structure.properties[`${section}.item1.description`] = ['text'];
          structure.properties[`${section}.item2.title`] = ['text'];
          structure.properties[`${section}.item2.description`] = ['text'];
          structure.properties[`${section}.item3.title`] = ['text'];
          structure.properties[`${section}.item3.description`] = ['text'];
          structure.properties[`${section}.item1.icon`] = ['image', 'color'];
          structure.properties[`${section}.item2.icon`] = ['image', 'color'];
          structure.properties[`${section}.item3.icon`] = ['image', 'color'];
          break;
          
        case 'cta':
          structure.elements[section] = ['title', 'subtitle', 'button', 'background'];
          structure.properties[`${section}.title`] = ['text'];
          structure.properties[`${section}.subtitle`] = ['text'];
          structure.properties[`${section}.button`] = ['text', 'color', 'url'];
          structure.properties[`${section}.background`] = ['color'];
          break;
          
        case 'footer':
          structure.elements[section] = ['description', 'address', 'phone', 'email', 'background'];
          structure.properties[`${section}.description`] = ['text'];
          structure.properties[`${section}.address`] = ['text'];
          structure.properties[`${section}.phone`] = ['text'];
          structure.properties[`${section}.email`] = ['text'];
          structure.properties[`${section}.background`] = ['color'];

          // Define subsections for features (similar to benefits)
          structure.subsections[section] = ['social'];

          // Define elements for each subsection
          structure.subsectionElements[`${section}.social`] = ['facebook', 'twitter', 'instagram', 'linkedin'];

          // Define properties for subsection elements
          structure.properties[`${section}.social.facebook`] = ['url', 'hide', 'show'];
          structure.properties[`${section}.social.twitter`] = ['url', 'hide', 'show'];
          structure.properties[`${section}.social.instagram`] = ['url', 'hide', 'show'];
          structure.properties[`${section}.social.linkedin`] = ['url', 'hide', 'show'];
          break;
          
        default:
          // For any custom sections, try to extract properties dynamically
          if (sectionConfig) {
            Object.keys(sectionConfig).forEach(key => {
              if (typeof sectionConfig[key] === 'object' && !Array.isArray(sectionConfig[key])) {
                // This is likely an element
                structure.elements[section].push(key);
                structure.properties[`${section}.${key}`] = ['text', 'color'];
              } else if (typeof sectionConfig[key] === 'string') {
                // This is likely a property
                if (key.toLowerCase().includes('color')) {
                  structure.elements[section].push(key);
                  structure.properties[`${section}.${key}`] = ['color'];
                } else if (key.toLowerCase().includes('text') || key.toLowerCase().includes('title')) {
                  structure.elements[section].push(key);
                  structure.properties[`${section}.${key}`] = ['text'];
                }
              }
            });
          }
          break;
      }
    });
  }

  return structure;
}; 