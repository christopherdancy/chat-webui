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
        id: 'navigation',
        name: 'Navigation',
        children: [
          {
            id: 'logo',
            name: 'Logo',
            type: 'image',
            editable: true,
            path: 'navigation.logo',
            default: "img/logo.png"
          },
          {
            id: 'miniLogo',
            name: 'Mini Logo',
            type: 'image',
            editable: true,
            path: 'navigation.miniLogo',
            default: "img/mini_logo.png"
          },
          {
            id: 'items',
            name: 'Menu Items',
            type: 'array',
            editable: true,
            path: 'navigation.items',
            itemStructure: {
              children: [
                {
                  id: 'text',
                  name: 'Text',
                  type: 'text',
                  editable: true,
                  pathTemplate: 'navigation.items[INDEX].text'
                },
                {
                  id: 'url',
                  name: 'URL',
                  type: 'url',
                  editable: true,
                  pathTemplate: 'navigation.items[INDEX].url'
                },
                {
                  id: 'icon',
                  name: 'Icon',
                  type: 'icon',
                  editable: true,
                  pathTemplate: 'navigation.items[INDEX].icon'
                }
              ]
            },
            default: [
              { text: "Home", url: "#1", icon: "fa fa-home" },
              { text: "Services", url: "#2", icon: "fa fa-support" },
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
            type: 'image',
            editable: true,
            path: 'home.authorImage',
            default: "img/author_image.png"
          },
          {
            id: 'title',
            name: 'Title',
            type: 'text',
            editable: true,
            path: 'home.title',
            default: "Mingalar par"
          },
          {
            id: 'description',
            name: 'Description',
            type: 'text',
            editable: true,
            path: 'home.description',
            default: "Lorem ipsum <em>dolor sit amet</em>, consectetur adipiscing elit. <em>Sed vehicula blandit augue,</em> eu maximus odio tempus vitae."
          },
          {
            id: 'mainButtonText',
            name: 'Main Button Text',
            type: 'text',
            editable: true,
            path: 'home.mainButtonText',
            default: "Read More"
          },
          {
            id: 'mainButtonUrl',
            name: 'Main Button URL',
            type: 'url',
            editable: true,
            path: 'home.mainButtonUrl',
            default: "#2"
          },
          {
            id: 'secondaryButtonText',
            name: 'Secondary Button Text',
            type: 'text',
            editable: true,
            path: 'home.secondaryButtonText',
            default: "Our FB Page"
          },
          {
            id: 'secondaryButtonUrl',
            name: 'Secondary Button URL',
            type: 'url',
            editable: true,
            path: 'home.secondaryButtonUrl',
            default: "https://fb.com/templatemo"
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
            default: "Please tell your friends about templatemo website. A variety of free CSS templates are available for immediate downloads.\n\nPhasellus vitae faucibus orci. Etiam eleifend orci sed faucibus semper. Cras varius dolor et augue fringilla, eu commodo sapien iaculis. Donec eget dictum tellus. <a href=\"#\">Curabitur</a> a interdum diam. Nulla vestibulum porttitor porta.\n\nNulla vitae interdum libero, vel posuere ipsum. Phasellus interdum est et dapibus tempus. Vestibulum malesuada lorem condimentum mauris ornare dapibus. Curabitur tempor ligula et <a href=\"#\">placerat</a> molestie.\n\nAliquam efficitur eu purus in interdum. <a href=\"#\">Etiam tincidunt</a> magna ex, sit amet lobortis felis bibendum id. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            id: 'image',
            name: 'Image',
            type: 'image',
            editable: true,
            path: 'about.image',
            default: "img/about_image.jpg"
          },
          {
            id: 'buttonText',
            name: 'Button Text',
            type: 'text',
            editable: true,
            path: 'about.buttonText',
            default: "Read More"
          },
          {
            id: 'buttonUrl',
            name: 'Button URL',
            type: 'url',
            editable: true,
            path: 'about.buttonUrl',
            default: "#3"
          }
        ]
      },
      {
        id: 'services',
        name: 'Services',
        children: [
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
                default: "Quisque commodo quam"
              },
              {
                id: 'description',
                name: 'Description',
                type: 'text',
                editable: true,
                path: 'services.firstService.description',
                default: "Vestibulum augue ex, finibus sit amet nisi id, maximus ultrices ipsum. Maecenas rhoncus nibh in mauris lobortis, a maximus diam faucibus. In et eros urna. Suspendisse potenti. Pellentesque commodo, neque nec molestie tempus, purus ante feugiat augue."
              },
              {
                id: 'image',
                name: 'Image',
                type: 'image',
                editable: true,
                path: 'services.firstService.image',
                default: "img/first_service.jpg"
              },
              {
                id: 'buttonText',
                name: 'Button Text',
                type: 'text',
                editable: true,
                path: 'services.firstService.buttonText',
                default: "Continue Reading"
              },
              {
                id: 'buttonUrl',
                name: 'Button URL',
                type: 'url',
                editable: true,
                path: 'services.firstService.buttonUrl',
                default: "#4"
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
                default: "Maecenas eu purus eu sapien"
              },
              {
                id: 'description',
                name: 'Description',
                type: 'text',
                editable: true,
                path: 'services.secondService.description',
                default: "Sed vitae felis in lorem mollis mollis eget in leo. Donec commodo, ex nec rutrum venenatis, nisi nisl malesuada magna, sed semper ipsum enim a ipsum. Aenean in ante vel mi molestie bibendum. Quisque sit amet lacus in diam pretium faucibus. Cras vel justo lorem."
              },
              {
                id: 'image',
                name: 'Image',
                type: 'image',
                editable: true,
                path: 'services.secondService.image',
                default: "img/second_service.jpg"
              },
              {
                id: 'buttonText',
                name: 'Button Text',
                type: 'text',
                editable: true,
                path: 'services.secondService.buttonText',
                default: "Continue Reading"
              },
              {
                id: 'buttonUrl',
                name: 'Button URL',
                type: 'url',
                editable: true,
                path: 'services.secondService.buttonUrl',
                default: "#4"
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
                title: "Number One",
                description: "Quisque sit amet lacus in diam pretium faucibus. Cras vel justo lorem.",
                thumbnail: "img/first_item.jpg",
                fullImage: "img/first_big_item.jpg"
              },
              {
                title: "Number Two",
                description: "Donec eget dictum tellus. Curabitur a interdum diam. Nulla vestibulum porttitor porta.",
                thumbnail: "img/second_item.jpg",
                fullImage: "img/second_big_item.jpg"
              },
              {
                title: "Number Three",
                description: "Cras varius dolor et augue fringilla, eu commodo sapien iaculis.",
                thumbnail: "img/third_item.jpg",
                fullImage: "img/third_big_item.jpg"
              },
              {
                title: "Number Four",
                description: "Vestibulum augue ex, finibus sit amet nisi id, maximus ultrices ipsum.",
                thumbnail: "img/fourth_item.jpg",
                fullImage: "img/fourth_big_item.jpg"
              },
              {
                title: "Fifth Item",
                description: "Donec commodo, ex nec rutrum venenatis, nisi nisl malesuada magna.",
                thumbnail: "img/fifth_item.jpg",
                fullImage: "img/fifth_big_item.jpg"
              },
              {
                title: "Sixth Item",
                description: "Maecenas dapibus neque sed nisl consectetur, id semper nisi egestas.",
                thumbnail: "img/sixth_item.jpg",
                fullImage: "img/sixth_big_item.jpg"
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
  const navigationItems = Array.isArray(processedConfig.navigation?.items) 
    ? processedConfig.navigation.items 
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
      background-color: #121212;
      overflow-x: hidden;
    }
    
    /* Navigation Styles */
    nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 999;
      background-color: rgba(22, 34, 57, 0.95);
      box-shadow: 0px 5px 15px rgba(0,0,0,0.5);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
    }
    
    nav .logo {
      display: flex;
      align-items: center;
    }
    
    nav .logo img {
      max-width: 50px;
      margin-right: 15px;
    }
    
    nav .mini-logo {
      display: none;
    }
    
    nav ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
    }
    
    nav ul li {
      display: inline-block;
    }
    
    nav ul li a {
      color: ${processedConfig.global.textColor};
      display: block;
      padding: 20px 15px;
      text-decoration: none;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;
    }
    
    nav ul li a:hover {
      background-color: rgba(250, 250, 250, 0.1);
      border-bottom: 3px solid ${processedConfig.global.primaryColor};
    }
    
    nav ul li a.active {
      background-color: rgba(250, 250, 250, 0.1);
      border-bottom: 3px solid ${processedConfig.global.primaryColor};
    }
    
    nav ul li a i {
      margin-right: 8px;
      font-size: 16px;
    }
    
    /* Other CSS styles from the original template... */
    ${sectionGuideStyles}
  </style>
