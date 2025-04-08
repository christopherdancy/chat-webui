const axios = require('axios');
require('dotenv').config();

// Serverless function for Vercel
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request (for CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { html, siteName } = req.body;
    
    if (!html || !siteName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
    const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;
    
    if (!VERCEL_TOKEN) {
      return res.status(500).json({ error: 'Vercel API token not configured' });
    }
    
    // Sanitize the site name for use in the URL
    const sanitizedName = siteName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const headers = {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json'
    };
    
    // Add team ID if available
    const params = VERCEL_TEAM_ID ? { teamId: VERCEL_TEAM_ID } : {};
    
    // Step 1: Create or get project
    let projectId;
    try {
      // Try to create a new project
      const projectResponse = await axios.post(
        'https://api.vercel.com/v9/projects',
        {
          name: sanitizedName,
          framework: null
        },
        { headers, params }
      );
      projectId = projectResponse.data.id;
      console.log('Created new project:', projectId);
      
      // Set project visibility to public in a separate request
      await axios.patch(
        `https://api.vercel.com/v9/projects/${projectId}`,
        { 
          publicSource: true
        },
        { headers, params }
      );
    } catch (error) {
      // If project already exists, try to get it
      if (error.response?.status === 409) {
        const getProjectResponse = await axios.get(
          `https://api.vercel.com/v9/projects/${sanitizedName}`,
          { headers, params }
        );
        projectId = getProjectResponse.data.id;
        
        // Update project to be public
        await axios.patch(
          `https://api.vercel.com/v9/projects/${projectId}`,
          { 
            publicSource: true
          },
          { headers, params }
        );
      } else {
        throw error;
      }
    }
    
    // Step 2: Create deployment for the project
    const deploymentData = {
      name: sanitizedName,
      files: [
        {
          file: 'index.html',
          data: Buffer.from(html).toString('base64'),
          encoding: 'base64'
        }
      ],
      target: 'production'
    };
    
    // Add projectId as a query parameter
    const deployParams = {
      ...params,
      projectId: projectId
    };
    
    const response = await axios.post(
      'https://api.vercel.com/v13/deployments',
      deploymentData,
      { headers, params: deployParams }
    );
    
    // Return deployment details to the client with the production alias
    const productionUrl = response.data.alias && response.data.alias.length > 0
      ? `https://${response.data.alias[0]}`
      : response.data.url;

    return res.json({
      id: response.data.id,
      url: productionUrl,
      readyState: response.data.readyState
    });
  } catch (error) {
    console.error('Deployment error:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Deployment failed', 
      details: error.response?.data || error.message 
    });
  }
}; 