// src/templates/moonlightTemplate.js
import { deepMerge, safeMapItems, initializeDefaultsFromStructure } from '../utils/templateHelpers';

// Default configuration for the Moonlight Website template
const moonlightTemplate = {
  // Template metadata
  _templateId: 'portfolio_moonlight',
  _templateVersion: '1.0.0',
  
  // Template structure metadata - defines editable sections and properties
  // TODO: User will have to add to portfolio items to get the full functionality
  // TODO What functionality will the portfolio section have?
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
          default: "#f5a425"
        },
        {
          id: "secondaryColor",
          name: "Secondary Color",
          type: "color",
          path: "global.secondaryColor",
          default: "#121212"
        },
        {
          id: "textColor",
          name: "Text Color",
          type: "color",
          path: "global.textColor",
          default: "#ffffff"
        },
        {
          id: "accentColor",
          name: "Accent Color",
          type: "color",
          path: "global.accentColor",
          default: "#33ccff"
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
            id: 'logoText',
            name: 'Logo Text',
            type: 'text',
            editable: true,
            path: 'header.logo.text',
            default: 'Moonlight'
          },
          {
            id: 'logoImage',
            name: 'Logo Image',
            type: 'image',
            editable: true,
            path: 'header.logo.image',
            default: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
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
                default: '#1f2638',
                note: 'Uses global.secondaryColor by default'
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
            id: 'items',
            name: 'Menu Items',
            type: 'array',
            editable: false,
            path: 'header.items',
            itemStructure: {
              children: [
                {
                  id: 'text',
                  name: 'Text',
                  type: 'text',
                  editable: true,
                  pathTemplate: 'header.items[INDEX].text'
                },
                {
                  id: 'url',
                  name: 'URL',
                  type: 'url',
                  editable: true,
                  pathTemplate: 'header.items[INDEX].url'
                },
                {
                  id: 'icon',
                  name: 'Icon',
                  type: 'icon',
                  editable: true,
                  pathTemplate: 'header.items[INDEX].icon'
                }
              ]
            },
            default: [
              { text: "Services", url: "#2", icon: "fa fa-cogs" },
              { text: "Portfolio", url: "#5", icon: "fa fa-image" },
              { text: "Contact", url: "#6", icon: "fa fa-envelope" }
            ]
          }
        ]
      },
      {
        id: 'home',
        name: 'Home',
        children: [
          {
            id: 'authorImage',
            name: 'Author Image',
            path: 'home.authorImage',
            children: [
              {
                id: 'image',
                name: 'Image',
                type: 'image',
                editable: true,
                path: 'home.authorImage.image',
                default: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
              },
              {
                id: 'accentColor',
                name: 'Accent Color',
                type: 'color',
                editable: true,
                path: 'home.authorImage.accentColor',
                default: '#f5a425',
                note: 'Uses global.primaryColor by default'
              }
            ],

          },
          {
            id: 'title',
            name: 'Title',
            type: 'text',
            editable: true,
            path: 'home.title',
            default: "Creative Portfolio"
          },
          {
            id: 'description',
            name: 'Description',
            type: 'text',
            editable: true,
            path: 'home.description',
            default: "Welcome to Moonlight, a <em>creative portfolio</em> template. This modern design showcases your work with style and elegance. <em>Perfect for creatives</em> who want to make a lasting impression."
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
                path: 'home.background.color',
                default: '#1f2638',
                note: 'Uses global.secondaryColor by default'
              }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'home.textColor',
            default: "#ffffff"
          },
          {
            id: 'mainButton',
            name: 'Main Button',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'home.mainButton.text',
                default: 'Get Started'
              },  
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'home.mainButton.color',
                default: '#4a90e2',
                note: 'Uses global.primaryColor by default'
              },
              {
                id: 'textColor',
                name: 'Text Color',
                type: 'color',
                editable: true,
                path: 'home.mainButton.textColor',
                default: '#ffffff'
              },
              {
                id: 'url',  
                name: 'URL',
                type: 'url',
                editable: true,
                path: 'home.mainButton.url',
                default: "#2"
              },
              {
                id: 'visible',
                name: 'Show/Hide',
                type: 'boolean',
                editable: true,
                path: 'home.mainButton.visible',
                default: true
              }
            ]
          },  
          {
            id: 'secondaryButton',
            name: 'Secondary Button',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'home.secondaryButton.text',
                default: "Contact Us"
              },
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'home.secondaryButton.color',
                default: '#f5a425',
                note: 'Uses global.primaryColor by default'
              },
              {
                id: 'textColor',
                name: 'Text Color',
                type: 'color',
                editable: true,
                path: 'home.secondaryButton.textColor',
                default: '#ffffff'
              },
              {
                id: 'url',
                name: 'URL',
                type: 'url',
                editable: true,
                path: 'home.secondaryButton.url',
                default: "#6"
              },
              {
                id: 'visible',
                name: 'Show/Hide',
                type: 'boolean',
                editable: true,
                path: 'home.secondaryButton.visible',
                default: true
              }
            ]
          }
        ]
      },
      {
        id: 'services',
        name: 'Services',
        children: [
          {
            id: 'background',
            name: 'Background',
            children: [
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'services.background.color',
                default: '#f5f5f5',
                note: 'Uses global.secondaryColor by default'
              }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'services.textColor',
            default: "#000000"
          },
          {
            id: 'firstService',
            name: 'First Service',
            children: [
              {
                id: 'title',
                name: 'Title',
                type: 'text',
                editable: true,
                path: 'services.firstService.title',
                default: "UI/UX Design"
              },
              {
                id: 'description',
                name: 'Description',
                type: 'text',
                editable: true,
                path: 'services.firstService.description',
                default: "We create intuitive, beautiful interfaces that delight users and enhance usability. Our design process focuses on real users' needs, ensuring your digital products are not just visually stunning but also functional and easy to navigate."
              },
              {
                id: 'image',
                name: 'Image',
                type: 'image',
                editable: true,
                path: 'services.firstService.image',
                default: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
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
                    path: 'services.firstService.background.color',
                  }
                ]
              },
              {
                id: 'textColor',
                name: 'Text Color',
                type: 'color',
                editable: true,
                path: 'services.firstService.textColor',
              }
            ]
          },
          {
            id: 'secondService',
            name: 'Second Service',
            children: [
              {
                id: 'title',
                name: 'Title',
                type: 'text',
                editable: true,
                path: 'services.secondService.title',
                default: "Digital Marketing"
              },
              {
                id: 'description',
                name: 'Description',
                type: 'text',
                editable: true,
                path: 'services.secondService.description',
                default: "Reach your target audience with our strategic digital marketing services. From social media campaigns to SEO optimization, we help you build a strong online presence that converts visitors into loyal customers and drives sustainable business growth."
              },
              {
                id: 'image',
                name: 'Image',
                type: 'image',
                editable: true,
                path: 'services.secondService.image',
                default: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
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
                    path: 'services.secondService.background.color',
                  }
                ]
              },
              {
                id: 'textColor',
                name: 'Text Color',
                type: 'color',
                editable: true,
                path: 'services.secondService.textColor',
              }
            ]
          }
        ]
      },
      {
        id: 'portfolio',
        name: 'Portfolio',
        children: [
          {
            id: 'background',
            name: 'Background',
            children: [
              {
                id: 'color',
                name: 'Color',
                type: 'color',
                editable: true,
                path: 'portfolio.background.color',
                default: "#ffffff"
              }
            ]
          },
          {
            id: 'textColor',
            name: 'Text Color',
            type: 'color',
            editable: true,
            path: 'portfolio.textColor',
            default: "#000000"
          },
          {
            id: 'items',
            name: 'Portfolio Items',
            type: 'array',
            editable: true,
            path: 'portfolio.items',
            itemStructure: {
              children: [
                {
                  id: 'title',
                  name: 'Title',
                  type: 'text',
                  editable: true,
                  pathTemplate: 'portfolio.items[INDEX].title'
                },
                {
                  id: 'description',
                  name: 'Description',
                  type: 'text',
                  editable: true,
                  pathTemplate: 'portfolio.items[INDEX].description'
                },
                {
                  id: 'thumbnail',
                  name: 'Thumbnail',
                  type: 'image',
                  editable: true,
                  pathTemplate: 'portfolio.items[INDEX].thumbnail'
                },
                {
                  id: 'visible',
                  name: 'Show/Hide',
                  type: 'boolean',
                  editable: true,
                  pathTemplate: 'portfolio.items[INDEX].visible',
                  default: true
                },
                {
                  id: 'url',
                  name: 'URL',
                  type: 'url',
                  editable: true,
                  pathTemplate: 'portfolio.items[INDEX].url'
                }
              ]
            },
            default: [
              {
                title: "Brand Identity",
                description: "Complete brand identity redesign for a tech startup in the fintech space.",
                thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                visible: true,
                url: "https://www.google.com"
              },
              {
                title: "Mobile App",
                description: "User experience and interface design for a health and wellness mobile application.",
                thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                visible: true,
                url: "https://www.google.com"
              },
              {
                title: "Web Design",
                description: "Modern e-commerce website with an intuitive shopping experience and streamlined checkout.",
                thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                visible: true,
                url: "https://www.google.com"
              },
              {
                title: "Marketing Campaign",
                description: "Integrated digital marketing campaign that increased client conversion rates by 40%.",
                thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                visible: true,
                url: "https://www.google.com"
              },
              {
                title: "Product Design",
                description: "Physical product design and packaging for a premium cosmetics brand.",
                thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                visible: true,
                url: "https://www.google.com"
              },
              {
                title: "Social Media",
                description: "Creative content strategy and visual identity for a fashion brand's social media presence.",
                thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                visible: true,
                url: "https://www.google.com"
              }
            ]
          }
        ]
      },
      {
        id: 'contact',
        name: 'Contact',
        children: [
          {
            id: 'address',
            name: 'Address',
            type: 'text',
            editable: true,
            path: 'contact.address',
            default: "123 Street, City, Country"
          },
          {
            id: 'phone',
            name: 'Phone',
            type: 'text',
            editable: true,
            path: 'contact.phone',
            default: "+1 (555) 123-4567"
          },
          {
            id: 'email',
            name: 'Email',
            type: 'text',
            editable: true,
            path: 'contact.email',
            default: "info@yourcompany.com"
          },
          {
            id: 'accentColor',
            name: 'Accent Color',
            type: 'color',
            editable: true,
            path: 'contact.accentColor',
            default: '#f5a425',
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
                    path: 'contact.social.facebook.url',
                    default: 'https://www.facebook.com'
                  },
                  {
                    id: 'visible',
                    name: 'Show/Hide',
                    type: 'boolean',
                    editable: true,
                    path: 'contact.social.facebook.visible',
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
                    path: 'contact.social.twitter.url',
                    default: 'https://www.twitter.com'
                  },
                  {
                    id: 'visible',
                    name: 'Show/Hide',
                    type: 'boolean',
                    editable: true,
                    path: 'contact.social.twitter.visible',
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
                    path: 'contact.social.instagram.url',
                    default: 'https://www.instagram.com'
                  },
                  {
                    id: 'visible',
                    name: 'Show/Hide',
                    type: 'boolean',
                    editable: true,
                    path: 'contact.social.instagram.visible',
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
                    path: 'contact.social.linkedin.url',
                    default: 'https://www.linkedin.com'
                  },
                  {
                    id: 'visible',
                    name: 'Show/Hide',
                    type: 'boolean',
                    editable: true,
                    path: 'contact.social.linkedin.visible',
                    default: true
                  }
                ]
              }
            ]
          },
          {
            id: 'copyright',
            name: 'Copyright Text',
            type: 'text',
            editable: false,
            path: 'contact.copyright',
            default: "VibeSite"
          },
        ]
      }
    ]
  }
};

