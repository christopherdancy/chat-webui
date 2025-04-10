import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import WebsitePreview from './components/WebsitePreview';
import DeployButton from './components/DeployButton';
import Header from './components/Header';
import MobileTabs from './components/MobileTabs';
import { getTemplateRegistry, createNewTemplate, getTemplateRegistryById } from './templates/templateRegistry';
import './styles.css';

// Updated to separate controls into a dedicated toolbar
const PreviewToolbar = ({ currentTemplate, onTemplateSelect, getCurrentTemplateId, websiteConfig }) => {
  const templates = getTemplateRegistry();
  
  return (
    <div className="preview-toolbar">
      <div className="toolbar-group">
        <span className="toolbar-label">Template:</span>
        <select 
          className="template-select"
          value={getCurrentTemplateId()} 
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
      
      <div className="toolbar-group">
        <DeployButton websiteConfig={websiteConfig} />
      </div>
    </div>
  );
};

function App() {
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [config, setConfig] = useState(() => {
    try {
      const savedConfig = localStorage.getItem('websiteConfig');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        // Preserve _siteId if it exists
        const siteId = parsedConfig._siteId;
        
        if (!parsedConfig._structure && parsedConfig._templateId) {
          console.log('Adding missing structure to saved config');
          const template = getTemplateRegistryById(parsedConfig._templateId);
          if (template && template.template._structure) {
            parsedConfig._structure = JSON.parse(JSON.stringify(template.template._structure));
          } else {
            const newTemplate = createNewTemplate(parsedConfig._templateId);
            parsedConfig._structure = newTemplate._structure;
          }
        }
        // Ensure siteId is preserved
        if (siteId) {
          parsedConfig._siteId = siteId;
        }
        return parsedConfig;
      }
      return createNewTemplate('landing_business');
    } catch (err) {
      console.error('Error loading config:', err);
      return createNewTemplate('landing_business');
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
    // Preserve the _siteId when updating config
    if (config._siteId && !updatedConfig._siteId) {
      updatedConfig._siteId = config._siteId;
    }
    
    // Make sure we don't lose the _structure field if it exists in the current config
    if (config._structure && !updatedConfig._structure) {
      console.log('Preserving _structure field in updated config');
      updatedConfig._structure = config._structure;
    }
    
    // Save the updated config to localStorage
    localStorage.setItem('websiteConfig', JSON.stringify(updatedConfig));
    setConfig(updatedConfig);
  };
  
  const handleTemplateSelect = (templateConfig, id) => {
    if (window.confirm('Changing templates will reset all customizations. Are you sure?')) {
      // Ensure structure exists in the template
      if (!templateConfig._structure) {
        console.log('Adding structure to template:', id);
        const template = getTemplateRegistryById(id);
        if (template && template.template._structure) {
          templateConfig._structure = JSON.parse(JSON.stringify(template.template._structure));
        }
      }
      
      // Double check template ID is set
      templateConfig._templateId = id;
      
      // Remove any existing siteId to force generation of a new one on next deploy
      delete templateConfig._siteId;
      
      setConfig(templateConfig);
      localStorage.setItem('websiteConfig', JSON.stringify(templateConfig));
    }
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
      <Header />
      <div className="app-main">
        <main className="app-content">
          <MobileTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <div className={`left-panel ${activeTab === 'chat' ? 'active' : ''}`}>
            <Chat 
              onPreviewUpdate={handlePreviewUpdate}
              websiteConfig={config}
              setConfig={setConfig}
            />
          </div>
          
          <div className={`right-panel ${activeTab === 'preview' ? 'active' : ''}`}>
            <PreviewToolbar 
              currentTemplate={config} 
              onTemplateSelect={handleTemplateSelect}
              getCurrentTemplateId={getCurrentTemplateId}
              websiteConfig={config}
            />
            <div className="preview-container">
              <WebsitePreview config={config} setConfig={setConfig} />
            </div>
          </div>
        </main>
      </div>
      
      <footer className="app-footer">
        <p>VibeSite POC &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App; 