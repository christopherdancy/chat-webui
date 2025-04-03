import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import WebsitePreview from './components/WebsitePreview';
import DeployButton from './components/DeployButton';
import basicTemplate from './templates/basicLanding';
import moonlightTemplate from './templates/moonlightTemplate';
import './styles.css';

// Simple Template Selector Component
const TemplateSelector = ({ currentTemplate, onTemplateSelect }) => {
  const templates = [
    { id: 'basic', name: 'Basic Business', template: basicTemplate },
    { id: 'moonlight', name: 'Moonlight', template: moonlightTemplate }
  ];
  
  return (
    <div className="template-selector">
      <label>Choose Template: </label>
      <select 
        value={currentTemplate.id || 'basic'} 
        onChange={(e) => {
          const selected = templates.find(t => t.id === e.target.value);
          if (selected) onTemplateSelect(selected.template, selected.id);
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
  const [templateId, setTemplateId] = useState('basic');
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
  
  const handleTemplateSelect = (templateConfig, id) => {
    if (window.confirm('Changing templates will reset all customizations. Are you sure?')) {
      setConfig(templateConfig);
      setTemplateId(id);
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
          currentTemplate={{ id: templateId }} 
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