import { getTemplateRegistryByConfig } from '../templates/templateRegistry';
import axios from 'axios';

// Backend API URL - adjust based on your deployment
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

// Generate a unique site ID that will persist across updates
function generateSiteId() {
  return `site-${Math.random().toString(36).substring(2, 9)}`;
}

// For the POC, we'll simulate deployment without actually deploying
// In a real implementation, this would connect to Netlify, Vercel, or another hosting service API
export async function deployWebsite(websiteConfig, userEmail) {
  try {
    // Get the appropriate template registry entry for this config
    const templateEntry = getTemplateRegistryByConfig(websiteConfig);
    
    // Use existing site ID or generate a new one
    const siteName = websiteConfig._siteId || generateSiteId();
    console.log('siteName', siteName);
    
    // Generate the deployable HTML using the identified template function
    const html = templateEntry.generateHTML(websiteConfig, false);
    
    // Call the backend API
    const response = await axios.post(`${API_URL}/deploy`, {
      html: html,
      siteName: siteName,
      templateId: templateEntry.id,
      userEmail: userEmail,
      isUpdate: !!websiteConfig._siteId
    });
    
    // Ensure the siteId is saved in the config for future updates
    if (!websiteConfig._siteId) {
      websiteConfig._siteId = siteName;
      // You might want to trigger a config update here to persist the siteId
      if (typeof websiteConfig.onConfigUpdate === 'function') {
        websiteConfig.onConfigUpdate(websiteConfig);
      }
    }
    
    return {
      success: true,
      url: response.data.url,
      deploymentId: response.data.id,
      templateUsed: templateEntry.name,
      siteId: siteName,
      isUpdate: !!websiteConfig._siteId
    };
  } catch (error) {
    console.error('Deployment failed:', error.response?.data || error.message);
    throw new Error('Failed to deploy website: ' + (error.response?.data?.error || error.message));
  }
}