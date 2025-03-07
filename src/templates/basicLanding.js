// Default configuration for the Sophisticated Website template
const basicTemplate = {
  header: {
    title: "Modern Business Website",
    backgroundColor: "#4a90e2",
    textColor: "#ffffff",
    logoText: "YourBrand"
  },
  hero: {
    heading: "Transform Your Business Today",
    subheading: "We help companies achieve their goals with innovative solutions and strategic planning",
    backgroundColor: "#f8f9fa",
    textColor: "#333333",
    buttonText: "Get Started",
    buttonColor: "#4a90e2",
    backgroundImage: "https://source.unsplash.com/random/1600x900/?business"
  },
  benefits: {
    title: "Why Choose Us",
    subtitle: "What makes us different",
    backgroundColor: "#ffffff",
    textColor: "#333333",
    items: [
      {
        icon: "ni ni-check-bold",
        title: "Premium Quality",
        description: "Our solutions are built with the highest standards in mind.",
        iconColor: "#5e72e4"
      },
      {
        icon: "ni ni-istanbul",
        title: "Innovative Approach",
        description: "We use cutting-edge technologies to solve complex problems.",
        iconColor: "#11cdef"
      },
      {
        icon: "ni ni-planet",
        title: "Global Reach",
        description: "Our services are available worldwide with local support.",
        iconColor: "#fb6340"
      }
    ]
  },
  features: {
    title: "Our Features",
    subtitle: "What we offer",
    backgroundColor: "#f8f9fa",
    textColor: "#333333",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        icon: "fas fa-cog",
        title: "Customized Solutions",
        description: "Tailored specifically to your business needs."
      },
      {
        icon: "fas fa-code",
        title: "Modern Technology",
        description: "Using the latest tools and frameworks."
      },
      {
        icon: "fas fa-smile",
        title: "Dedicated Support",
        description: "Our team is always ready to help you succeed."
      }
    ]
  },
  callToAction: {
    title: "Ready to get started?",
    subtitle: "Contact us today to transform your business",
    backgroundColor: "#4a90e2",
    textColor: "#ffffff",
    buttonText: "Contact Us",
    buttonColor: "#ffffff",
    buttonTextColor: "#4a90e2"
  },
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
      { text: "Privacy Policy", url: "#" }
    ]
  }
};

