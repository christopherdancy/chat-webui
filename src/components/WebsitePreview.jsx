import React, { useEffect, useRef, useState } from 'react';
import { generateHTML as generateBasicHTML } from '../templates/basicLanding';
import { generateHTML as generateMoonlightHTML } from '../templates/moonlightTemplate';
import basicTemplate from '../templates/basicLanding';

const WebsitePreview = ({ config, setConfig }) => {
  const iframeRef = useRef(null);
  const [showGuides, setShowGuides] = useState(true);
  
  // Helper function to determine which template's generateHTML to use
  const getTemplateRenderer = (config) => {
    // Check specific properties or structure to identify the template
    if (config.navigation && config.navigation.items) {
      return generateMoonlightHTML; // Moonlight template has navigation.items
    }
    return generateBasicHTML; // Default to basic template
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
    
    // Update the iframe content
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [config, showGuides]);
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to the default template? All your changes will be lost.')) {
      setConfig(basicTemplate);
      localStorage.removeItem('websiteConfig');
      localStorage.removeItem('websiteHTML');
    }
  };
  
  return (
    <div className="website-preview-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2>Website Preview</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={handleReset}
            style={{ 
              padding: '5px 10px', 
              background: 'transparent', 
              color: '#666', 
              border: '1px solid #ccc', 
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            title="Reset to default template"
          >
            Reset
          </button>
          <div className="guide-toggle">
            <label className="switch" style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                checked={showGuides} 
                onChange={() => setShowGuides(!showGuides)}
              />
              <span style={{ marginLeft: '8px' }}>Show Section Guides</span>
            </label>
          </div>
        </div>
      </div>
      <div className="preview-content" style={{ overflow: 'auto', border: '1px solid #ddd', borderRadius: '4px', flexGrow: 1 }}>
        <iframe 
          ref={iframeRef}
          title="Website Preview"
          className="preview-iframe"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
};

export default WebsitePreview;