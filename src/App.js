import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import WebsitePreview from './components/WebsitePreview';
import DeployButton from './components/DeployButton';
import basicTemplate from './templates/basicLanding';
import './styles.css';

function App() {
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('websiteConfig');
    return savedConfig ? JSON.parse(savedConfig) : basicTemplate;
  });
  
  useEffect(() => {
    // Basic error boundary for the entire app
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error:', error);
      setError(`Error: ${message}`);
      return true;
    };

    // Log that the app has loaded
    console.log('App loaded successfully');
  }, []);

  const handlePreviewUpdate = (updatedConfig) => {
    setConfig(updatedConfig);
  };
  
  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Something went wrong</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload</button>
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
        <div className="left-panel" style={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
          <Chat 
            onPreviewUpdate={handlePreviewUpdate}
            websiteConfig={config}
            setConfig={setConfig}
          />
        </div>
        
        <div className="right-panel" style={{ height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'auto', minHeight: '500px' }}>
            <WebsitePreview config={config} setConfig={setConfig} />
          </div>
          <DeployButton websiteConfig={config} />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Website Chat Editor POC &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App; 