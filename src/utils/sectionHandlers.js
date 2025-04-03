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
    },
    getSocialOptions: (platform) => ['URL', 'Hide', 'Show']
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
  const { section, element, property, websiteConfig } = context;
  
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
      
      // Handle social media links
      if (propertyType === 'social') {
        if (option === 'URL' || option === 'Url') {
          return null; // Return null to indicate we need more input
        }
        if (option === 'Hide' || option === 'Show') {
          return `footer social ${propertyId} ${option.toLowerCase()}`;
        }
        // URL value
        return `footer social ${propertyId} url ${option}`;
      }
      
      // Handle icon-specific values
      if (propertyType === 'icon') {
        if (option.startsWith('fa')) {
          return `${sectionId} ${elementId} ${propertyId} image ${option}`;
        }
        if (option.startsWith('#')) {
          return `${sectionId} ${elementId} ${propertyId} color ${option}`;
        }
      }
      
      // Standard property
      return `${sectionId} ${elementId} ${propertyId} ${option}`;
    }
  }
  
  // Fall back to the original implementation if template structure is not available
  
  // Handle social media links in footer
  if (section === 'Footer' && element === 'social') {
    const platform = property.toLowerCase();
    if (option === 'URL' || option === 'Url') {
      return null; // Return null to indicate we need to prompt for URL value
    }
    if (option === 'Hide' || option === 'Show') {
      return `footer social ${platform} ${option.toLowerCase()}`;
    }
    // If we get here, it means we're setting the URL value
    return `footer social ${platform} url ${option}`;
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