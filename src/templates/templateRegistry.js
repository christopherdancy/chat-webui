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
    id: 'portfolio_moonlight',
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
  }
  
  // Then try by feature detection
  for (const template of templateRegistry) {
    if (template.identifyTemplate(config)) {
      return template;
    }
  }
  
  // Default to basic template
  return getTemplateRegistryById('basic');
}

/**
 * When creating a new template from scratch, set its template ID
 */
export function createNewTemplate(templateId) {
  const template = getTemplateRegistryById(templateId);
  if (!template) {
    throw new Error(`Template with ID "${templateId}" not found`);
  }
  
  // Create a deep copy of the template and assign the template ID
  const newTemplate = JSON.parse(JSON.stringify(template.template));
  newTemplate._templateId = templateId;
  
  return newTemplate;
} 