// Function to generate HTML from the template configuration
export function generateHTML(config) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.header.title}</title>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
  <link href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      font-family: 'Open Sans', sans-serif;
      margin: 0;
      padding: 0;
      color: #333;
    }
    
    /* Header Styles */
    .navbar {
      background-color: ${config.header.backgroundColor};
      padding: 1rem 2rem;
    }
    
    .navbar-brand {
      color: ${config.header.textColor};
      font-weight: 600;
      font-size: 1.5rem;
    }
    
    .navbar-nav .nav-link {
      color: ${config.header.textColor};
      opacity: 0.8;
      transition: opacity 0.3s;
    }
    
    .navbar-nav .nav-link:hover {
      opacity: 1;
    }
    
    /* Hero Section */
    .hero {
      background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${config.hero.backgroundImage}');
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
      color: ${config.hero.textColor || '#ffffff'};
      line-height: 1.2;
    }
    
    .hero p {
      font-size: 1.25rem;
      margin-bottom: 2.5rem;
      color: ${config.hero.textColor || '#ffffff'};
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
    }
    
    .hero .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
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
      background-color: ${config.benefits.backgroundColor};
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
      background-color: rgba(0, 0, 0, 0.05);
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
      background-color: ${config.features.backgroundColor};
    }

    .features .section-title {
      text-align: left;
      margin-bottom: 2rem;
    }
    
    .features .feature-item {
      display: flex;
      margin-bottom: 2rem;
      align-items: flex-start;
    }
    
    .features .feature-icon {
      padding-left: 1rem;
      padding-right: 1rem;
      min-width: 50px;
      color: ${config.header.backgroundColor};
      font-size: 2rem;
    }
    
    .features .feature-content h4 {
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .features .feature-content p {
      color: #6c757d;
      margin-bottom: 0;
    }
    
    .features img {
      border-radius: 8px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-height: 500px;
    }
    
    .features .img-container {
      height: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    /* Call to Action */
    .cta {
      padding: 5rem 0;
      background-color: ${config.callToAction.backgroundColor};
      color: ${config.callToAction.textColor};
      text-align: center;
    }

    .cta .section-title {
      margin-bottom: 2rem;
    }

    .cta .section-title p {
      color: white;
      margin-left: auto;
      margin-right: auto;
    }
    
    /* Footer */
    footer {
      background-color: ${config.footer.backgroundColor};
      color: ${config.footer.textColor};
      padding: 4rem 0 2rem;
    }
    
    footer h5 {
      color: #fff;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    
    footer .social-links a {
      display: inline-block;
      width: 36px;
      height: 36px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      line-height: 36px;
      text-align: center;
      margin-right: 10px;
      color: #fff;
      transition: all 0.3s;
    }
    
    footer .social-links a:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    footer .footer-links {
      list-style: none;
      padding-left: 0;
    }
    
    footer .footer-links li {
      margin-bottom: 10px;
    }
    
    footer .footer-links a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color 0.3s;
    }
    
    footer .footer-links a:hover {
      color: #fff;
    }
    
    .copyright {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      color: rgba(255, 255, 255, 0.7);
    }
    
    /* Buttons */
    .btn-primary {
      background-color: ${config.hero.buttonColor};
      border-color: ${config.hero.buttonColor};
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      border-radius: 0.375rem;
    }
    
    .btn-primary:hover {
      background-color: ${config.hero.buttonColor}dd;
      border-color: ${config.hero.buttonColor}dd;
    }
    
    .btn-outline-light {
      color: ${config.callToAction.buttonTextColor};
      border-color: ${config.callToAction.buttonColor};
      background-color: ${config.callToAction.buttonColor};
      padding: 0.75rem 1.5rem;
      font-weight: 600;
      border-radius: 0.375rem;
    }
    
    .btn-outline-light:hover {
      background-color: transparent;
      color: ${config.callToAction.buttonColor};
    }
    
    /* Utilities */
    .section-title h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .section-title h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .section-title p {
      font-size: 1.1rem;
      color: #6c757d;
      max-width: 700px;
    }
    
  </style>
</head>
<body>
  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="#">${config.header.logoText}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#benefits">Benefits</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#features">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#footer">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-shape"></div>
    <div class="hero-shape-2"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="hero-content">
            <h1>${config.hero.heading}</h1>
            <p>${config.hero.subheading}</p>
            <a href="#contact" class="btn btn-primary">${config.hero.buttonText}</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Benefits Section -->
  <section id="benefits" class="benefits">
    <div class="container">
      <div class="section-title">
        <h2>${config.benefits.title}</h2>
        <p>${config.benefits.subtitle}</p>
      </div>
      <div class="row">
        ${config.benefits.items.map(item => `
          <div class="col-md-4 mb-4">
            <div class="feature-card shadow-sm">
              <div class="icon" style="background-color: ${item.iconColor}20;">
                <i class="${item.icon}" style="color: ${item.iconColor}; font-size: 1.5rem;"></i>
              </div>
              <div class="section-title">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="features">
    <div class="container">
      <div class="section-title">
        <h2>${config.features.title}</h2>
        <p>${config.features.subtitle}</p>
      </div>
      
      <div class="row">
        <div class="col-lg-6 mb-4">
          <div class="img-container">
            <img src="${config.features.image}" alt="Features" class="img-fluid">
          </div>
        </div>
        <div class="col-lg-6">
          ${config.features.items.map(item => `
            <div class="feature-item">
              <div class="feature-icon">
                <i class="${item.icon}" style="color: ${config.header.backgroundColor};"></i>
              </div>
              <div class="feature-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action -->
  <section class="cta">
    <div class="container">
      <div class="section-title">
        <h2>${config.callToAction.title}</h2>
        <p class="mb-4">${config.callToAction.subtitle}</p>
        <a href="#contact" class="btn btn-outline-light">${config.callToAction.buttonText}</a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer id="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mb-4 mb-lg-0">
          <h5>About Us</h5>
          <p>We are a team of passionate professionals dedicated to helping businesses grow and succeed in the digital age.</p>
          <div class="social-links">
            <a href="${config.footer.socialLinks.facebook}"><i class="fab fa-facebook-f"></i></a>
            <a href="${config.footer.socialLinks.twitter}"><i class="fab fa-twitter"></i></a>
            <a href="${config.footer.socialLinks.instagram}"><i class="fab fa-instagram"></i></a>
            <a href="${config.footer.socialLinks.linkedin}"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="col-lg-4 mb-4 mb-lg-0">
          <h5>Quick Links</h5>
          <ul class="footer-links">
            ${config.footer.links.map(link => `
              <li><a href="${link.url}">${link.text}</a></li>
            `).join('')}
          </ul>
        </div>
        <div class="col-lg-4">
          <h5>Contact Info</h5>
          <p><i class="fas fa-map-marker-alt mr-2"></i> 123 Business Street, New York, NY</p>
          <p><i class="fas fa-phone mr-2"></i> (123) 456-7890</p>
          <p><i class="fas fa-envelope mr-2"></i> info@yourbrand.com</p>
        </div>
      </div>
    </div>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
  `;
}

export default basicTemplate; 