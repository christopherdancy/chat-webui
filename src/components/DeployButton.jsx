import React, { useState } from 'react';
import { deployWebsite } from '../services/deployService';

function DeployButton({ websiteConfig }) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState(null);
  const [deployUrl, setDeployUrl] = useState('');
  
  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployStatus('Deploying your website...');
    
    try {
      // Call the deployment service
      const result = await deployWebsite(websiteConfig);
      console.log('Deployment result:', result);
      
      setDeployStatus('Website deployed successfully!');
      setDeployUrl(result.url);
    } catch (error) {
      console.error('Deployment failed:', error);
      setDeployStatus('Deployment failed. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };
  
  return (
    <div className="deploy-container">
      <button 
        className="deploy-button"
        onClick={handleDeploy}
        disabled={isDeploying}
      >
        {isDeploying ? 'Deploying...' : 'Deploy Website'}
      </button>
      
      {deployStatus && (
        <div className="deploy-status">
          {deployStatus}
        </div>
      )}
      
      {deployUrl && (
        <div className="deploy-url">
          <p>Your website is live at:</p>
          <a href={deployUrl} target="_blank" rel="noopener noreferrer">
            {deployUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default DeployButton;