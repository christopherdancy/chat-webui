import { deepMerge, safeMapItems, initializeDefaultsFromStructure } from '../utils/templateHelpers';

// Default configuration for the Basic Business Website template
const basicTemplate = {
  // Template metadata
  _templateId: 'landing_business',
  _templateVersion: '1.0.0',
  
  // Template structure metadata - defines editable sections and properties
  _structure: {
    global: {
      id: "global",
      name: "Global Settings",
      children: [
        {
          id: "primaryColor",
          name: "Primary Color",
          type: "color",
          path: "global.primaryColor",
          default: "#4a90e2"
        },
        {
          id: "secondaryColor",
          name: "Secondary Color",
          type: "color",
          path: "global.secondaryColor",
          default: "#f8f9fa"
        },
        {
          id: "textColor",
          name: "Text Color",
          type: "color",
          path: "global.textColor",
          default: "#333333"
        },
        {
          id: "accentColor",
          name: "Accent Color",
          type: "color",
          path: "global.accentColor",
          default: "#5e72e4"
        },
        {
          id: "fontFamily",
          name: "Font Family",
          type: "text",
          path: "global.fontFamily",
          default: "'Open Sans', sans-serif"
        }
      ]
    },
    sections: [
      {
        id: 'header',
        name: 'Header',
        children: [
          {
            id: 'logo',
            name: 'Logo',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'header.logo.text',
                default: 'YourBrand'
              },
              {
                id: 'image',
                name: 'Image',
                type: 'image',
                editable: true,
                path: 'header.logo.image',
                default: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
              }
            ]
          },
          {
            id: 'background',
            name: 'Background',
            children: [
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'header.background.color',
                default: '#4a90e2',
                note: 'Uses global.primaryColor by default'
              }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'header.textColor',
            default: '#ffffff'
          },
          {
            id: 'menuItems',
            name: 'Menu Items',
            type: 'array',
            editable: false,
            path: 'header.menuItems',
            itemTemplate: {
              text: 'Menu Item',
              url: '#'
            },
            default: [
              { text: 'Benefits', url: '#benefits' },
              { text: 'Features', url: '#features' },
              { text: 'Contact', url: '#footer' }
            ]
          }
        ]
      },
      {
        id: 'hero',
        name: 'Hero',
        children: [
          {
            id: 'title',
            name: 'Title',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'hero.title.text',
                default: 'Transform Your Business Today'
              }
            ]
          },
          {
            id: 'subtitle',
            name: 'Subtitle',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'hero.subtitle.text',
                default: 'We help companies achieve their goals with innovative solutions and strategic planning'
              }
            ]
          },
          {
            id: 'background',
            name: 'Background',
            children: [
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'hero.background.color',
                default: '#f8f9fa',
                note: 'Uses global.secondaryColor by default'
              }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'hero.textColor',
            default: '#333333',
            note: 'Uses global.textColor by default'
          },
          {
            id: 'button',
            name: 'Button',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'hero.button.text',
                default: 'Get Started'
              },
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'hero.button.color',
                default: '#4a90e2',
                note: 'Uses global.primaryColor by default'
              },
              {
                id: 'textColor',
                name: 'Text Color',
                type: 'color',
                editable: true,
                path: 'hero.button.textColor',
                default: '#ffffff'
              },
              {
                id: 'url',
                name: 'URL',
                type: 'url',
                editable: true,
                path: 'hero.button.url',
                default: '#'
              }
            ]
          }
        ]
      },
      {
        id: 'benefits',
        name: 'Benefits',
        children: [
          {
            id: 'title',
            name: 'Title',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'benefits.title.text',
                default: 'Why Choose Us'
              }
            ]
          },
          {
            id: 'subtitle',
            name: 'Subtitle',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'benefits.subtitle.text',
                default: 'What makes us different'
              }
            ]
          },
          {
            id: 'background',
            name: 'Background',
            children: [
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'benefits.background.color',
                default: '#ffffff'
              }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'benefits.textColor',
            default: '#333333',
            note: 'Uses global.textColor by default'
          },
          {
            id: 'cardBackgroundColor',
            name: 'Items Background Color',
            type: 'color',
            editable: true,
            path: 'benefits.cardBackgroundColor',
            default: '#ffffff'
          },
          {
            id: 'items',
            name: 'Items',
            type: 'array',
            editable: true,
            path: 'benefits.items',
            itemStructure: {
              children: [
                {
                  id: 'title',
                  name: 'Title',
                  type: 'text',
                  editable: true,
                  pathTemplate: 'benefits.items[INDEX].title'
                },
                {
                  id: 'description',
                  name: 'Description',
                  type: 'text',
                  editable: true,
                  pathTemplate: 'benefits.items[INDEX].description'
                },
                {
                  id: 'icon',
                  name: 'Icon',
                  type: 'icon',
                  editable: true,
                  pathTemplate: 'benefits.items[INDEX].icon'
                },
                {
                  id: 'iconColor',
                  name: 'Icon Color',
                  type: 'color',
                  editable: true,
                  pathTemplate: 'benefits.items[INDEX].iconColor',
                  default: '#4a90e2',
                  note: 'Uses global.primaryColor by default'
                },
                {
                  id: 'background',
                  name: 'Background',
                  children: [
                    {
                      id: 'color',
                      name: 'Color',
                      type: 'color',
                      editable: true,
                      pathTemplate: 'benefits.items[INDEX].background.color',
                      default: null,
                      note: 'Individual card background color (null means use global)'
                    }
                  ]
                }
              ]
            },
            default: [
              {
                icon: 'fas fa-check',
                title: 'Premium Quality',
                description: 'Our solutions are built with the highest standards in mind.',
                iconColor: '#4a90e2',
                background: { color: null }
              },
              {
                icon: 'fas fa-chart-line',
                title: 'Innovative Approach',
                description: 'We use cutting-edge technologies to solve complex problems.',
                iconColor: '#4a90e2',
                background: { color: null }
              },
              {
                icon: 'fas fa-globe',
                title: 'Global Reach',
                description: 'Our services are available worldwide with local support.',
                iconColor: '#4a90e2',
                background: { color: null }
              }
            ]
          }
        ]
      },
      {
        id: 'features',
        name: 'Features',
        children: [
          {
            id: 'title',
            name: 'Title',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'features.title.text',
                default: 'Our Features'
              }
            ]
          },
          {
            id: 'subtitle',
            name: 'Subtitle',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'features.subtitle.text',
                default: 'What we offer'
              }
            ]
          },
          {
            id: 'background',
            name: 'Background',
            children: [
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'features.background.color',
                default: '#f8f9fa'
              }
            ]
          },
          {
            id: 'image',
            name: 'Image',
            children: [
              {
                id: 'upload',
                name: 'Upload',
                type: 'image',
                editable: true,
                path: 'features.image.upload',
                default: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
              }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'features.textColor',
          },
          {
            id: 'items',
            name: 'Items',
            type: 'array',
            editable: true,
            path: 'features.items',
            itemStructure: {
              children: [
                {
                  id: 'title',
                  name: 'Title',
                  type: 'text',
                  editable: true,
                  pathTemplate: 'features.items[INDEX].title'
                },
                {
                  id: 'description',
                  name: 'Description',
                  type: 'text',
                  editable: true,
                  pathTemplate: 'features.items[INDEX].description'
                },
              ]
            },
            default: [
              {
                title: 'Customized Solutions',
                description: 'Tailored specifically to your business needs.',
              },
              {
                title: 'Modern Technology',
                description: 'Using the latest tools and frameworks.',
              },
              {
                title: 'Dedicated Support',
                description: 'Our team is always ready to help you succeed.',
              }
            ]
          }
        ]
      },
      {
        id: 'cta',
        name: 'CTA',
        children: [
          { 
            id: 'title', 
            name: 'Title',
            children: [
              { id: 'text', name: 'Text', type: 'text', editable: true, default: 'Ready to get started?' }
            ]
          },
          {
            id: 'subtitle',
            name: 'Subtitle',
            children: [
              { id: 'text', name: 'Text', type: 'text', editable: true, default: 'Contact us today to transform your business' }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'cta.textColor',
            default: '#ffffff'
          },
          { 
            id: 'button', 
            name: 'Button',
            children: [
              { id: 'text', name: 'Text', type: 'text', editable: true, default: 'Call to Action' },
              { id: 'color', name: 'Color', type: 'color', editable: true, default: '#007bff' },
              { id: 'url', name: 'URL', type: 'url', editable: true, default: '#' },
              {
                id: 'textColor',
                name: 'Text Color',
                type: 'color',
                editable: true,
                path: 'cta.button.textColor',
                default: '#ffffff'
              },
            ]
          },
          { 
            id: 'background', 
            name: 'Background',
            children: [
              { id: 'color', name: 'Color', type: 'color', editable: true }
            ]
          }
        ]
      },
      {
        id: 'footer',
        name: 'Footer',
        children: [
          {
            id: 'description',
            name: 'Description',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'footer.description.text',
                default: 'About Us'
              }
            ]
          },
          {
            id: 'background',
            name: 'Background',
            children: [
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'footer.background.color',
                default: '#2d3748'
              }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'footer.textColor',
            default: '#ffffff'
          },
          {
            id: 'social',
            name: 'Socials',
            children: [
              {
                id: 'facebook',
                name: 'Facebook',
                children: [
                  {
                    id: 'url',
                    name: 'URL',
                    type: 'url',
                    editable: true,
                    path: 'footer.social.facebook.url',
                    default: 'https://www.facebook.com'
                  },
                  {
                    id: 'visible',
                    name: 'Show/Hide',
                    type: 'boolean',
                    editable: true,
                    path: 'footer.social.facebook.visible',
                    default: true
                  }
                ]
              },
              {
                id: 'twitter',
                name: 'Twitter',
                children: [
                  {
                    id: 'url',
                    name: 'URL',
                    type: 'url',
                    editable: true,
                    path: 'footer.social.twitter.url',
                    default: 'https://www.twitter.com'
                  },
                  {
                    id: 'visible',
                    name: 'Show/Hide',
                    type: 'boolean',
                    editable: true,
                    path: 'footer.social.twitter.visible',
                    default: true
                  }
                ]
              },
              {
                id: 'instagram',
                name: 'Instagram',
                children: [
                  {
                    id: 'url',
                    name: 'URL',
                    type: 'url',
                    editable: true,
                    path: 'footer.social.instagram.url',
                    default: 'https://www.instagram.com'
                  },
                  {
                    id: 'visible',
                    name: 'Show/Hide',
                    type: 'boolean',
                    editable: true,
                    path: 'footer.social.instagram.visible',
                    default: true
                  }
                ]
              },
              {
                id: 'linkedin',
                name: 'LinkedIn',
                children: [
                  {
                    id: 'url',
                    name: 'URL',
                    type: 'url',
                    editable: true,
                    path: 'footer.social.linkedin.url',
                    default: 'https://www.linkedin.com'
                  },
                  {
                    id: 'visible',
                    name: 'Show/Hide',
                    type: 'boolean',
                    editable: true,
                    path: 'footer.social.linkedin.visible',
                    default: true
                  }
                ]
              }
            ]
          },
          {
            id: 'address',
            name: 'Address',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'footer.address.text',
                default: '123 Business Street, New York, NY'
              }
            ]
          },
          {
            id: 'email',
            name: 'Email',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'footer.email.text',
                default: 'info@yourbrand.com'
              }
            ]
          },
          {
            id: 'phone',
            name: 'Phone',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'footer.phone.text',
                default: '(123) 456-7890'
              }
            ]
          }
        ]
      }
    ]
  },
  

};

