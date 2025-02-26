// Default configuration for the Hello World template
const helloWorldTemplate = {
  header: {
    title: "Hello World Website",
    backgroundColor: "#4a90e2",
    textColor: "#ffffff"
  },
  hero: {
    heading: "Welcome to my website",
    subheading: "This is a simple website created with Website Chat Editor",
    backgroundColor: "#f5f5f5",
    textColor: "#333333",
    buttonText: "Learn More",
    buttonColor: "#4a90e2"
  },
  footer: {
    text: "© 2025 Website Chat Editor",
    backgroundColor: "#333333",
    textColor: "#ffffff"
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
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    
    header {
      background-color: ${config.header.backgroundColor};
      color: ${config.header.textColor};
      padding: 1rem;
      text-align: center;
    }
    
    .hero {
      background-color: ${config.hero.backgroundColor};
      color: ${config.hero.textColor};
      padding: 4rem 2rem;
      text-align: center;
    }
    
    .hero h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .hero p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    
    .hero button {
      background-color: ${config.hero.buttonColor};
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1rem;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
    }
    
    footer {
      background-color: ${config.footer.backgroundColor};
      color: ${config.footer.textColor};
      padding: 1rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <header>
    <h1>${config.header.title}</h1>
  </header>
  
  <section class="hero">
    <h1>${config.hero.heading}</h1>
    <p>${config.hero.subheading}</p>
    <button>${config.hero.buttonText}</button>
  </section>
  
  <footer>
    <p>${config.footer.text}</p>
  </footer>
</body>
</html>
  `;
}

export default helloWorldTemplate;