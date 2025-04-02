// Section-specific handlers for generating options and processing commands

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
        return ['Title', 'Description', 'Icon'];
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
          return ['Color', 'Image'];
        case 'Button':
          return ['Text', 'Color'];
        default:
          return ['Text'];
      }
    }
  }
};

export const buildCommand = (context, option) => {
  const { section, element, property, value } = context;
  
  if (section === 'Footer' && element === 'social') {
    return `footer social ${property.toLowerCase()} url ${option}`;
  }
  
  if (property === 'icon color') {
    return `${section} ${element} icon color ${option}`;
  }
  
  if (property === 'icon' && option.startsWith('fa')) {
    return `${section} ${element} icon image ${option}`;
  }
  
  return `${section} ${element} ${property} ${option}`;
}; 