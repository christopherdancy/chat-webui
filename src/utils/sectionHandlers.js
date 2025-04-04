// Section-specific handlers for generating options and processing commands
import { mapToInternalStructure } from './templateStructureReader';

export const sectionHandlers = {
  Header: {
    getOptions: () => ['Logo', 'Background'],
    getElementOptions: (element) => {
      switch (element) {
        case 'Logo':
          return ['Text', 'Image'];
        case 'Background':
          return ['Color'];
        default:
          return [];
      }
    }
  },
  
  Footer: {
    getOptions: () => ['Description', 'Address', 'Phone', 'Email', 'Background', 'Social Links'],
    getElementOptions: (element) => {
      switch (element) {
        case 'Social Links':
          return ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'];
        case 'Background':
          return ['Color'];
        default:
          return ['Text'];
      }
    }
  },
  
  Benefits: {
    getOptions: () => ['Title', 'Subtitle', 'Background', 'Item 1', 'Item 2', 'Item 3'],
    getElementOptions: (element) => {
      if (element.startsWith('Item')) {
        return ['Title', 'Description', 'Icon'];
      } else if (element === 'Background') {
        return ['Color'];
      }
      return ['Text'];
    },
    getIconOptions: () => ['Select Icon', 'Icon Color']
  },
  
  Features: {
    getOptions: () => ['Title', 'Subtitle', 'Background', 'Image', 'Item 1', 'Item 2', 'Item 3'],
    getElementOptions: (element) => {
      if (element.startsWith('Item')) {
        return ['Title', 'Description'];
      } else if (element === 'Background') {
        return ['Color'];
      } else if (element === 'Image') {
        return ['Upload'];
      }
      return ['Text'];
    },
    getIconOptions: () => ['Select Icon', 'Icon Color']
  },
  
  Hero: {
    getOptions: () => ['Title', 'Subtitle', 'Button', 'Background'],
    getElementOptions: (element) => {
      switch (element) {
        case 'Background':
          return ['Color'];
        case 'Button':
          return ['Text', 'Color'];
        default:
          return ['Text'];
      }
    }
  }
};

/**
 * Builds a command string based on context and option
 * The new version uses template structure metadata when available
 */
export const buildCommand = (context, option) => {
  const { section, element, property, nestedProperty, websiteConfig } = context;
  
  // Try to map using the new template structure approach
  if (websiteConfig) {
    const internalStructure = mapToInternalStructure(
      websiteConfig,
      section,
      element,
      property
    );
    
    if (internalStructure) {
      const { sectionId, elementId, propertyId, propertyType } = internalStructure;
      
      // Handle icon-specific values
      if (propertyType === 'icon') {
        console.log('Icon option:', option);
        if (option.startsWith('fa')) {
          return `${sectionId} ${elementId} ${propertyId} image ${option}`;
        }
        if (option.startsWith('#')) {
          return `${sectionId} ${elementId} ${propertyId} color ${option}`;
        }
      }
      
      // Handle social media properties
      if (propertyType === 'social' && nestedProperty) {
        // For social type, handle URL and hidden properties properly
        if (nestedProperty === 'url') {
          // Ensure URL has http/https prefix if missing
          let urlValue = option;
          if (urlValue && !urlValue.match(/^https?:\/\//i) && !urlValue.includes('://')) {
            urlValue = `https://${urlValue}`;
          }
          return `${sectionId} social.${propertyId} ${nestedProperty} ${urlValue}`;
        }
        return `${sectionId} social.${propertyId} ${nestedProperty} ${option}`;
      }
      
      // Standard property
      return `${sectionId} ${elementId} ${propertyId} ${option}`;
    }
  }
  
  // Fall back to the original implementation if template structure is not available
  
  // Handle social media links in footer with nested properties
  if (section === 'Footer' && element === 'Social Links' && property) {
    const platform = property.toLowerCase();
    
    // Handle nested property (url or hidden)
    if (nestedProperty) {
      return `footer social.${platform} ${nestedProperty} ${option}`;
    }
    
    // Direct update (less common case, but keeping for backward compatibility)
    return `footer social.${platform} url ${option}`;
  }
  
  // Handle icon color selection
  if (property === 'icon' && (option === 'Icon Color' || option === 'Select Icon')) {
    return null; // Return null to indicate this is just a selection, not a command
  }
  
  // Handle icon selection
  if (property === 'icon' && option.startsWith('fa')) {
    return `${section} ${element} icon image ${option}`;
  }
  
  // Handle direct color value for icon
  if (property === 'icon' && option.startsWith('#')) {
    return `${section} ${element} icon color ${option}`;
  }
  
  return `${section} ${element} ${property} ${option}`;
}; 