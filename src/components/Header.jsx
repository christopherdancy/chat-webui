import React from 'react';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <img 
            src="https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" 
            alt="Company Logo" 
            className="logo"
          />
        </div>
        <h1 className="company-name">VibeSite.ai</h1>
      </div>
    </header>
  );
};

export default Header;
