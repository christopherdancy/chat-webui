import React, { useState, useEffect } from 'react';

// Common Font Awesome icons
const commonIcons = [
  'fas fa-home', 'fas fa-user', 'fas fa-cog', 'fas fa-star', 'fas fa-heart',
  'fas fa-check', 'fas fa-times', 'fas fa-search', 'fas fa-envelope',
  'fas fa-phone', 'fas fa-map-marker-alt', 'fas fa-calendar', 'fas fa-clock',
  'fas fa-bell', 'fas fa-info-circle', 'fas fa-question-circle', 'fas fa-exclamation-circle',
  'fas fa-chart-line', 'fas fa-chart-bar', 'fas fa-chart-pie',
  'fas fa-dollar-sign', 'fas fa-euro-sign', 'fas fa-pound-sign',
  'fas fa-credit-card', 'fas fa-shopping-cart', 'fas fa-store',
  'fas fa-truck', 'fas fa-shipping-fast', 'fas fa-box',
  'fas fa-globe', 'fas fa-globe-americas', 'fas fa-globe-europe',
  'fas fa-laptop', 'fas fa-desktop', 'fas fa-mobile-alt',
  'fas fa-code', 'fas fa-terminal', 'fas fa-database',
  'fas fa-server', 'fas fa-cloud', 'fas fa-cloud-upload-alt',
  'fas fa-cloud-download-alt', 'fas fa-lock', 'fas fa-unlock',
  'fas fa-shield-alt', 'fas fa-fingerprint', 'fas fa-key',
  'fas fa-lightbulb', 'fas fa-brain', 'fas fa-rocket',
  'fas fa-smile', 'fas fa-thumbs-up', 'fas fa-award',
  'fas fa-trophy', 'fas fa-medal', 'fas fa-certificate'
];

const IconPicker = ({ onSelectIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIcons, setFilteredIcons] = useState(commonIcons);

  useEffect(() => {
    if (searchTerm) {
      const filtered = commonIcons.filter(icon => 
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredIcons(filtered);
    } else {
      setFilteredIcons(commonIcons);
    }
  }, [searchTerm]);

  // Add Font Awesome to the document if it's not already there
  useEffect(() => {
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="icon-picker">
      <div className="icon-search">
        <input
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="icon-search-input"
        />
      </div>
      <div className="icon-grid">
        {filteredIcons.map((icon, index) => (
          <div 
            key={index} 
            className="icon-item"
            onClick={() => onSelectIcon(icon)}
            title={icon.replace('fas fa-', '').replace('far fa-', '')}
          >
            <i className={icon} style={{ fontSize: '20px' }}></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconPicker; 