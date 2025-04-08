const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' })); // Increased limit for HTML content

// Deployment endpoint
app.post('/api/deploy', async (req, res) => {
  const { html, siteName, templateId, userEmail } = req.body;

  try {
    if (!html || !siteName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
    const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID; // Optional
    
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
      console.log('Set project to public');
    } catch (error) {
      // If project already exists, try to get it
      if (error.response?.status === 409) {
        const getProjectResponse = await axios.get(
          `https://api.vercel.com/v9/projects/${sanitizedName}`,
          { headers, params }
        );
        projectId = getProjectResponse.data.id;
        console.log('Using existing project:', projectId);
        
        // Update project to be public
        await axios.patch(
          `https://api.vercel.com/v9/projects/${projectId}`,
          { 
            publicSource: true
          },
          { headers, params }
        );
        console.log('Updated project to be public');
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
    // console.log('Deployment created successfully');
    // console.log('Deployment URL:', response.data.url);
    // console.log('Aliases:', response.data.alias);
    
    // Return deployment details to the client with the production alias
    const productionUrl = response.data.alias && response.data.alias.length > 0
      ? `https://${response.data.alias[0]}`
      : response.data.url;

    // Send email notification in the background
    if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
      try {
        const msg = {
          to: process.env.INTERNAL_TEAM_EMAIL,
          from: process.env.SENDGRID_FROM_EMAIL,
          subject: 'New Website Deployment',
          html: `
            <h2>New Website Deployment</h2>
            <p><strong>User Email:</strong> ${userEmail}</p>
            <p><strong>Website URL:</strong> <a href="${productionUrl}">${productionUrl}</a></p>
            <p><strong>Template Used:</strong> ${templateId}</p>
            <p><strong>Deployment Time:</strong> ${new Date().toLocaleString()}</p>
          `
        };
        await sgMail.send(msg);
        console.log('Deployment notification email sent successfully');
      } catch (emailError) {
        // Log email error but don't affect the deployment response
        console.error('Failed to send deployment notification email:', emailError);
      }
    }

    res.json({
      id: response.data.id,
      url: productionUrl,
      readyState: response.data.readyState
    });
  } catch (error) {
    console.error('Deployment error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Deployment failed', 
      details: error.response?.data || error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Add this after your API routes
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build
  app.use(express.static(path.join(__dirname, '../build')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 