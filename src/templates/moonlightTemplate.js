// src/templates/moonlightTemplate.js
import { deepMerge, safeMapItems, initializeDefaultsFromStructure } from '../utils/templateHelpers';

// Default configuration for the Moonlight Website template
const moonlightTemplate = {
  // Template metadata
  _templateId: 'portfolio_moonlight',
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
            id: 'logo',
            name: 'Logo',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'header.logo.text',
                default: 'Moonlight'
              },
              {
                id: 'image',
                name: 'Image',
                type: 'image',
                editable: true,
                path: 'header.logo.image',
                default: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80'
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
              { text: "About", url: "#3", icon: "fa fa-user" },
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
        id: 'about',
        name: 'About',
        children: [
          {
            id: 'title',
            name: 'Title',
            type: 'text',
            editable: true,
            path: 'about.title',
            default: "About Us"
          },
          {
            id: 'description',
            name: 'Description',
            type: 'text',
            editable: true,
            path: 'about.description',
            default: "We are a creative studio focused on bringing your ideas to life with passion and precision.\n\nOur team of experts specializes in creating beautiful, functional designs that elevate your brand and engage your audience. With years of experience across multiple industries, we understand what it takes to stand out in today's competitive landscape.\n\nWe believe that great design combines <a href=\"#\">innovation</a> with usability, making a lasting impact while serving its core purpose.\n\nWhether you're looking to build a new brand identity, revamp your website, or create engaging marketing materials, we're here to help you achieve your goals with stunning, effective design solutions."
          },
          {
            id: 'image',
            name: 'Image',
            type: 'image',
            editable: true,
            path: 'about.image',
            default: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          },
          {
            id: 'buttonText',
            name: 'Button Text',
            type: 'text',
            editable: true,
            path: 'about.buttonText',
            default: "Our Services"
          },
          {
            id: 'buttonUrl',
            name: 'Button URL',
            type: 'url',
            editable: true,
            path: 'about.buttonUrl',
            default: "#2"
          }
        ]
      },
      {
        id: 'portfolio',
        name: 'Portfolio',
        children: [
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
                  id: 'fullImage',
                  name: 'Full Image',
                  type: 'image',
                  editable: true,
                  pathTemplate: 'portfolio.items[INDEX].fullImage'
                }
              ]
            },
            default: [
              {
                title: "Brand Identity",
                description: "Complete brand identity redesign for a tech startup in the fintech space.",
                thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                fullImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Mobile App",
                description: "User experience and interface design for a health and wellness mobile application.",
                thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                fullImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Web Design",
                description: "Modern e-commerce website with an intuitive shopping experience and streamlined checkout.",
                thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                fullImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Marketing Campaign",
                description: "Integrated digital marketing campaign that increased client conversion rates by 40%.",
                thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                fullImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Product Design",
                description: "Physical product design and packaging for a premium cosmetics brand.",
                thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                fullImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              },
              {
                title: "Social Media",
                description: "Creative content strategy and visual identity for a fashion brand's social media presence.",
                thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                fullImage: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
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
            id: 'mapEmbed',
            name: 'Map Embed URL',
            type: 'url',
            editable: true,
            path: 'contact.mapEmbed',
            default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.3030413476204!2d100.5641230193719!3d13.757206847615207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf51ce6427b7918fc!2sG+Tower!5e0!3m2!1sen!2sth!4v1510722015945"
          },
          {
            id: 'formFields',
            name: 'Form Fields',
            type: 'array',
            editable: false,
            path: 'contact.formFields',
            default: [
              { name: "name", type: "text", placeholder: "Your name...", required: true },
              { name: "email", type: "email", placeholder: "Your email...", required: true },
              { name: "subject", type: "text", placeholder: "Subject...", required: true },
              { name: "message", type: "textarea", placeholder: "Your message...", required: true, rows: 6 }
            ]
          },
          {
            id: 'buttonText',
            name: 'Button Text',
            type: 'text',
            editable: true,
            path: 'contact.buttonText',
            default: "Send Now"
          }
        ]
      },
      {
        id: 'footer',
        name: 'Footer',
        children: [
          {
            id: 'copyright',
            name: 'Copyright Text',
            type: 'text',
            editable: true,
            path: 'footer.copyright',
            default: "Copyright © 2023 Company Name"
          },
          {
            id: 'templateAttribution',
            name: 'Template Attribution',
            children: [
              {
                id: 'text',
                name: 'Text',
                type: 'text',
                editable: true,
                path: 'footer.templateAttribution.text',
                default: "Template: Moonlight"
              },
              {
                id: 'url',
                name: 'URL',
                type: 'url',
                editable: true,
                path: 'footer.templateAttribution.url',
                default: "https://templatemo.com/tm-512-moonlight"
              }
            ]
          }
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
    
  const formFields = Array.isArray(processedConfig.contact?.formFields) 
    ? processedConfig.contact.formFields 
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
    
    .navbar-toggler {
      color: ${processedConfig.header.textColor};
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
      color: ${processedConfig.header.textColor};
      padding: 28px 15px;
      text-decoration: none;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;
    }
    
    .navbar-nav .nav-link:hover,
    .navbar-nav .nav-link.active {
      background-color: rgba(250, 250, 250, 0.1);
      border-bottom: 3px solid ${processedConfig.global.primaryColor};
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
        background-color: rgba(22, 34, 57, 0.98);
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
      background-color: ${processedConfig.home.background ? processedConfig.home.background.color : processedConfig.global.secondaryColor};
      background-image: linear-gradient(rgba(31, 38, 56, 0.95), rgba(31, 38, 56, 0.95)), url(img/bg-pattern.png);
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
    
    /* About Section Styles */
    .about-section {
      background-color: ${processedConfig.about && processedConfig.about.background && processedConfig.about.background.color ? 
        processedConfig.about.background.color : "#ffffff"};
      color: ${processedConfig.about && processedConfig.about.textColor ? 
        processedConfig.about.textColor : "#5a6a7c"};
    }
    
    .about-section .about-content {
      padding-right: 30px;
    }
    
    .about-section p {
      color: inherit;
      line-height: 1.8;
      margin-bottom: 20px;
      font-size: 16px;
      opacity: 0.9;
    }
    
    .about-section .about-content a {
      color: ${processedConfig.global.primaryColor};
      text-decoration: none;
    }
    
    .about-section .main-btn a {
      display: inline-block;
      padding: 12px 25px;
      background-color: ${processedConfig.global.primaryColor};
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      border-radius: 3px;
      transition: all 0.3s;
      font-size: 14px;
      text-transform: uppercase;
      margin-top: 20px;
    }
    
    .about-section .main-btn a:hover {
      transform: translateY(-3px);
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .about-section .about-image img {
      width: 100%;
      border-radius: 5px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
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

    .services-section .service-image img {
      width: 100%;
      border-radius: 5px;
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
    }
    
    .portfolio-section .thumb {
      position: relative;
      overflow: hidden;
      border-radius: 5px;
    }
    
    .portfolio-section .thumb img {
      width: 100%;
      border-radius: 5px;
      transition: all 0.3s;
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
    }
    
    .portfolio-section .hover-content {
      padding: 20px;
    }
    
    .portfolio-section .hover-content h2 {
      font-size: 22px;
      color: #fff;
      margin-bottom: 10px;
    }
    
    .portfolio-section .hover-content p {
      color: #fff;
      opacity: 0.8;
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
        processedConfig.contact.background.color : "#f5f5f5"};
      color: ${processedConfig.contact && processedConfig.contact.textColor ? 
        processedConfig.contact.textColor : processedConfig.global.textColor};
    }
    
    .contact-section #map {
      margin-bottom: 30px;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    }
    
    .contact-section form {
      background-color: #fff;
      padding: 30px;
      border-radius: 5px;
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
    }
    
    .contact-section .form-control {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #e9ecef;
      border-radius: 3px;
      font-size: 14px;
    }
    
    .contact-section .btn {
      padding: 12px 25px;
      background-color: ${processedConfig.global.primaryColor};
      color: #fff;
      border: none;
      font-weight: 600;
      border-radius: 3px;
      transition: all 0.3s;
      font-size: 14px;
      text-transform: uppercase;
      width: 100%;
    }
    
    .contact-section .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Footer Styles */
    .footer {
      background-color: #1f2638;
      padding: 30px 0;
      text-align: center;
    }
    
    .footer p {
      color: #fff;
      margin: 0;
      font-size: 14px;
      opacity: 0.8;
    }
    
    .footer a {
      color: ${processedConfig.global.primaryColor};
      text-decoration: none;
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
  ${wrapWithGuide('header', `
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      ${wrapElementWithGuide('Logo', `
        <a class="navbar-brand" href="#">
          <img src="${processedConfig.header.logo.image}" alt="Logo" class="logo-image">
          <span>${processedConfig.header.logo.text}</span>
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
                <i class="${item.icon}"></i> <em>${item.text}</em>
              </a>
            </li>
          `)}
        </ul>
      </div>
    </div>
  </nav>
  `)}

  <!-- Home Section -->
  ${wrapWithGuide('Home Section', `
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
            ${wrapElementWithGuide('Main Button', `
              <div class="main-btn">
                <a href="${processedConfig.home.mainButton && processedConfig.home.mainButton.url ? 
                  processedConfig.home.mainButton.url : '#'}">${processedConfig.home.mainButton && processedConfig.home.mainButton.text ? 
                  processedConfig.home.mainButton.text : 'Learn More'}</a>
              </div>
            `)}
            ${wrapElementWithGuide('Secondary Button', `
              <div class="fb-btn">
                <a href="${processedConfig.home.secondaryButton && processedConfig.home.secondaryButton.url ? 
                  processedConfig.home.secondaryButton.url : '#'}" rel="nofollow">${processedConfig.home.secondaryButton && processedConfig.home.secondaryButton.text ? 
                  processedConfig.home.secondaryButton.text : 'Contact Us'}</a>
              </div>
            `)}
          </div>
        </div>
      </div>
    </div>
  </section>
  `)}

  <!-- Services Section -->
  ${wrapWithGuide('Services Section', `
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

  <!-- About Section -->
  ${wrapWithGuide('About Section', `
  <section id="3" class="section about-section">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12 text-center">
          <h2 class="section-title">${processedConfig.about.title}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          ${wrapElementWithGuide('Description', `
            <div class="about-content">
              <p>${processedConfig.about.description.split('\n\n').join('</p><p>')}</p>
              <div class="main-btn">
                <a href="${processedConfig.about.buttonUrl}" style="background-color: ${processedConfig.about.buttonColor || processedConfig.global.primaryColor}; color: ${processedConfig.about.buttonTextColor || '#ffffff'};">${processedConfig.about.buttonText}</a>
              </div>
            </div>
          `)}
        </div>
        <div class="col-md-6">
          ${wrapElementWithGuide('Image', `
            <div class="about-image">
              <img src="${processedConfig.about.image}" alt="About Image" class="img-fluid rounded">
            </div>
          `)}
        </div>
      </div>
    </div>
  </section>
  `)}

  <!-- Portfolio Section -->
  ${wrapWithGuide('Portfolio Section', `
  <section id="5" class="section portfolio-section">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12 text-center">
          <h2 class="section-title">Our Portfolio</h2>
        </div>
      </div>
      <div class="row">
        ${safeMapItems(portfolioItems, (item, index) => `
          <div class="col-md-4 col-sm-6">
            ${wrapElementWithGuide(`Portfolio Item ${index + 1}`, `
              <div class="item">
                <div class="thumb">
                  <a href="${item.fullImage}" data-lightbox="image-1">
                    <div class="hover-effect">
                      <div class="hover-content">
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                      </div>
                    </div>
                  </a>
                  <div class="image">
                    <img src="${item.thumbnail}" alt="${item.title}">
                  </div>
                </div>
              </div>
            `)}
          </div>
        `)}
      </div>
    </div>
  </section>
  `)}

  <!-- Contact Section -->
  ${wrapWithGuide('Contact Section', `
  <section id="6" class="section contact-section">
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-12 text-center">
          <h2 class="section-title">Contact Us</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          ${wrapElementWithGuide('Map', `
            <div id="map">
              <iframe src="${processedConfig.contact.mapEmbed}" width="100%" height="450px" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
          `)}
        </div>
        <div class="col-md-6">
          ${wrapElementWithGuide('Contact Form', `
            <form id="contact" action="" method="post">
              <div class="row">
                ${safeMapItems(formFields, (field, index) => `
                  <div class="col-md-12">
                    <fieldset>
                      ${field.type === 'textarea' ? 
                        `<textarea name="${field.name}" rows="${field.rows}" class="form-control" id="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>` : 
                        `<input name="${field.name}" type="${field.type}" class="form-control" id="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`
                      }
                    </fieldset>
                  </div>
                `)}
                <div class="col-md-12">
                  <fieldset>
                    <button type="submit" id="form-submit" class="btn">${processedConfig.contact.buttonText}</button>
                  </fieldset>
                </div>
              </div>
            </form>
          `)}
        </div>
      </div>
    </div>
  </section>
  `)}

  <!-- Footer -->
  ${wrapWithGuide('Footer', `
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          ${wrapElementWithGuide('Copyright', `
            <p>${processedConfig.footer.copyright} . Template: <a rel="nofollow" href="${processedConfig.footer.templateAttribution.url}">${processedConfig.footer.templateAttribution.text}</a></p>
          `)}
        </div>
      </div>
    </div>
  </footer>
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