// Initialize defaults (without circular dependency)
const initializedTemplate = initializeDefaultsFromStructure({...basicTemplate});
// Copy all properties back to basicTemplate
Object.assign(basicTemplate, initializedTemplate);

// Function to generate HTML from the template configuration
export function generateHTML(config, showGuides = false) {
  // Simple deep merge of user config with defaults
  const processedConfig = config ? deepMerge(basicTemplate, config) : {...basicTemplate};
  
  // Add explicit safety check for common arrays
  const headerMenuItems = Array.isArray(processedConfig.header?.menuItems) 
    ? processedConfig.header.menuItems 
    : [];
    
  const benefitsItems = Array.isArray(processedConfig.benefits?.items) 
    ? processedConfig.benefits.items 
    : [];
    
  const featuresItems = Array.isArray(processedConfig.features?.items) 
    ? processedConfig.features.items 
    : [];
    
  const footerLinks = Array.isArray(processedConfig.footer?.links) 
    ? processedConfig.footer.links 
    : [];

  // Enhanced section guide styles with element-level guides
  const sectionGuideStyles = showGuides ? `
    .section-guide {
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 5px 10px;
      font-size: 12px;
      z-index: 1000;
      border-bottom-right-radius: 4px;
      pointer-events: none;
    }
    
    .section-container {
      position: relative;
      border: ${showGuides ? '2px dashed rgba(255, 0, 0, 0.3)' : 'none'};
    }
    
    .element-guide {
      position: absolute;
      top: -20px;
      right: 0;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 3px 6px;
      font-size: 10px;
      z-index: 1000;
      border-radius: 4px;
      pointer-events: none;
    }
    
    .element-container {
      position: relative;
      border: ${showGuides ? '1px dotted rgba(0, 100, 255, 0.3)' : 'none'};
      margin-top: 20px;
      padding-top: 2px;
    }
    
    /* Adjust first element in a container to avoid extra spacing */
    .section-container > .element-container:first-child,
    .row > .col-md-4 > .element-container:first-child,
    .feature-card > .element-container:first-child {
      margin-top: 25px;
    }
    
    /* Special handling for inline elements */
    .inline-element-container {
      position: relative;
      display: inline-block;
      border: ${showGuides ? '1px dotted rgba(0, 100, 255, 0.3)' : 'none'};
      margin-top: 20px;
      padding: 2px;
    }
  ` : '';

  // Function to wrap sections with guide labels
  const wrapWithGuide = (sectionName, content) => {
    if (!showGuides) return content;
    return `
      <div class="section-container">
        <div class="section-guide">${sectionName}</div>
        ${content}
      </div>
    `;
  };

  // Function to wrap elements with guide labels
  const wrapElementWithGuide = (elementName, content) => {
    if (!showGuides) return content;
    return `
      <div class="element-container">
        <div class="element-guide">${elementName}</div>
        ${content}
      </div>
    `;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${processedConfig.header.title || 'Modern Business Website'}</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Add Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary-color: ${processedConfig.global.primaryColor};
      --secondary-color: ${processedConfig.global.secondaryColor};
      --text-color: ${processedConfig.global.textColor};
      --accent-color: ${processedConfig.global.accentColor};
    }
    
    body {
      font-family: ${processedConfig.global.fontFamily};
      margin: 0;
      padding: 0;
      color: ${processedConfig.global.textColor};
    }
    
    /* Header Styles */
    .navbar {
      background-color: ${processedConfig.header.background?.color || processedConfig.global.primaryColor};
      padding: 1rem 2rem;
    }
    
    .navbar-brand {
      color: ${processedConfig.header.textColor};
      font-weight: 600;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
    }
    
    .logo-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
    
    .logo-text {
      color: ${processedConfig.header.textColor};
      margin: 0;
    }
    
    .navbar-nav .nav-link {
      color: ${processedConfig.header.textColor} !important;
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    
    .navbar-nav .nav-link:hover {
      opacity: 1;
    }
    
    /* Hero Section */
    .hero {
      background-size: cover;
      background-position: center;
      padding: 5rem 0;
      position: relative;
      overflow: hidden;
      background-color: ${processedConfig.hero.background?.color || processedConfig.global.secondaryColor};
    }
    
    .hero-content {
      text-align: left;
      max-width: 600px;
      position: relative;
      z-index: 2;
    }
    
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: ${processedConfig.hero.textColor || '#ffffff'};
      line-height: 1.2;
    }
    
    .hero p {
      font-size: 1.25rem;
      margin-bottom: 2.5rem;
      color: ${processedConfig.hero.textColor || '#ffffff'};
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .hero .btn {
      padding: 0.75rem 2rem;
      font-weight: 600;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 0.9rem;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
      transition: all 0.3s;
      background-color: ${processedConfig.hero.button?.color || processedConfig.global.primaryColor};
      color: ${processedConfig.hero.button?.textColor || '#ffffff'};
      border: none;
    }
    
    .hero .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
      opacity: 0.9;
    }
    
    .hero-shape {
      position: absolute;
      right: -150px;
      top: -150px;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      z-index: 1;
    }
    
    .hero-shape-2 {
      position: absolute;
      right: 10%;
      bottom: -100px;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.05);
      z-index: 1;
    }
    
    /* Benefits Section */
    .benefits {
      padding: 4rem 0;
      background-color: ${processedConfig.benefits.background?.color || processedConfig.global.secondaryColor};
    }
    
    .benefits .section-title {
      text-align: center;
      margin-bottom: 2rem;
      color: ${processedConfig.benefits.textColor || processedConfig.global.textColor};
    }

    .benefits .section-title h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: ${processedConfig.benefits.textColor || processedConfig.global.textColor};
    } 
    
    .benefits .section-title p {
      margin-left: auto;
      margin-right: auto;
      color: ${processedConfig.benefits.textColor || processedConfig.global.textColor};
    }
    
    .benefits .icon {
      height: 70px;
      width: 70px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      margin-left: auto;
      margin-right: auto;
    }
    
    .benefits .icon i {
      font-size: 1.5rem;
    }
    
    .benefits .feature-card {
      padding: 2rem;
      border-radius: 0.5rem;
      transition: transform 0.3s, box-shadow 0.3s;
      height: 100%;
      text-align: center;
    }
    
    .benefits .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    
    /* Features Section */
    .features {
      padding: 5rem 0;
      background-color: ${processedConfig.features.background?.color || processedConfig.global.secondaryColor};
    }

    .features .section-title {
      text-align: left;
      margin-bottom: 3rem;
    }
    
    .features .section-title h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: ${processedConfig.features.textColor || processedConfig.global.textColor};
    }
    
    .features .section-title p {
      font-size: 1.2rem;
      color: ${processedConfig.features.textColor || processedConfig.global.textColor};
      opacity: 0.8;
    }
    
    .features .feature-image {
      width: 100%;
      height: auto;
      max-height: 400px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .features .feature-item {
      display: flex;
      margin-bottom: 2rem;
      align-items: flex-start;
    }
    
    .features .feature-icon {
      margin-right: 1.5rem;
      min-width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .features .feature-icon i {
      font-size: 2.5rem;
      color: ${processedConfig.global.primaryColor};
    }
    
    .features .feature-content h4 {
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: ${processedConfig.features.textColor || processedConfig.global.textColor};
    }
    
    .features .feature-content p {
      color: ${processedConfig.features.textColor || processedConfig.global.textColor};
      opacity: 0.8;
      margin-bottom: 0;
    }
    
    /* Call to Action */
    .cta {
      background-color: ${processedConfig.cta.background?.color || processedConfig.global.primaryColor};
      color: ${processedConfig.cta.textColor || processedConfig.global.textColor};
      padding: 3rem 0;
      text-align: center;
    }
    
    .cta .section-title {
      margin-bottom: 2rem;
    }
    
    .cta .section-title h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: ${processedConfig.cta.textColor || processedConfig.global.textColor};
    }
    
    .cta .section-title p {
      font-size: 1.2rem;
      color: ${processedConfig.cta.textColor || processedConfig.global.textColor};
      opacity: 0.9;
      margin-bottom: 2rem;
    }
    
    .cta .btn {
      padding: 0.75rem 2rem;
      font-weight: 600;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 0.9rem;
      background-color: ${processedConfig.cta.button?.color || processedConfig.global.primaryColor};
      color: ${processedConfig.cta.button?.textColor || processedConfig.global.primaryColor};
      border: none;
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
      transition: all 0.3s;
    }
    
    .cta .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
      opacity: 0.9;
    }
    
    /* Footer */
    #footer {
      background-color: ${processedConfig.footer.background?.color || processedConfig.global.primaryColor};
      color: ${processedConfig.footer.textColor || processedConfig.global.textColor};
      padding: 4rem 0 2rem;
    }
    
    #footer h5 {
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: ${processedConfig.footer.textColor || processedConfig.global.textColor};
    }
    
    #footer p {
      color: ${processedConfig.footer.textColor || processedConfig.global.textColor};
      opacity: 0.8;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .footer-links li {
      margin-bottom: 0.75rem;
    }
    
    .footer-links a {
      color: ${processedConfig.footer.textColor || processedConfig.global.textColor};
      opacity: 0.8;
      text-decoration: none;
      transition: opacity 0.3s;
    }
    
    .footer-links a:hover {
      opacity: 1;
      text-decoration: underline;
    }
    
    .social-links {
      margin-top: 1.5rem;
    }
    
    .social-links a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      color: ${processedConfig.footer.textColor || processedConfig.global.textColor};
      margin-right: 0.75rem;
      transition: all 0.3s;
    }
    
    .social-links a:hover {
      background-color: ${processedConfig.global.primaryColor};
      transform: translateY(-3px);
    }
    
    .copyright {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
    }
    
    .copyright p {
      margin-bottom: 0;
      opacity: 0.7;
    }
    
    /* Utility Classes */
    .btn-primary {
      background-color: ${processedConfig.global.primaryColor};
      border-color: ${processedConfig.global.primaryColor};
    }
    
    .section-title h2 {
      color: ${processedConfig.global.textColor};
    }
    
    .section-title p {
      color: ${processedConfig.global.textColor};
      opacity: 0.8;
    }
    
    ${sectionGuideStyles}
  </style>