// Initialize defaults (without circular dependency)
const initializedTemplate = initializeDefaultsFromStructure({...moonlightTemplate});
// Copy all properties back to basicTemplate
Object.assign(moonlightTemplate, initializedTemplate);

// Function to generate HTML from the template configuration
export function generateHTML(config, showGuides = false) {
  // Simple deep merge of user config with defaults
  const processedConfig = config ? deepMerge(moonlightTemplate, config) : {...moonlightTemplate};
  
  // Add explicit safety check for common arrays
  const headerItems = Array.isArray(processedConfig.header?.items) 
    ? processedConfig.header.items 
    : [];
    
  const portfolioItems = Array.isArray(processedConfig.portfolio?.items) 
    ? processedConfig.portfolio.items 
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

  // Build the complete HTML using string concatenation instead of template literals
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Moonlight Template</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
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
      background-color: ${processedConfig.global.secondaryColor};
      overflow-x: hidden;
    }
    
    /* Header Styles */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      background-color: ${processedConfig.header.background ? processedConfig.header.background.color : processedConfig.global.secondaryColor};
      box-shadow: 0px 5px 15px rgba(0,0,0,0.5);
      transition: all 0.3s ease;
      height: 80px; /* Fixed height for header */
    }
    
    .navbar {
      padding: 0 30px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    
    .navbar-brand {
      color: ${processedConfig.header.textColor} !important;
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
    
    .navbar-toggler {
      color: ${processedConfig.header.textColor} ;
      border-color: rgba(255,255,255,0.1);
    }
    
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }
    
    .navbar-nav {
      margin-left: auto;
    }
    
    .navbar-nav .nav-item {
      display: inline-block;
    }
    
    .navbar-nav .nav-link {
      color: ${processedConfig.header.textColor} !important;
      padding: 28px 15px;
      text-decoration: none;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;
    }
    
    .navbar-nav .nav-link:hover,
    .navbar-nav .nav-link.active {
      background-color: rgba(250, 250, 250, 0.1);
    }
    
    .navbar-nav .nav-link i {
      margin-right: 8px;
      font-size: 16px;
    }
    
    /* Responsive Header */
    @media (max-width: 991px) {
      .navbar {
        padding: 0 15px;
      }
      
      .navbar-nav .nav-link {
        padding: 15px 20px;
        text-align: left;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .navbar-collapse {
        background-color: ${processedConfig.header.background.color} !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 0;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        max-height: calc(100vh - 80px);
        overflow-y: auto;
      }
      
      .navbar-collapse.show, 
      .navbar-collapse.collapsing {
        transition: height 0.3s ease;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      /* Prevent content shift when menu opens */
      body {
        overflow-x: hidden;
      }
    }
    
    /* Home Section */
    .home-section {
      background-color: ${processedConfig.home.background.color};
      background-repeat: repeat;
      background-position: center center;
      height: 100vh;
      min-height: 700px;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 100px 0;
      margin-top: 0;
      position: relative;
      z-index: 1;
      color: ${processedConfig.home.textColor || processedConfig.global.textColor};
    }
    
    .home-section::before {
      content: '';
      display: block;
      height: 80px; /* Same as header height */
      margin-top: -80px;
      visibility: hidden;
      pointer-events: none;
    }
    
    .home-section .author-image {
      position: relative;
      z-index: 2;
      margin-bottom: 30px;
    }
    
    .home-section .author-image img {
      max-width: 220px;
      border-radius: 50%;
      border: 5px solid ${processedConfig.home.authorImage && processedConfig.home.authorImage.accentColor ? 
        processedConfig.home.authorImage.accentColor : processedConfig.global.primaryColor};
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
    }
    
    .home-section h1 {
      font-size: 46px;
      font-weight: 700;
      color: ${processedConfig.home.textColor || processedConfig.global.textColor};
      margin-bottom: 20px;
    }
    
    .home-section p {
      font-size: 18px;
      color: ${processedConfig.home.textColor || processedConfig.global.textColor};
      line-height: 1.6;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .home-section .main-btn {
      display: inline-block;
      margin-right: 15px;
    }
    
    .home-section .main-btn a,
    .home-section .fb-btn a {
      display: inline-block;
      padding: 12px 25px;
      background-color: ${processedConfig.home.mainButton && processedConfig.home.mainButton.color ? 
        processedConfig.home.mainButton.color : processedConfig.global.primaryColor};
      color: ${processedConfig.home.mainButton && processedConfig.home.mainButton.textColor ? 
        processedConfig.home.mainButton.textColor : "#ffffff"};
      text-decoration: none;
      font-weight: 600;
      border-radius: 3px;
      transition: all 0.3s;
      font-size: 14px;
      text-transform: uppercase;
    }
    
    .home-section .fb-btn a {
      background-color: ${processedConfig.home.secondaryButton && processedConfig.home.secondaryButton.color ? 
        processedConfig.home.secondaryButton.color : processedConfig.global.accentColor};
      color: ${processedConfig.home.secondaryButton && processedConfig.home.secondaryButton.textColor ? 
        processedConfig.home.secondaryButton.textColor : "#ffffff"};
    }
    
    .home-section .main-btn a:hover,
    .home-section .fb-btn a:hover {
      transform: translateY(-3px);
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    }
    
    /* Services Section Styles */
    .services-section {
      background-color: ${processedConfig.services && processedConfig.services.background && processedConfig.services.background.color ? 
        processedConfig.services.background.color : "#f5f5f5"};
      color: ${processedConfig.services.textColor || processedConfig.global.textColor};
    }

    .services-section .service-content {
      padding: 30px;
      margin-bottom: 30px;
      border-radius: 5px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    }

    .services-section .service-content h3 {
      color: ${processedConfig.services.textColor};
    }
    .services-section .service-content p {
      color: ${processedConfig.services.textColor};
    }

    .services-section .service-image {
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      padding-top: 75%; /* This creates a 4:3 aspect ratio */
      width: 100%;
    }

    .services-section .service-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      object-fit: cover; /* This ensures images cover the area without distortion */
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Portfolio Section Styles */
    .portfolio-section {
      background-color: ${processedConfig.portfolio && processedConfig.portfolio.background && processedConfig.portfolio.background.color ? 
        processedConfig.portfolio.background.color : "#ffffff"};
      color: ${processedConfig.portfolio && processedConfig.portfolio.textColor ? 
        processedConfig.portfolio.textColor : processedConfig.global.textColor};
    }
    
    .portfolio-section .item {
      margin-bottom: 30px;
      height: 100%; /* Ensure consistent height */
    }
    
    .portfolio-section .thumb {
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      /* Add consistent aspect ratio container */
      padding-top: 75%; /* This creates a 4:3 aspect ratio */
      width: 100%;
    }
    
    .portfolio-section .thumb img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      transition: all 0.3s;
      object-fit: cover; /* This ensures images cover the area without distortion */
    }
    
    .portfolio-section .hover-effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(31, 38, 56, 0.95);
      opacity: 0;
      visibility: hidden;
      transition: all 0.5s;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      z-index: 2;
    }
    
    .portfolio-section .hover-content {
      padding: 20px;
      z-index: 3;
      width: 100%; /* Ensure it takes full width */
      max-width: 90%; /* Give some margin on sides */
    }
    
    .portfolio-section .hover-content h2 {
      font-size: 18px; /* Reduced from 22px */
      color: #fff;
      margin-bottom: 10px;
      transform: translateY(20px);
      transition: transform 0.3s;
      line-height: 1.3;
      overflow-wrap: break-word; /* Handle long titles */
    }
    
    .portfolio-section .hover-content p {
      color: #fff;
      opacity: 0.8;
      transform: translateY(20px);
      transition: transform 0.3s;
      font-size: 14px; /* Add specific size */
      line-height: 1.4;
      margin: 0;
      overflow-wrap: break-word; /* Handle long descriptions */
      display: -webkit-box;
      -webkit-line-clamp: 4; /* Limit to 4 lines */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .portfolio-section .thumb:hover .hover-content h2,
    .portfolio-section .thumb:hover .hover-content p {
      transform: translateY(0);
    }
    
    .portfolio-section .thumb:hover .hover-effect {
      opacity: 1;
      visibility: visible;
    }
    
    .portfolio-section .thumb:hover img {
      transform: scale(1.1);
    }
    
    /* Contact Section Styles */
    .contact-section {
      background-color: ${processedConfig.contact && processedConfig.contact.background && processedConfig.contact.background.color ? 
        processedConfig.contact.background.color : "#f8f9fa"};
      padding: 100px 0;
    }

    .contact-section .section-title {
      font-size: 42px;
      margin-bottom: 15px;
      font-weight: 700;
      color: ${processedConfig.contact && processedConfig.contact.textColor ? 
        processedConfig.contact.textColor : "#212529"};
    }

    .contact-section .title-underline {
      width: 80px;
      height: 4px;
      background-color: ${processedConfig.contact.accentColor};
      margin: 0 auto 20px;
      border-radius: 2px;
    }

    .contact-section .section-subtitle {
      font-size: 18px;
      color: #6c757d;
      margin-bottom: 40px;
      font-weight: 300;
    }

    .contact-card {
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      padding: 40px;
      transition: transform 0.3s ease;
    }

    .contact-card:hover {
      transform: translateY(-5px);
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-bottom: 30px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .icon-wrapper {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: ${processedConfig.contact.accentColor}10;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .icon-wrapper i {
      color: ${processedConfig.contact.accentColor};
      font-size: 20px;
    }

    .contact-details h4 {
      margin: 0 0 5px;
      font-size: 16px;
      font-weight: 600;
      color: #212529;
    }

    .contact-link, .contact-text {
      color: #6c757d;
      text-decoration: none;
      transition: color 0.3s;
      font-size: 15px;
      margin: 0;
    }

    .contact-link:hover {
      color: ${processedConfig.contact.accentColor};
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 15px;
      padding-top: 20px;
      border-top: 1px solid #f0f0f0;
    }

    .social-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: transparent;
      border: 1px solid #eaeaea;
      color: #6c757d;
      text-decoration: none;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    .social-icon:hover {
      background: ${processedConfig.contact.accentColor};
      color: #fff;
      border-color: ${processedConfig.contact.accentColor};
      transform: translateY(-3px);
    }

    @media (min-width: 768px) {
      .contact-info {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      
      .contact-item {
        flex: 0 0 calc(33.333% - 20px);
        max-width: calc(33.333% - 20px);
      }
    }

    @media (max-width: 767px) {
      .contact-card {
        padding: 30px 20px;
      }
      
      .contact-item {
        flex-direction: column;
        text-align: center;
        gap: 10px;
      }
      
      .icon-wrapper {
        margin: 0 auto;
      }
    }
    
    /* contact Styles */
    .contact {
      background-color: ${processedConfig.contact && processedConfig.contact.background && processedConfig.contact.background.color ? 
        processedConfig.contact.background.color : "#1f2638"};
      color: #fff;
      padding: 0;
    }

    .contact-brand {
      color: #fff;
      font-weight: 600;
      margin-bottom: 20px;
      font-size: 24px;
    }

    .contact-description {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.6;
      font-size: 15px;
    }

    .contact-heading {
      color: #fff;
      font-weight: 600;
      margin-bottom: 20px;
      font-size: 18px;
      position: relative;
      padding-bottom: 10px;
    }

    .contact-heading:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40px;
      height: 2px;
      background-color: ${processedConfig.contact.accentColor};
    }

    .contact-social {
      display: flex;
      gap: 15px;
      margin-bottom: 30px;
    }

    .contact-social a {
      color: rgba(255, 255, 255, 0.7);
      transition: all 0.3s;
      font-size: 16px;
    }

    .contact-social a:hover {
      color: ${processedConfig.contact.accentColor};
      transform: translateY(-3px);
    }

    .contact-links {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .contact-links li {
      margin-bottom: 12px;
    }

    .contact-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s;
      font-size: 15px;
    }

    .contact-links a:hover {
      color: ${processedConfig.contact.accentColor};
      padding-left: 5px;
    }

    .contact-contact p {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 12px;
      font-size: 15px;
    }

    .contact-contact a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color 0.3s;
    }

    .contact-contact a:hover {
      color: ${processedConfig.contact.accentColor};
    }

    .contact-contact i {
      color: ${processedConfig.contact.accentColor};
      width: 20px;
      text-align: center;
    }

    .contact-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px 0;
      text-align: center;
    }

    .contact-bottom p {
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
      font-size: 14px;
    }

    .contact-bottom a {
      color: ${processedConfig.contact.accentColor};
      text-decoration: none;
    }

    @media (max-width: 767px) {
      .contact {
        text-align: center;
      }
      
      .contact-heading:after {
        left: 50%;
        transform: translateX(-50%);
      }
      
      .contact-social {
        justify-content: center;
      }
    }
    
    /* Section Styles */
    section.section {
      padding: 100px 0;
      position: relative;
    }

    section.section::before {
      content: '';
      display: block;
      height: 80px; /* Same as header height */
      margin-top: -80px;
      visibility: hidden;
      pointer-events: none;
    }

    section.section h2.section-title {
      font-size: 36px;
      color: inherit;
      text-align: center;
      margin-bottom: 50px;
      font-weight: 700;
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
          <img src="${processedConfig.header.logoImage}" alt="Logo" class="logo-image">
          <span>${processedConfig.header.logoText}</span>
        </a>
      `)}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          ${safeMapItems(headerItems, (item, index) => `
            <li class="nav-item">
              <a href="${item.url}" class="nav-link ${index === 0 ? 'active' : ''}">
                <em>${item.text}</em>
              </a>
            </li>
          `)}
        </ul>
      </div>
    </div>
  </nav>
  `)}

  <!-- Home Section -->
  ${wrapWithGuide('Home', `
  <section id="1" class="section home-section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-4 text-center">
          ${wrapElementWithGuide('Author Image', `
            <div class="author-image">
              <img src="${processedConfig.home.authorImage && processedConfig.home.authorImage.image ? 
                processedConfig.home.authorImage.image : ''}" alt="Author">
            </div>
          `)}
        </div>
        <div class="col-md-8">
          ${wrapElementWithGuide('Title', `
            <h1>${processedConfig.home.title}</h1>
          `)}
          ${wrapElementWithGuide('Description', `
            <p>${processedConfig.home.description}</p>
          `)}
          <div class="d-flex flex-wrap">
            ${processedConfig.home.mainButton?.visible === true || 
               processedConfig.home.mainButton?.visible === "true" ? 
            wrapElementWithGuide('Main Button', `
              <div class="main-btn">
                <a href="${processedConfig.home.mainButton && processedConfig.home.mainButton.url ? 
                  processedConfig.home.mainButton.url : '#'}">${processedConfig.home.mainButton && processedConfig.home.mainButton.text ? 
                  processedConfig.home.mainButton.text : 'Learn More'}</a>
              </div>
            `) : ''}
            ${processedConfig.home.secondaryButton?.visible === true || 
               processedConfig.home.secondaryButton?.visible === "true" ? 
            wrapElementWithGuide('Secondary Button', `
              <div class="fb-btn">
                <a href="${processedConfig.home.secondaryButton && processedConfig.home.secondaryButton.url ? 
                  processedConfig.home.secondaryButton.url : '#'}" rel="nofollow">${processedConfig.home.secondaryButton && processedConfig.home.secondaryButton.text ? 
                  processedConfig.home.secondaryButton.text : 'Contact Us'}</a>
              </div>
            `) : ''}
          </div>
        </div>
      </div>
    </div>
  </section>
  `)}

  <!-- Services Section -->
  ${wrapWithGuide('Services', `
  <section id="2" class="section services-section">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12 text-center">
          <h2 class="section-title">Our Services</h2>
        </div>
      </div>
      <div class="row mb-5">
        <div class="col-md-6">
          ${wrapElementWithGuide('First Service Content', `
            <div class="service-content" 
              style="${processedConfig.services.firstService.background && processedConfig.services.firstService.background.color ? 
                `background-color: ${processedConfig.services.firstService.background.color};` : ''}
                ${processedConfig.services.firstService.textColor ? 
                `color: ${processedConfig.services.firstService.textColor};` : ''}">
              ${wrapElementWithGuide('Title', `
                <h3 style="${processedConfig.services.firstService.textColor ? 
                  `color: ${processedConfig.services.firstService.textColor};` : ''}">${processedConfig.services.firstService.title}</h3>
              `)}
              ${wrapElementWithGuide('Description', `
                <p style="${processedConfig.services.firstService.textColor ? 
                  `color: ${processedConfig.services.firstService.textColor};` : ''}">${processedConfig.services.firstService.description}</p>
              `)}
            </div>
          `)}
        </div>
        <div class="col-md-6">
          ${wrapElementWithGuide('First Service Image', `
            <div class="service-image">
              <img src="${processedConfig.services.firstService.image}" alt="First Service" class="img-fluid rounded">
            </div>
          `)}
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 order-md-2">
          ${wrapElementWithGuide('Second Service Content', `
            <div class="service-content" 
              style="${processedConfig.services.secondService.background && processedConfig.services.secondService.background.color ? 
                `background-color: ${processedConfig.services.secondService.background.color};` : ''}
                ${processedConfig.services.secondService.textColor ? 
                `color: ${processedConfig.services.secondService.textColor};` : ''}">
              ${wrapElementWithGuide('Title', `
                <h3 style="${processedConfig.services.secondService.textColor ? 
                  `color: ${processedConfig.services.secondService.textColor};` : ''}">${processedConfig.services.secondService.title}</h3>
              `)}
              ${wrapElementWithGuide('Description', `
                <p style="${processedConfig.services.secondService.textColor ? 
                  `color: ${processedConfig.services.secondService.textColor};` : ''}">${processedConfig.services.secondService.description}</p>
              `)}
            </div>
          `)}
        </div>
        <div class="col-md-6 order-md-1">
          ${wrapElementWithGuide('Second Service Image', `
            <div class="service-image">
              <img src="${processedConfig.services.secondService.image}" alt="Second Service" class="img-fluid rounded">
            </div>
          `)}
        </div>
      </div>
    </div>
  </section>
  `)}

  <!-- Portfolio Section -->
  ${wrapWithGuide('Portfolio', `
  <section id="5" class="section portfolio-section">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12 text-center">
          <h2 class="section-title">Our Portfolio</h2>
        </div>
      </div>
      <div class="row">
        ${safeMapItems(portfolioItems, (item, index) => `
          ${item.visible === true || item.visible === "true" ? `
            <div class="col-md-4 col-sm-6">
              ${wrapElementWithGuide(`Portfolio Item ${index + 1}`, `
                <div class="item">
                  <div class="thumb">
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                      <div class="hover-effect">
                        <div class="hover-content">
                          <h2>${item.title}</h2>
                          <p>${item.description}</p>
                        </div>
                      </div>
                      <div class="image">
                        <img src="${item.thumbnail}" alt="${item.title}">
                      </div>
                    </a>
                  </div>
                </div>
              `)}
            </div>
          ` : ''}
        `)}
      </div>
    </div>
  </section>
  `)}

  <!--  -->
  ${wrapWithGuide('Contact', `
  <contact class="contact" id="6">
    <div class="container">
      <div class="row py-5">
        <div class="col-lg-4">
          <h5 class="contact-heading">Get In Touch</h5>
          ${wrapElementWithGuide('Social Links', `
            <div class="contact-social">
            ${processedConfig.contact.social?.facebook.visible === true || 
              processedConfig.contact.social?.facebook.visible === "true" ? 
            `<a href="${processedConfig.contact.social?.facebook.url}" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook-f"></i>
              </a>` : ''}
            ${processedConfig.contact.social?.twitter.visible === true || 
                 processedConfig.contact.social?.twitter.visible === "true" ? 
                `<a href="${processedConfig.contact.social?.twitter.url}" target="_blank" rel="noopener noreferrer">
                   <i class="fab fa-twitter"></i>
                 </a>` : ''}
            ${processedConfig.contact.social?.instagram.visible === true || 
                 processedConfig.contact.social?.instagram.visible === "true" ? 
                `<a href="${processedConfig.contact.social?.instagram.url}" target="_blank" rel="noopener noreferrer">
                   <i class="fab fa-instagram"></i>
                 </a>` : ''}
            ${processedConfig.contact.social?.linkedin.visible === true || 
                 processedConfig.contact.social?.linkedin.visible === "true" ? 
                `<a href="${processedConfig.contact.social?.linkedin.url}" target="_blank" rel="noopener noreferrer">
                   <i class="fab fa-linkedin-in"></i>
                 </a>` : ''}
          </div>
          `)}
          ${wrapElementWithGuide('Contact Info', `
            <div class="contact-contact">
              ${wrapElementWithGuide('Address', `
                <p><i class="fas fa-map-marker-alt me-2"></i> ${processedConfig.contact.address}</p>
              `)}
              ${wrapElementWithGuide('Phone', `
                <p><i class="fas fa-phone me-2"></i> <a href="tel:${processedConfig.contact.phone.replace(/[^0-9+]/g, '')}">${processedConfig.contact.phone}</a></p>
              `)}
              ${wrapElementWithGuide('Email', `
                <p><i class="fas fa-envelope me-2"></i> <a href="mailto:${processedConfig.contact.email}">${processedConfig.contact.email}</a></p>
              `)}
            </div>
          `)}
        </div>
      </div>
      
      <div class="contact-bottom">
        <p>Made with ❤️ by ${processedConfig.contact.copyright}</p>
      </div>
    </div>
  </contact>
  `)}

  <!-- Scripts -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
  <script>
    $(document).ready(function() {
      // Define navbar height
      const navHeight = 80;
      
      // Smooth scrolling for header links
      $('.navbar-nav .nav-link').on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          
          // Add active class to clicked link and remove from others
          $('.navbar-nav .nav-link').removeClass('active');
          $(this).addClass('active');
          
          // Close mobile menu
          $('.navbar-collapse').collapse('hide');
          
          // Smooth scroll to the target section with offset for navbar height
          $('html, body').animate({
            scrollTop: $(hash).offset().top - navHeight
          }, 800);
        }
      });
      
      // Handle navbar collapse without pushing content
      $('.navbar-toggler').on('click', function() {
        setTimeout(function() {
          if ($('.navbar-collapse').hasClass('show')) {
            $('body').css('padding-right', '0');
          }
        }, 10);
      });
      
      // Add active class based on scroll position
      $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop() + navHeight + 20; // Add offset
        
        // Check each section
        $('section').each(function() {
          var topDistance = $(this).offset().top;
          
          if (topDistance - 10 < scrollPosition && topDistance + $(this).outerHeight() > scrollPosition) {
            // Remove active from all links
            $('.navbar-nav .nav-link').removeClass('active');
            
            // Add active class to corresponding link
            $('.navbar-nav .nav-link[href="#' + $(this).attr('id') + '"]').addClass('active');
          }
        });
      });
      
      // Trigger scroll once on page load to set active nav item
      $(window).trigger('scroll');
    });
  </script>
</body>
</html>`;
}

export default moonlightTemplate;