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
    <div className="website-preview">
      <h2>Website Preview</h2>
      <div className="preview-container">
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