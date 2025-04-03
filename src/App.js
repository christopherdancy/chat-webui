import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import WebsitePreview from './components/WebsitePreview';
import DeployButton from './components/DeployButton';
import { getTemplateRegistry, createNewTemplate } from './templates/templateRegistry';
import './styles.css';

// Updated Template Selector Component to use the registry
const TemplateSelector = ({ currentTemplate, onTemplateSelect }) => {
  const templates = getTemplateRegistry();
  
  return (
    <div className="template-selector">
      <label>Choose Template: </label>
      <select 
        value={currentTemplate.id || 'basic'} 
        onChange={(e) => {
          const templateId = e.target.value;
          const newTemplate = createNewTemplate(templateId);
          onTemplateSelect(newTemplate, templateId);
        }}
      >
        {templates.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
    </div>
  );
};

function App() {
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(() => {
    try {
      const savedConfig = localStorage.getItem('websiteConfig');
      // If there's a saved config, use it
      if (savedConfig) {
        return JSON.parse(savedConfig);
      }
      // Otherwise create a new template from the default
      return createNewTemplate('basic');
    } catch (err) {
      console.error('Error loading config:', err);
      return createNewTemplate('basic');
    }
  });
  
  // Get the current template ID from the config or default to 'basic'
  const getCurrentTemplateId = () => {
    return config._templateId || 'basic';
  };
  
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
  
  const handleTemplateSelect = (templateConfig, id) => {
    if (window.confirm('Changing templates will reset all customizations. Are you sure?')) {
      setConfig(templateConfig);
      localStorage.setItem('websiteConfig', JSON.stringify(templateConfig));
    }
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
        <h1>VibeSite</h1>
        <p>Edit your website through chat and deploy it with one click</p>
        <TemplateSelector 
          currentTemplate={{ id: getCurrentTemplateId() }} 
          onTemplateSelect={handleTemplateSelect} 
        />
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
        <p>VibeSite POC &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App; 