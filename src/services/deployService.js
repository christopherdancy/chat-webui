// import { generateHTML } from '../templates/helloWorld';

import axios from 'axios';

// Backend API URL - adjust based on your deployment
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

// For the POC, we'll simulate deployment without actually deploying
// In a real implementation, this would connect to Netlify, Vercel, or another hosting service API
export async function deployWebsite(websiteConfig) {
  try {
    // Sanitize the site name for the URL
    const siteName = websiteConfig.header.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Generate the deployable HTML
    const html = generateDeployableHTML(websiteConfig);
    
    // Call the backend API
    const response = await axios.post(`${API_URL}/deploy`, {
      html: html,
      siteName: siteName
    });
    
    return {
      success: true,
      url: response.data.url,
      deploymentId: response.data.id
    };
  } catch (error) {
    console.error('Deployment failed:', error.response?.data || error.message);
    throw new Error('Failed to deploy website: ' + (error.response?.data?.error || error.message));
  }
}

// Generate a complete HTML file from the website configuration
function generateDeployableHTML(config) {
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