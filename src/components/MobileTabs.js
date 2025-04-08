import React from 'react';

const MobileTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="mobile-tabs">
      <button 
        className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
        onClick={() => onTabChange('chat')}
      >
        Chat
      </button>
      <button 
        className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
        onClick={() => onTabChange('preview')}
      >
        Preview
      </button>
    </div>
  );
};

export default MobileTabs;