import React, { useState } from 'react';
import { deployWebsite } from '../services/deployService';

function DeployButton({ websiteConfig }) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState(null);
  const [deployUrl, setDeployUrl] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployStatus('Deploying your website...');
    setError(null);
    setShowModal(true);
    
    try {
      const result = await deployWebsite(websiteConfig);
      console.log('Deployment result:', result);
      
      setDeployStatus('Website deployed successfully!');
      setDeployUrl(result.url);
    } catch (error) {
      console.error('Deployment failed:', error);
      setDeployStatus('Deployment failed');
      setError(error.message || 'An unknown error occurred');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeployStatus(null);
    setDeployUrl('');
    setError(null);
  };
  
  return (
    <>
      <button 
        className="deploy-button-minimal"
        onClick={handleDeploy}
        disabled={isDeploying}
      >
        {isDeploying ? 'Publishing...' : 'Publish'}
      </button>

      {showModal && (
        <div className="retro-modal-overlay">
          <div className="retro-modal">
            <div className="retro-modal-header">
              <h3>Deployment Status</h3>
              <button className="retro-close-button" onClick={handleCloseModal}>×</button>
            </div>
            <div className="retro-modal-content">
              <div className={`deploy-status ${error ? 'deploy-error' : ''}`}>
                {deployStatus}
                {error && <p className="error-details">{error}</p>}
              </div>
              
              {deployUrl && (
                <div className="deploy-url">
                  <p>Your website is live at:</p>
                  <a href={deployUrl} target="_blank" rel="noopener noreferrer" className="retro-link">
                    {deployUrl}
                  </a>
                  <p className="deploy-note">
                    (It may take a few moments for the site to become available)
                  </p>
                </div>
              )}
            </div>
            <div className="retro-modal-footer">
              <button 
                className="retro-button"
                onClick={handleCloseModal}
              >
                Close
              </button>
              {deployUrl && (
                <a 
                  href={deployUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="retro-button"
                >
                  Visit Site
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeployButton;