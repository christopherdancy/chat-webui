import React, { useEffect, useRef } from 'react';
import { generateHTML } from '../templates/basicLanding';

const WebsitePreview = ({ config }) => {
  const iframeRef = useRef(null);
  
  useEffect(() => {
    // Generate HTML from the current config
    const html = generateHTML(config);
    
    // Update the iframe content
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [config]);
  
  return (
    <div className="website-preview-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2>Website Preview</h2>
      <div className="preview-content" style={{ overflow: 'auto', border: '1px solid #ddd', borderRadius: '4px' }}>
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