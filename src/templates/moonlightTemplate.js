// Default configuration for the Moonlight Website template
const moonlightTemplate = {
  // Global settings
  global: {
    primaryColor: "#f5a425",
    secondaryColor: "#121212",
    textColor: "#ffffff",
    accentColor: "#33ccff",
    fontFamily: "'Open Sans', sans-serif"
  },
  
  // Navigation
  navigation: {
    logo: "img/logo.png",
    miniLogo: "img/mini_logo.png",
    items: [
      { text: "Home", url: "#1", icon: "fa fa-home" },
      { text: "Services", url: "#2", icon: "fa fa-support" },
      { text: "About", url: "#3", icon: "fa fa-user" },
      { text: "Portfolio", url: "#5", icon: "fa fa-image" },
      { text: "Contact", url: "#6", icon: "fa fa-envelope" }
    ]
  },
  
  // Home section
  home: {
    authorImage: "img/author_image.png",
    title: "Mingalar par",
    description: "Lorem ipsum <em>dolor sit amet</em>, consectetur adipiscing elit. <em>Sed vehicula blandit augue,</em> eu maximus odio tempus vitae.",
    mainButtonText: "Read More",
    mainButtonUrl: "#2",
    secondaryButtonText: "Our FB Page",
    secondaryButtonUrl: "https://fb.com/templatemo"
  },
  
  // About section
  about: {
    title: "About Us",
    description: "Please tell your friends about templatemo website. A variety of free CSS templates are available for immediate downloads.\n\nPhasellus vitae faucibus orci. Etiam eleifend orci sed faucibus semper. Cras varius dolor et augue fringilla, eu commodo sapien iaculis. Donec eget dictum tellus. <a href=\"#\">Curabitur</a> a interdum diam. Nulla vestibulum porttitor porta.\n\nNulla vitae interdum libero, vel posuere ipsum. Phasellus interdum est et dapibus tempus. Vestibulum malesuada lorem condimentum mauris ornare dapibus. Curabitur tempor ligula et <a href=\"#\">placerat</a> molestie.\n\nAliquam efficitur eu purus in interdum. <a href=\"#\">Etiam tincidunt</a> magna ex, sit amet lobortis felis bibendum id. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "img/about_image.jpg",
    buttonText: "Read More",
    buttonUrl: "#3"
  },
  
  // Services section
  services: {
    firstService: {
      title: "Quisque commodo quam",
      description: "Vestibulum augue ex, finibus sit amet nisi id, maximus ultrices ipsum. Maecenas rhoncus nibh in mauris lobortis, a maximus diam faucibus. In et eros urna. Suspendisse potenti. Pellentesque commodo, neque nec molestie tempus, purus ante feugiat augue.",
      image: "img/first_service.jpg",
      buttonText: "Continue Reading",
      buttonUrl: "#4"
    },
    secondService: {
      title: "Maecenas eu purus eu sapien",
      description: "Sed vitae felis in lorem mollis mollis eget in leo. Donec commodo, ex nec rutrum venenatis, nisi nisl malesuada magna, sed semper ipsum enim a ipsum. Aenean in ante vel mi molestie bibendum. Quisque sit amet lacus in diam pretium faucibus. Cras vel justo lorem.",
      image: "img/second_service.jpg",
      buttonText: "Continue Reading",
      buttonUrl: "#4"
    }
  },
  
  // Portfolio/Gallery section
  portfolio: {
    items: [
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
  },
  
  // Contact section
  contact: {
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3647.3030413476204!2d100.5641230193719!3d13.757206847615207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf51ce6427b7918fc!2sG+Tower!5e0!3m2!1sen!2sth!4v1510722015945",
    formFields: [
      { name: "name", type: "text", placeholder: "Your name...", required: true },
      { name: "email", type: "email", placeholder: "Your email...", required: true },
      { name: "subject", type: "text", placeholder: "Subject...", required: true },
      { name: "message", type: "textarea", placeholder: "Your message...", required: true, rows: 6 }
    ],
    buttonText: "Send Now"
  },
  
  // Footer section
  footer: {
    copyright: "Copyright © 2023 Company Name",
    templateAttribution: {
      text: "Template: Moonlight",
      url: "https://templatemo.com/tm-512-moonlight"
    }
  }
};

// Function to generate HTML from the template configuration
export function generateHTML(config, showGuides = false) {
  // Apply defaults and processing logic
  const processedConfig = {
    ...config,
    global: {
      ...config.global
    },
    navigation: {
      ...config.navigation
    },
    home: {
      ...config.home
    },
    about: {
      ...config.about
    },
    services: {
      ...config.services
    },
    portfolio: {
      ...config.portfolio
    },
    contact: {
      ...config.contact
    },
    footer: {
      ...config.footer
    }
  };

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

  // Generate navigation items HTML
  const navigationItems = processedConfig.navigation.items.map((item, index) => 
    wrapElementWithGuide(`Nav Item ${index + 1}`, 
      `<li><a href="${item.url}" ${index === 0 ? 'class="active"' : ''}><i class="${item.icon}"></i> <em>${item.text}</em></a></li>`
    )
  ).join('');

  // Generate portfolio items HTML
  const portfolioItems = processedConfig.portfolio.items.map((item, index) => 
    wrapElementWithGuide(`Portfolio Item ${index + 1}`, 
      `<div class="col-md-4 col-sm-6">
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
              <img src="${item.thumbnail}">
            </div>
          </div>
        </div>
      </div>`
    )
  ).join('');

  // Generate form fields HTML
  const formFields = processedConfig.contact.formFields.map((field, index) => 
    `<div class="col-md-12">
      <fieldset>
        ${field.type === 'textarea' ? 
          `<textarea name="${field.name}" rows="${field.rows}" class="form-control" id="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>` : 
          `<input name="${field.name}" type="${field.type}" class="form-control" id="${field.name}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`
        }
      </fieldset>
    </div>`
  ).join('');

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
    
    /* Sections */
    .section {
      padding: 100px 0;
      min-height: 100vh;
      background-color: ${processedConfig.global.secondaryColor};
    }
    
    .section:nth-child(odd) {
      background-color: rgba(22, 34, 57, 0.85);
    }
    
    .section:first-of-type {
      padding-top: 150px;
    }
    
    /* Author Image */
    .author-image {
      margin-bottom: 30px;
    }
    
    .author-image img {
      max-width: 200px;
      border-radius: 30px;
      padding: 8px;
      border: 1px solid #fff;
    }
    
    /* Slides */
    .slides {
      width: 100%;
      height: 100vh;
      display: flex;
      margin-left: 300px;
      transition: transform 0.5s;
    }
    
    .slide {
      width: 100%;
      height: 100vh;
      flex-shrink: 0;
      background-color: ${processedConfig.global.secondaryColor};
      overflow-y: auto;
    }
    
    /* Content Sections */
    .content {
      padding: 80px 30px;
      box-sizing: border-box;
      height: 100%;
    }
    
    .first-content {
      background-color: rgba(22, 34, 57, 0.85);
    }
    
    .second-content {
      padding-top: 120px;
    }
    
    .third-content {
      padding-top: 120px;
    }
    
    .fourth-content {
      background-color: rgba(22, 34, 57, 0.95);
      padding-top: 120px;
    }
    
    .fifth-content {
      background-color: rgba(22, 34, 57, 0.95);
      padding-top: 120px;
    }
    
    /* Button Styles */
    .main-btn {
      margin-top: 30px;
      margin-right: 15px;
      display: inline-block;
    }
    
    .main-btn a {
      display: inline-block;
      text-decoration: none;
      background-color: ${processedConfig.global.primaryColor};
      color: ${processedConfig.global.secondaryColor};
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 30px;
      transition: all 0.3s;
    }
    
    .main-btn a:hover {
      background-color: #fff;
      color: ${processedConfig.global.primaryColor};
    }
    
    .fb-btn {
      display: inline-block;
    }
    
    .fb-btn a {
      display: inline-block;
      text-decoration: none;
      background-color: #3b5998;
      color: #fff;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 30px;
      transition: all 0.3s;
    }
    
    .fb-btn a:hover {
      background-color: #fff;
      color: #3b5998;
    }
    
    /* About Section */
    .left-content {
      padding-right: 30px;
    }
    
    .right-image {
      padding-top: 45px;
    }
    
    .right-image img {
      width: 100%;
      border-radius: 5px;
    }
    
    /* Portfolio */
    .item {
      margin: 15px;
      margin-bottom: 30px;
    }
    
    .item .thumb {
      position: relative;
    }
    
    .item .thumb img {
      width: 100%;
      border-radius: 5px;
    }
    
    .item .thumb .hover-effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.7);
      border-radius: 5px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }
    
    .item .thumb:hover .hover-effect {
      opacity: 1;
      visibility: visible;
    }
    
    .item .hover-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 80%;
    }
    
    .item .hover-content h2 {
      font-size: 18px;
      color: ${processedConfig.global.primaryColor};
      font-weight: 600;
      margin-bottom: 15px;
    }
    
    .item .hover-content p {
      font-size: 13px;
      color: #fff;
    }
    
    /* Contact Form */
    #contact input, #contact textarea {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: none;
      border-radius: 4px;
      background-color: rgba(250, 250, 250, 0.1);
      color: #fff;
    }
    
    #contact button {
      background-color: ${processedConfig.global.primaryColor};
      color: #1e1e1e;
      font-weight: 600;
      padding: 12px 30px;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    #contact button:hover {
      background-color: #fff;
      color: ${processedConfig.global.primaryColor};
    }
    
    /* Footer */
    .footer {
      background-color: rgba(22, 34, 57, 0.95);
      padding: 30px 0;
      text-align: center;
      color: ${processedConfig.global.textColor};
    }
    
    .footer p {
      color: #fff;
      margin: 0;
    }
    
    .footer a {
      color: ${processedConfig.global.primaryColor};
      text-decoration: none;
    }
    
    /* Section Titles */
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 2rem;
      color: ${processedConfig.global.primaryColor};
      position: relative;
      display: inline-block;
      padding-bottom: 10px;
    }
    
    .section-title:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background-color: ${processedConfig.global.primaryColor};
    }
    
    /* Service Blocks */
    .service-content, .about-content {
      padding: 20px;
    }
    
    .service-image, .about-image {
      margin-bottom: 20px;
    }
    
    .service-content h3 {
      color: ${processedConfig.global.primaryColor};
      margin-bottom: 15px;
    }
    
    /* Portfolio Items */
    .portfolio-section .item {
      margin-bottom: 30px;
    }
    
    /* Responsive adjustments */
    @media screen and (max-width: 768px) {
      nav {
        flex-direction: column;
        padding: 10px;
      }
      
      nav .logo {
        margin-bottom: 15px;
      }
      
      nav ul {
        flex-wrap: wrap;
        justify-content: center;
      }
      
      nav ul li a {
        padding: 10px;
      }
      
      .section:first-of-type {
        padding-top: 200px;
      }
    }
    
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
      ${navigationItems}
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
        ${portfolioItems}
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
                ${formFields}
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