import React, { useState } from 'react';
import Chat from './components/Chat';
import WebsitePreview from './components/WebsitePreview';
import DeployButton from './components/DeployButton';
import basicTemplate from './templates/basicLanding';
import './styles.css';

function App() {
  const [error, setError] = useState(null);
  const [websiteConfig, setWebsiteConfig] = useState(() => {
    try {
      return basicTemplate;
    } catch (err) {
      setError('Failed to load template');
      return {};
    }
  });
  
  const handlePreviewUpdate = (updatedConfig) => {
    setWebsiteConfig(updatedConfig);
  };
  
  if (error) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>Error Loading Application</h1>
          <p>{error}</p>
        </header>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Website Chat Editor</h1>
        <p>Edit your website through chat and deploy it with one click</p>
      </header>
      
      <main className="app-content">
        <div className="left-panel">
          <Chat 
            onPreviewUpdate={handlePreviewUpdate}
            websiteConfig={websiteConfig}
          />
        </div>
        
        <div className="right-panel">
          <WebsitePreview config={websiteConfig} />
          <DeployButton websiteConfig={websiteConfig} />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Website Chat Editor POC &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App;