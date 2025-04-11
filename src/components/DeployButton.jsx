import React, { useState } from 'react';
import { deployWebsite } from '../services/deployService';

function DeployButton({ websiteConfig }) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState(null);
  const [deployUrl, setDeployUrl] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  
  const handleDeploy = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsDeploying(true);
    setDeployStatus('Deploying your website...');
    setError(null);
    
    try {
      const result = await deployWebsite(websiteConfig, email);
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
    setEmail('');
  };
  
  return (
    <>
      <button 
        className="deploy-button-minimal"
        onClick={() => setShowModal(true)}
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
              {(!deployUrl && !deployStatus) && (
                <div className="email-form">
                  <p>Please enter your email to access your website link:</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="retro-input"
                  />
                  {error && <p className="error-details">{error}</p>}
                </div>
              )}
              
              {(deployStatus) && (
                <div className={`deploy-status ${error ? 'deploy-error' : ''}`}>
                  {deployStatus}
                  {error && <p className="error-details">{error}</p>}
                </div>
              )}
              
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
              {!deployUrl && (
                <button 
                  className="retro-button"
                  onClick={handleDeploy}
                  disabled={isDeploying}
                >
                  {isDeploying ? 'Publishing...' : 'Publish'}
                </button>
              )}
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