</head>
<body>
  <!-- Header -->
  ${wrapWithGuide('Header', `
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      ${wrapElementWithGuide('Logo', `
        <a class="navbar-brand" href="#">
          ${processedConfig.header.logo?.image ? 
            `<img src="${processedConfig.header.logo?.image}" alt="Logo" class="logo-image">` : ''}
          <span class="logo-text">${processedConfig.header.logo?.text || processedConfig.header.logo}</span>
        </a>
      `)}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          ${safeMapItems(headerMenuItems, (item, index) => `
              <li class="nav-item">
                <a class="nav-link" href="${item.url}">${item.text}</a>
              </li>
          `)}
        </ul>
      </div>
    </div>
  </nav>
  `)}

  <!-- Hero Section -->
  ${wrapWithGuide('Hero', `
  <section class="hero">
    <div class="hero-shape"></div>
    <div class="hero-shape-2"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="hero-content">
            ${wrapElementWithGuide('Title', `
              <h1>${processedConfig.hero.title?.text}</h1>
            `)}
            ${wrapElementWithGuide('Subtitle', `
              <p>${processedConfig.hero.subtitle?.text}</p>
            `)}
            ${wrapElementWithGuide('Button', `
              <a href="${processedConfig.hero.button?.url}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">${processedConfig.hero.button?.text}</a>
            `)}
          </div>
        </div>
      </div>
    </div>
  </section>
  `)}

  <!-- Benefits Section -->
  ${wrapWithGuide('Benefits', `
  <section id="benefits" class="benefits">
    <div class="container">
      <div class="section-title">
        ${wrapElementWithGuide('Title', `
          <h2>${processedConfig.benefits.title?.text}</h2>
        `)}
        ${wrapElementWithGuide('Subtitle', `
          <p>${processedConfig.benefits.subtitle?.text}</p>
        `)}
      </div>
      <div class="row">
        ${safeMapItems(benefitsItems, (item, index) => `
          <div class="col-md-4 mb-4">
            ${wrapElementWithGuide(`Item ${index + 1}`, `
              <div class="feature-card shadow-sm" style="background-color: ${item.background?.color || processedConfig.benefits.cardBackgroundColor};">
                ${wrapElementWithGuide(`Icon`, `
                  <div class="icon" style="background-color: ${item.iconColor}20; color: ${item.iconColor};">
                    <i class="${item.icon}"></i>
                  </div>
                `)}
                ${wrapElementWithGuide(`Title`, `
                  <h4 style="color: ${processedConfig.benefits.textColor};">${item.title}</h4>
                `)}
                ${wrapElementWithGuide(`Description`, `
                  <p style="color: ${processedConfig.benefits.textColor};">${item.description}</p>
                `)}
              </div>
            `)}
          </div>
        `)}
      </div>
    </div>
  </section>
  `)}

  <!-- Features Section -->
  ${wrapWithGuide('Features', `
  <section id="features" class="features">
    <div class="container">
      <div class="section-title">
        ${wrapElementWithGuide('Title', `
          <h2>${processedConfig.features.title?.text}</h2>
        `)}
        ${wrapElementWithGuide('Subtitle', `
          <p>${processedConfig.features.subtitle?.text}</p>
        `)}
      </div>
      
      <div class="row">
        <div class="col-lg-6 mb-4 mb-lg-0">
          ${wrapElementWithGuide('Image', `
            <img src="${processedConfig.features.image?.upload}" alt="Features" class="img-fluid feature-image">
          `)}
        </div>
        <div class="col-lg-6">
          ${safeMapItems(featuresItems, (item, index) => `
            ${wrapElementWithGuide(`Item ${index + 1}`, `
              <div class="feature-item">
                <div class="feature-content">
                  ${wrapElementWithGuide(`Title`, `
                    <h4>${item.title}</h4>
                  `)}
                  ${wrapElementWithGuide(`Description`, `
                    <p>${item.description}</p>
                  `)}
                </div>
              </div>
            `)}
          `)}
        </div>
      </div>
    </div>
  </section>
  `)}

  <!-- Call to Action -->
  ${wrapWithGuide('CTA', `
  <section class="cta">
    <div class="container">
      <div class="section-title">
        ${wrapElementWithGuide('Title', `
          <h2>${processedConfig.cta.title?.text}</h2>
        `)}
        ${wrapElementWithGuide('Subtitle', `
          <p>${processedConfig.cta.subtitle?.text}</p>
        `)}
      </div>
      ${wrapElementWithGuide('Button', `
        <a href="${processedConfig.cta.button?.url}" class="btn" target="_blank" rel="noopener noreferrer">${processedConfig.cta.button?.text}</a>
      `)}
    </div>
  </section>
  `)}

  <!-- Footer -->
  ${wrapWithGuide('Footer', `
  <footer id="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mb-4 mb-lg-0">
          <h5>About Us</h5>
          ${wrapElementWithGuide('Description', `
            <p>${processedConfig.footer.description?.text}</p>
          `)}
          <div class="social-links">
            ${wrapElementWithGuide('Socials', `
              ${processedConfig.footer.social?.facebook.visible === true || 
                 processedConfig.footer.social?.facebook.visible === "true" ? 
                `<a href="${processedConfig.footer.social?.facebook.url}" target="_blank" rel="noopener noreferrer">
                   <i class="${processedConfig.footer.social?.facebook.icon || 'fab fa-facebook-f'}"></i>
                 </a>` : ''}
              ${processedConfig.footer.social?.twitter.visible === true || 
                 processedConfig.footer.social?.twitter.visible === "true" ? 
                `<a href="${processedConfig.footer.social?.twitter.url}" target="_blank" rel="noopener noreferrer">
                   <i class="${processedConfig.footer.social?.twitter.icon || 'fab fa-twitter'}"></i>
                 </a>` : ''}
              ${processedConfig.footer.social?.instagram.visible === true || 
                 processedConfig.footer.social?.instagram.visible === "true" ? 
                `<a href="${processedConfig.footer.social?.instagram.url}" target="_blank" rel="noopener noreferrer">
                   <i class="${processedConfig.footer.social?.instagram.icon || 'fab fa-instagram'}"></i>
                 </a>` : ''}
              ${(processedConfig.footer.social?.linkedin.visible === true || 
                 processedConfig.footer.social?.linkedin.visible === "true") ? 
                `<a href="${processedConfig.footer.social?.linkedin.url}" target="_blank" rel="noopener noreferrer">
                   <i class="${processedConfig.footer.social?.linkedin.icon || 'fab fa-linkedin-in'}"></i>
                 </a>` : ''}
            `)}
          </div>
        </div>
        <div class="col-lg-4 mb-4 mb-lg-0">
          <ul class="footer-links">
            ${safeMapItems(footerLinks, (link, index) => `
                <li><a href="${link.url}">${link.text}</a></li>
            `)}
          </ul>
        </div>
        <div class="col-lg-4">
          <h5>Contact Info</h5>
          ${wrapElementWithGuide('Address', `
            <p><i class="fas fa-map-marker-alt mr-2"></i> ${processedConfig.footer.address?.text}</p>
          `)}
          ${wrapElementWithGuide('Phone', `
            <p><i class="fas fa-phone mr-2"></i> ${processedConfig.footer.phone?.text}</p>
          `)}
          ${wrapElementWithGuide('Email', `
            <p><i class="fas fa-envelope mr-2"></i> ${processedConfig.footer.email?.text}</p>
          `)}
        </div>
      </div>
      <div class="copyright">
        <p>© 2025 ${processedConfig.header.logo?.text}. All rights reserved.</p>
      </div>
    </div>
  </footer>
  `)}

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
  `;
}

export default basicTemplate; 