</head>
<body>
  <!-- Navigation -->
  ${wrapWithGuide('Navigation', `
  <nav>
    ${wrapElementWithGuide('Logo', `
      <div class="logo">
        <img src="${processedConfig.navigation.logo}" alt="Logo">
        <span class="logo-text">${processedConfig.home.title}</span>
      </div>
    `)}
    <ul>
      ${safeMapItems(navigationItems, (item, index) => `
        <li>
          <a href="${item.url}" ${index === 0 ? 'class="active"' : ''}>
            <i class="${item.icon}"></i> <em>${item.text}</em>
          </a>
        </li>
      `)}
    </ul>
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
              <img src="${processedConfig.home.authorImage}" alt="Author">
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
          ${wrapElementWithGuide('Main Button', `
            <div class="main-btn">
              <a href="${processedConfig.home.mainButtonUrl}">${processedConfig.home.mainButtonText}</a>
            </div>
          `)}
          ${wrapElementWithGuide('Secondary Button', `
            <div class="fb-btn">
              <a href="${processedConfig.home.secondaryButtonUrl}" rel="nofollow">${processedConfig.home.secondaryButtonText}</a>
            </div>
          `)}
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
            <div class="service-content">
              <h3>${processedConfig.services.firstService.title}</h3>
              <p>${processedConfig.services.firstService.description}</p>
              <div class="main-btn">
                <a href="${processedConfig.services.firstService.buttonUrl}">${processedConfig.services.firstService.buttonText}</a>
              </div>
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
            <div class="service-content">
              <h3>${processedConfig.services.secondService.title}</h3>
              <p>${processedConfig.services.secondService.description}</p>
              <div class="main-btn">
                <a href="${processedConfig.services.secondService.buttonUrl}">${processedConfig.services.secondService.buttonText}</a>
              </div>
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
                <a href="${processedConfig.about.buttonUrl}">${processedConfig.about.buttonText}</a>
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
      // Smooth scrolling for navigation links
      $('nav ul li a').on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          
          // Add active class to clicked link and remove from others
          $('nav ul li a').removeClass('active');
          $(this).addClass('active');
          
          // Smooth scroll to the target section
          $('html, body').animate({
            scrollTop: $(hash).offset().top - $('nav').outerHeight()
          }, 800);
        }
      });
      
      // Add active class based on scroll position
      $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop() + $('nav').outerHeight();
        
        // Check each section
        $('section').each(function() {
          var topDistance = $(this).offset().top;
          
          if (topDistance - 10 < scrollPosition && topDistance + $(this).outerHeight() > scrollPosition) {
            // Remove active from all links
            $('nav ul li a').removeClass('active');
            
            // Add active class to corresponding link
            $('nav ul li a[href="#' + $(this).attr('id') + '"]').addClass('active');
          }
        });
      });
    });
  </script>
</body>
</html>`;
}

export default moonlightTemplate;