import { generateHTML as generateBasicHTML } from '../templates/basicLanding';
import { generateHTML as generateMoonlightHTML } from '../templates/moonlightTemplate';
import axios from 'axios';

// Backend API URL - adjust based on your deployment
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

// Helper function to determine which template's generateHTML to use
const getTemplateRenderer = (config) => {
  // Check specific properties or structure to identify the template
  if (config.navigation && config.navigation.items) {
    return generateMoonlightHTML; // Moonlight template has navigation.items
  }
  return generateBasicHTML; // Default to basic template
};

// For the POC, we'll simulate deployment without actually deploying
// In a real implementation, this would connect to Netlify, Vercel, or another hosting service API
export async function deployWebsite(websiteConfig) {
  try {
    // Determine website title based on template type
    const siteTitle = websiteConfig.navigation 
      ? websiteConfig.home.title  // Moonlight template
      : websiteConfig.header.title; // Basic template
    
    // Sanitize the site name for the URL
    const siteName = siteTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    // Get the appropriate HTML generator for this template
    const generateHTML = getTemplateRenderer(websiteConfig);
    
    // Generate the deployable HTML using the imported template function
    // Always pass false for showGuides to ensure guides are not included in deployed version
    const html = generateHTML(websiteConfig, false);
    
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