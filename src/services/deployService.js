import { getTemplateRegistryByConfig } from '../templates/templateRegistry';
import axios from 'axios';

// Backend API URL - adjust based on your deployment
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

// For the POC, we'll simulate deployment without actually deploying
// In a real implementation, this would connect to Netlify, Vercel, or another hosting service API
export async function deployWebsite(websiteConfig, userEmail) {
  try {
    // Get the appropriate template registry entry for this config
    const templateEntry = getTemplateRegistryByConfig(websiteConfig);
    
    // TODO: title should be based on user input
    // Determine website title based on template type
    let siteTitle = 'Website';
    if (templateEntry.id === 'landing_business') {
      siteTitle = websiteConfig.header?.title || 'Basic Website';
    } else if (templateEntry.id === 'portfolio_moonlight') {
      siteTitle = websiteConfig.home?.title || 'Moonlight Website';
    }
    
    // Sanitize the site name for the URL
    const siteName = siteTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Generate the deployable HTML using the identified template function
    // Always pass false for showGuides to ensure guides are not included in deployed version
    const html = templateEntry.generateHTML(websiteConfig, false);
    
    // Call the backend API
    const response = await axios.post(`${API_URL}/deploy`, {
      html: html,
      siteName: siteName,
      templateId: templateEntry.id,
      userEmail: userEmail
    });
    
    return {
      success: true,
      url: response.data.url,
      deploymentId: response.data.id,
      templateUsed: templateEntry.name
    };
  } catch (error) {
    console.error('Deployment failed:', error.response?.data || error.message);
    throw new Error('Failed to deploy website: ' + (error.response?.data?.error || error.message));
  }
}