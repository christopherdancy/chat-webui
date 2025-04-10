import React, { useEffect, useRef, useState } from 'react';
import { getTemplateRegistryById, getTemplateRegistry, createNewTemplate } from '../templates/templateRegistry';

const WebsitePreview = ({ config, setConfig }) => {
  const iframeRef = useRef(null);
  const [showGuides, setShowGuides] = useState(true);
  const [viewportSize, setViewportSize] = useState('desktop'); // 'desktop' or 'mobile'
  
  // Get template renderer from registry based on template type or properties
  const getTemplateRenderer = (config) => {
    // First try to get template by id if available
    if (config._templateId) {
      const template = getTemplateRegistryById(config._templateId);
      if (template) {
        return template.generateHTML;
      }
    }
    
    // Fallback to identification by template properties
    const templateRegistry = getTemplateRegistry();
    for (const template of templateRegistry) {
      if (template.identifyTemplate(config)) {
        return template.generateHTML;
      }
    }
    
    // Ultimate fallback to basic template
    const basicTemplateInfo = getTemplateRegistryById('basic');
    return basicTemplateInfo.generateHTML;
  };
  
  useEffect(() => {
    // Save the current config to localStorage
    localStorage.setItem('websiteConfig', JSON.stringify(config));
    
    // Determine which template's generator to use
    const generateHTML = getTemplateRenderer(config);
    
    // Generate HTML from the current config, passing the showGuides flag
    const html = generateHTML(config, showGuides);
    
    // Save the generated HTML to localStorage
    localStorage.setItem('websiteHTML', html);
    
    // Update the iframe content and size
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();

      // Apply viewport size
      if (viewportSize === 'mobile') {
        iframe.style.width = '375px'; // iPhone-like width
        iframe.style.margin = '0 auto';
      } else {
        iframe.style.width = '100%';
        iframe.style.margin = '0';
      }
    }
  }, [config, showGuides, viewportSize]);
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to the default template? All your changes will be lost.')) {
      // Get current template type
      const currentTemplateId = config._templateId || 'basic';
      // Create a fresh template based on current template type
      const freshTemplate = createNewTemplate(currentTemplateId);
      
      setConfig(freshTemplate);
      localStorage.removeItem('websiteConfig');
      localStorage.removeItem('websiteHTML');
    }
  };
  
  return (
    <div className="website-preview-container">
      <div className="preview-controls">
        <span className="preview-label">Preview</span>
        <div className="preview-actions">
          <div className="viewport-controls">
            <button 
              className={`viewport-button ${viewportSize === 'desktop' ? 'active' : ''}`}
              onClick={() => setViewportSize('desktop')}
              title="Desktop view"
            >
              <i className="fas fa-desktop"></i>
            </button>
            <button 
              className={`viewport-button ${viewportSize === 'mobile' ? 'active' : ''}`}
              onClick={() => setViewportSize('mobile')}
              title="Mobile view"
            >
              <i className="fas fa-mobile-alt"></i>
            </button>
          </div>
          <label className="preview-toggle">
            <input 
              type="checkbox" 
              checked={showGuides} 
              onChange={() => setShowGuides(!showGuides)}
            />
            <span>Show Section Guides</span>
          </label>
          <button 
            onClick={handleReset}
            className="preview-reset-button"
            title="Reset to default template"
          >
            Reset
          </button>
        </div>
      </div>
      <div className={`preview-content ${viewportSize === 'mobile' ? 'mobile-view' : ''}`}>
        <iframe 
          ref={iframeRef}
          title="Website Preview"
          className="preview-iframe"
        />
      </div>
    </div>
  );
};

export default WebsitePreview;