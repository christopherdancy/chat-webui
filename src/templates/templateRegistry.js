import { generateHTML as generateBasicHTML } from './basicLanding';
import { generateHTML as generateMoonlightHTML } from './moonlightTemplate';
import basicTemplate from './basicLanding';
import moonlightTemplate from './moonlightTemplate';

/**
 * Template Registry - Central place to register and manage all templates
 * Each template entry contains:
 * - id: unique identifier for the template
 * - name: display name
 * - template: the default template configuration
 * - generateHTML: function to render the template
 * - identifyTemplate: function to identify if a config belongs to this template
 */
const templateRegistry = [
  {
    id: 'landing_business',
    name: 'Landing Page',
    template: basicTemplate,
    generateHTML: generateBasicHTML,
    identifyTemplate: (config) => {
      // Basic template has header and hero but no navigation.items
      return config.header && config.hero && !config.navigation;
    }
  },
  {
    id: 'moonlight',
    name: 'Portfolio',
    template: moonlightTemplate,
    generateHTML: generateMoonlightHTML,
    identifyTemplate: (config) => {
      // Moonlight template has navigation.items
      return config.navigation && config.navigation.items;
    }
  }
  // Additional templates can be registered here
];

/**
 * Get the entire template registry
 */
export function getTemplateRegistry() {
  return templateRegistry;
}

/**
 * Get a template by its ID
 */
export function getTemplateRegistryById(id) {
  return templateRegistry.find(template => template.id === id);
}

/**
 * Get a template registry entry based on a configuration object
 */
export function getTemplateRegistryByConfig(config) {
  // First try by ID if available
  if (config._templateId) {
    const template = getTemplateRegistryById(config._templateId);
    if (template) return template;
    
    console.warn(`Template with ID "${config._templateId}" not found, falling back to detection`);
  }
  
  // Then try by feature detection
  for (const template of templateRegistry) {
    if (template.identifyTemplate(config)) {
      console.log(`Identified template as "${template.id}" based on features`);
      return template;
    }
  }
  
  // Default to landing_business template
  console.warn('Could not identify template, using default landing_business template');
  return getTemplateRegistryById('landing_business') || templateRegistry[0];
}

/**
 * When creating a new template from scratch, set its template ID
 */
export function createNewTemplate(templateId) {
  const template = getTemplateRegistryById(templateId);
  if (!template) {
    console.error(`Template with ID "${templateId}" not found, using fallback`);
    // Use the first template as fallback
    const fallbackTemplate = templateRegistry[0];
    templateId = fallbackTemplate.id;
    console.log(`Using ${templateId} as fallback template`);
    return createNewTemplate(templateId);
  }
  
  console.log(`Creating new template with ID: ${templateId}`);
  
  // Create a deep copy of the template and assign the template ID
  const newTemplate = JSON.parse(JSON.stringify(template.template));
  
  // Ensure we copy the template metadata
  newTemplate._templateId = templateId;
  
  // Make sure we keep the _structure field
  if (template.template._structure) {
    newTemplate._structure = JSON.parse(JSON.stringify(template.template._structure));
  } else {
    console.log('Template has no structure, creating a fallback structure');
    // Define a fallback structure with basic sections based on template content
    newTemplate._structure = {
      sections: []
    };
    
    // Add sections based on what's in the template
    if (newTemplate.header) {
      newTemplate._structure.sections.push({
        id: 'header',
        name: 'Header',
        elements: [
          { 
            id: 'logo', 
            name: 'Logo',
            properties: [
              { id: 'text', name: 'Text', type: 'text' },
              { id: 'image', name: 'Image', type: 'image' }
            ]
          },
          { id: 'background', name: 'Background', type: 'color' }
        ]
      });
    }
    
    // Also update the Hero section to include Text and Image properties for Logo
    if (newTemplate.hero) {
      newTemplate._structure.sections.push({
        id: 'hero',
        name: 'Hero',
        elements: [
          { id: 'title', name: 'Title', type: 'text' },
          { id: 'subtitle', name: 'Subtitle', type: 'text' },
          { 
            id: 'button', 
            name: 'Button', 
            properties: [
              { id: 'text', name: 'Text', type: 'text' },
              { id: 'url', name: 'URL', type: 'url' },
              { id: 'color', name: 'Color', type: 'color' }
            ]
          },
          { id: 'background', name: 'Background', type: 'color' }
        ]
      });
    }
    
    if (newTemplate.benefits) {
      newTemplate._structure.sections.push({
        id: 'benefits',
        name: 'Benefits',
        elements: [
          { id: 'title', name: 'Title', type: 'text' },
          { id: 'subtitle', name: 'Subtitle', type: 'text' },
          { id: 'background', name: 'Background', type: 'color' },
          { 
            id: 'items', 
            name: 'Items', 
            type: 'array',
            items: [
              { id: 'title', name: 'Title', type: 'text' },
              { id: 'description', name: 'Description', type: 'text' },
              { id: 'icon', name: 'Icon', type: 'icon' }
            ]
          }
        ]
      });
    }
    
    if (newTemplate.features) {
      newTemplate._structure.sections.push({
        id: 'features',
        name: 'Features',
        elements: [
          { id: 'title', name: 'Title', type: 'text' },
          { id: 'subtitle', name: 'Subtitle', type: 'text' },
          { id: 'background', name: 'Background', type: 'color' },
          { id: 'image', name: 'Image', type: 'image' },
          { 
            id: 'items', 
            name: 'Items', 
            type: 'array',
            items: [
              { id: 'title', name: 'Title', type: 'text' },
              { id: 'description', name: 'Description', type: 'text' },
              { id: 'icon', name: 'Icon', type: 'icon' }
            ]
          }
        ]
      });
    }
    
    if (newTemplate.cta) {
      newTemplate._structure.sections.push({
        id: 'cta',
        name: 'Call to Action',
        elements: [
          { id: 'title', name: 'Title', type: 'text' },
          { id: 'subtitle', name: 'Subtitle', type: 'text' },
          { id: 'buttonText', name: 'Button Text', type: 'text' },
          { id: 'buttonUrl', name: 'Button URL', type: 'url' },
          { id: 'background', name: 'Background', type: 'color' }
        ]
      });
    }
    
    if (newTemplate.footer) {
      newTemplate._structure.sections.push({
        id: 'footer',
        name: 'Footer',
        elements: [
          { id: 'description', name: 'Description', type: 'text' },
          { id: 'background', name: 'Background', type: 'color' },
          { id: 'copyright', name: 'Copyright', type: 'text' },
          { 
            id: 'socialLinks',
            name: 'Social Links',
            type: 'array',
            items: [
              { id: 'facebook', name: 'Facebook', type: 'url' },
              { id: 'twitter', name: 'Twitter', type: 'url' },
              { id: 'instagram', name: 'Instagram', type: 'url' },
              { id: 'linkedin', name: 'LinkedIn', type: 'url' }
            ]
          }
        ]
      });
    }
  }
  
  return newTemplate;
} 