import React, { useEffect, useRef, useState } from 'react';
import { generateHTML } from '../templates/basicLanding';
import basicTemplate from '../templates/basicLanding';

const WebsitePreview = ({ config, setConfig }) => {
  const iframeRef = useRef(null);
  const [showGuides, setShowGuides] = useState(true);
  
  useEffect(() => {
    // Save the current config to localStorage
    localStorage.setItem('websiteConfig', JSON.stringify(config));
    
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