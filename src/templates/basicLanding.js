// Default configuration for the Basic Business Website template
const basicTemplate = {
  // Global settings
  global: {
    primaryColor: "#4a90e2",
    secondaryColor: "#f8f9fa",
    textColor: "#333333",
    accentColor: "#5e72e4",
    fontFamily: "'Open Sans', sans-serif"
  },
  
  // Header section
  header: {
    title: "Modern Business Website",
    backgroundColor: "#4a90e2", // Uses global.primaryColor by default
    textColor: "#ffffff",
    logoText: "YourBrand",
    menuItems: [
      { text: "Benefits", url: "#benefits" },
      { text: "Features", url: "#features" },
      { text: "Contact", url: "#footer" }
    ]
  },
  
  // Hero section
  hero: {
    title: "Transform Your Business Today",
    subtitle: "We help companies achieve their goals with innovative solutions and strategic planning",
    backgroundColor: "#f8f9fa", // Uses global.secondaryColor by default
    textColor: "#333333", // Uses global.textColor by default
    buttonText: "Get Started",
    buttonColor: "#4a90e2", // Uses global.primaryColor by default
    buttonTextColor: "#ffffff",
    backgroundImage: "https://source.unsplash.com/random/1600x900/?business"
  },
  
  // Benefits section
  benefits: {
    title: "Why Choose Us",
    subtitle: "What makes us different",
    backgroundColor: "#ffffff",
    textColor: "#333333", // Uses global.textColor by default
    items: [
      {
        icon: "fas fa-check",
        title: "Premium Quality",
        description: "Our solutions are built with the highest standards in mind.",
        iconColor: "#4a90e2" // Uses global.primaryColor by default
      },
      {
        icon: "fas fa-chart-line",
        title: "Innovative Approach",
        description: "We use cutting-edge technologies to solve complex problems.",
        iconColor: "#4a90e2" // Uses global.primaryColor by default
      },
      {
        icon: "fas fa-globe",
        title: "Global Reach",
        description: "Our services are available worldwide with local support.",
        iconColor: "#4a90e2" // Uses global.primaryColor by default
      }
    ]
  },
  
  // Features section
  features: {
    title: "Our Features",
    subtitle: "What we offer",
    backgroundColor: "#f8f9fa", // Uses global.secondaryColor by default
    textColor: "#333333", // Uses global.textColor by default
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        icon: "fas fa-cog",
        title: "Customized Solutions",
        description: "Tailored specifically to your business needs.",
        iconColor: "#4a90e2" // Uses global.primaryColor by default
      },
      {
        icon: "fas fa-code",
        title: "Modern Technology",
        description: "Using the latest tools and frameworks.",
        iconColor: "#4a90e2" // Uses global.primaryColor by default
      },
      {
        icon: "fas fa-smile",
        title: "Dedicated Support",
        description: "Our team is always ready to help you succeed.",
        iconColor: "#4a90e2" // Uses global.primaryColor by default
      }
    ]
  },
  
  // Call to Action section
  callToAction: {
    title: "Ready to get started?",
    subtitle: "Contact us today to transform your business",
    backgroundColor: "#4a90e2", // Uses global.primaryColor by default
    textColor: "#ffffff",
    buttonText: "Contact Us",
    buttonColor: "#ffffff",
    buttonTextColor: "#4a90e2" // Uses global.primaryColor by default
  },
  
  // Footer section
  footer: {
    text: "© 2025 YourBrand. All rights reserved.",
    backgroundColor: "#2d3748",
    textColor: "#ffffff",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#"
    },
    links: [
      { text: "About Us", url: "#" },
      { text: "Services", url: "#" },
      { text: "Contact", url: "#" },
    ]
  }
};

