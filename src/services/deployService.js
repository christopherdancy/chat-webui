import { generateHTML } from '../templates/basicLanding';
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
    
    // Generate the deployable HTML using the imported template function
    const html = generateHTML(websiteConfig);
    
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