// Function to generate HTML from the template configuration
export function generateHTML(config, showGuides = false) {
  // Apply global defaults if specific values aren't provided
  const processedConfig = {
    ...config,
    header: {
      ...config.header,
      backgroundColor: config.header.backgroundColor || config.global.primaryColor,
      textColor: config.header.textColor || "#ffffff"
    },
    hero: {
      ...config.hero,
      backgroundColor: config.hero.backgroundColor || config.global.secondaryColor,
      textColor: config.hero.textColor || config.global.textColor,
      buttonColor: config.hero.buttonColor || config.global.primaryColor
    },
    benefits: {
      ...config.benefits,
      backgroundColor: config.benefits.backgroundColor || "#ffffff",
      textColor: config.benefits.textColor || config.global.textColor,
      items: config.benefits.items.map(item => ({
        ...item,
        iconColor: item.iconColor || config.global.primaryColor
      }))
    },
    features: {
      ...config.features,
      backgroundColor: config.features.backgroundColor || config.global.secondaryColor,
      textColor: config.features.textColor || config.global.textColor,
      items: config.features.items.map(item => ({
        ...item,
        iconColor: item.iconColor || config.global.primaryColor
      }))
    },
    callToAction: {
      ...config.callToAction,
      backgroundColor: config.callToAction.backgroundColor || config.global.primaryColor,
      buttonTextColor: config.callToAction.buttonTextColor || config.global.primaryColor
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
      background-color: rgba(0, 100, 255, 0.7);
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
  <title>${processedConfig.header.title}</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
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
    }
    
    /* Header Styles */
    .navbar {
      background-color: ${processedConfig.header.backgroundColor};
      padding: 1rem 2rem;
    }
    
    .navbar-brand {
      color: ${processedConfig.header.textColor};
      font-weight: 600;
      font-size: 1.5rem;
    }
    
    .navbar-nav .nav-link {
      color: ${processedConfig.header.textColor};
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    
    .navbar-nav .nav-link:hover {
      opacity: 1;
    }
    
    /* Hero Section */
    .hero {
      background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${processedConfig.hero.backgroundImage}');
      background-size: cover;
      background-position: center;
      padding: 5rem 0;
      position: relative;
      overflow: hidden;
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
      background-color: ${processedConfig.hero.buttonColor};
      color: ${processedConfig.hero.buttonTextColor || '#ffffff'};
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
      background-color: ${processedConfig.benefits.backgroundColor};
    }
    
    .benefits .section-title {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .benefits .section-title p {
      margin-left: auto;
      margin-right: auto;
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
      background-color: ${processedConfig.global.primaryColor}20;
    }
    
    .benefits .icon i {
      color: ${processedConfig.global.primaryColor};
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
      background-color: ${processedConfig.features.backgroundColor};
    }

    .features .section-title {
      text-align: left;
      margin-bottom: 3rem;
    }
    
    .features .section-title h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: ${processedConfig.features.textColor};
    }
    
    .features .section-title p {
      font-size: 1.2rem;
      color: ${processedConfig.features.textColor};
      opacity: 0.8;
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
      color: ${processedConfig.features.textColor};
    }
    
    .features .feature-content p {
      color: ${processedConfig.features.textColor};
      opacity: 0.8;
      margin-bottom: 0;
    }
    
    /* Call to Action */
    .cta {
      background-color: ${processedConfig.callToAction.backgroundColor};
      color: ${processedConfig.callToAction.textColor};
      padding: 4rem 0;
      text-align: center;
    }
    
    .cta .section-title {
      margin-bottom: 2rem;
    }
    
    .cta .section-title h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: ${processedConfig.callToAction.textColor};
    }
    
    .cta .section-title p {
      font-size: 1.2rem;
      color: ${processedConfig.callToAction.textColor};
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
      background-color: ${processedConfig.callToAction.buttonColor};
      color: ${processedConfig.callToAction.buttonTextColor};
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
      background-color: ${processedConfig.footer.backgroundColor};
      color: ${processedConfig.footer.textColor};
      padding: 4rem 0 2rem;
    }
    
    #footer h5 {
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: ${processedConfig.footer.textColor};
    }
    
    #footer p {
      color: ${processedConfig.footer.textColor};
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
      color: ${processedConfig.footer.textColor};
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
      color: ${processedConfig.footer.textColor};
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
    
    .btn-primary:hover, .btn-primary:focus {
      background-color: ${processedConfig.global.primaryColor};
      border-color: ${processedConfig.global.primaryColor};
      opacity: 0.9;
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
      ${wrapElementWithGuide('Logo Text', `
        <a class="navbar-brand" href="#">${processedConfig.header.logoText}</a>
      `)}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          ${processedConfig.header.menuItems.map((item, index) => `
              <li class="nav-item">
                <a class="nav-link" href="${item.url}">${item.text}</a>
              </li>
          `).join('')}
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
            ${wrapElementWithGuide('Hero Title', `
              <h1>${processedConfig.hero.title}</h1>
            `)}
            ${wrapElementWithGuide('Hero Subtitle', `
              <p>${processedConfig.hero.subtitle}</p>
            `)}
            ${wrapElementWithGuide('Hero Button', `
              <a href="#contact" class="btn btn-primary">${processedConfig.hero.buttonText}</a>
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
        ${wrapElementWithGuide('Benefits Title', `
          <h2>${processedConfig.benefits.title}</h2>
        `)}
        ${wrapElementWithGuide('Benefits Subtitle', `
          <p>${processedConfig.benefits.subtitle}</p>
        `)}
      </div>
      <div class="row">
        ${processedConfig.benefits.items.map((item, index) => `
          <div class="col-md-4 mb-4">
            ${wrapElementWithGuide(`Benefit ${index + 1}`, `
              <div class="feature-card shadow-sm">
                <div class="icon">
                  <i class="${item.icon}"></i>
                </div>
                ${wrapElementWithGuide(`Benefit ${index + 1} Title`, `
                  <h4>${item.title}</h4>
                `)}
                ${wrapElementWithGuide(`Benefit ${index + 1} Description`, `
                  <p>${item.description}</p>
                `)}
              </div>
            `)}
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  `)}

  <!-- Features Section -->
  ${wrapWithGuide('Features', `
  <section id="features" class="features">
    <div class="container">
      <div class="section-title">
        ${wrapElementWithGuide('Features Title', `
          <h2>${processedConfig.features.title}</h2>
        `)}
        ${wrapElementWithGuide('Features Subtitle', `
          <p>${processedConfig.features.subtitle}</p>
        `)}
      </div>
      
      <div class="row">
        <div class="col-lg-6 mb-4 mb-lg-0">
          ${wrapElementWithGuide('Features Image', `
            <img src="${processedConfig.features.image}" alt="Features" class="img-fluid">
          `)}
        </div>
        <div class="col-lg-6">
          ${processedConfig.features.items.map((item, index) => `
            ${wrapElementWithGuide(`Feature ${index + 1}`, `
              <div class="feature-item">
                <div class="feature-icon">
                  <i class="${item.icon}"></i>
                </div>
                <div class="feature-content">
                  ${wrapElementWithGuide(`Feature ${index + 1} Title`, `
                    <h4>${item.title}</h4>
                  `)}
                  ${wrapElementWithGuide(`Feature ${index + 1} Description`, `
                    <p>${item.description}</p>
                  `)}
                </div>
              </div>
            `)}
          `).join('')}
        </div>
      </div>
    </div>
  </section>
  `)}

  <!-- Call to Action -->
  ${wrapWithGuide('Call to Action', `
  <section class="cta">
    <div class="container">
      <div class="section-title">
        ${wrapElementWithGuide('CTA Title', `
          <h2>${processedConfig.callToAction.title}</h2>
        `)}
        ${wrapElementWithGuide('CTA Subtitle', `
          <p>${processedConfig.callToAction.subtitle}</p>
        `)}
      </div>
      ${wrapElementWithGuide('CTA Button', `
        <a href="#contact" class="btn">${processedConfig.callToAction.buttonText}</a>
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
          ${wrapElementWithGuide('About Us Title', `
            <h5>About Us</h5>
          `)}
          ${wrapElementWithGuide('About Us Text', `
            <p>We are a team of passionate professionals dedicated to helping businesses grow and succeed in the digital age.</p>
          `)}
          <div class="social-links">
            ${wrapElementWithGuide('Social Links', `
              <a href="${processedConfig.footer.socialLinks.facebook}"><i class="fab fa-facebook-f"></i></a>
              <a href="${processedConfig.footer.socialLinks.twitter}"><i class="fab fa-twitter"></i></a>
              <a href="${processedConfig.footer.socialLinks.instagram}"><i class="fab fa-instagram"></i></a>
              <a href="${processedConfig.footer.socialLinks.linkedin}"><i class="fab fa-linkedin-in"></i></a>
            `)}
          </div>
        </div>
        <div class="col-lg-4 mb-4 mb-lg-0">
          ${wrapElementWithGuide('Quick Links Title', `
            <h5>Quick Links</h5>
          `)}
          <ul class="footer-links">
            ${processedConfig.footer.links.map((link, index) => `
              ${wrapElementWithGuide(`Footer Link ${index + 1}`, `
                <li><a href="${link.url}">${link.text}</a></li>
              `)}
            `).join('')}
          </ul>
        </div>
        <div class="col-lg-4">
          ${wrapElementWithGuide('Contact Info Title', `
            <h5>Contact Info</h5>
          `)}
          ${wrapElementWithGuide('Contact Address', `
            <p><i class="fas fa-map-marker-alt mr-2"></i> 123 Business Street, New York, NY</p>
          `)}
          ${wrapElementWithGuide('Contact Phone', `
            <p><i class="fas fa-phone mr-2"></i> (123) 456-7890</p>
          `)}
          ${wrapElementWithGuide('Contact Email', `
            <p><i class="fas fa-envelope mr-2"></i> info@yourbrand.com</p>
          `)}
        </div>
      </div>
      <div class="copyright">
        ${wrapElementWithGuide('Copyright Text', `
          <p>${processedConfig.footer.text}</p>
        `)}
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