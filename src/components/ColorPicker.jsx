import React, { useState } from 'react';

// Common colors with their hex values
const commonColors = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Green', value: '#008000' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Purple', value: '#800080' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Brown', value: '#A52A2A' },
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Gray', value: '#808080' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Gold', value: '#FFD700' },
  { name: 'Navy', value: '#000080' },
  { name: 'Teal', value: '#008080' },
  { name: 'Olive', value: '#808000' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Lime', value: '#00FF00' },
  { name: 'Aqua', value: '#00FFFF' },
  { name: 'Fuchsia', value: '#FF00FF' },
  // Material Design colors
  { name: 'Primary Blue', value: '#1976D2' },
  { name: 'Primary Indigo', value: '#3F51B5' },
  { name: 'Primary Purple', value: '#9C27B0' },
  { name: 'Primary Pink', value: '#E91E63' },
  { name: 'Primary Red', value: '#F44336' },
  { name: 'Primary Orange', value: '#FF9800' },
  { name: 'Primary Yellow', value: '#FFEB3B' },
  { name: 'Primary Green', value: '#4CAF50' },
  { name: 'Primary Teal', value: '#009688' },
  { name: 'Primary Cyan', value: '#00BCD4' },
  { name: 'Light Gray', value: '#F5F5F5' },
  { name: 'Dark Gray', value: '#212121' },
];

const ColorPicker = ({ onSelectColor }) => {
  const [customColor, setCustomColor] = useState('#000000');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColors = searchTerm 
    ? commonColors.filter(color => 
        color.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : commonColors;

  const handleCustomColorChange = (e) => {
    setCustomColor(e.target.value);
  };

  const handleCustomColorSelect = () => {
    onSelectColor(customColor);
  };

  return (
    <div className="color-picker">
      <div className="color-search">
        <input
          type="text"
          placeholder="Search colors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="color-search-input"
        />
      </div>
      
      <div className="color-grid">
        {filteredColors.map((color, index) => (
          <div 
            key={index} 
            className="color-item"
            onClick={() => onSelectColor(color.value)}
            title={color.name}
          >
            <div 
              className="color-swatch" 
              style={{ backgroundColor: color.value }}
            ></div>
            <div className="color-name">{color.name}</div>
          </div>
        ))}
      </div>
      
      <div className="custom-color-section">
        <h4>Custom Color</h4>
        <div className="custom-color-input">
          <input 
            type="color" 
            value={customColor}
            onChange={handleCustomColorChange}
            className="color-input"
          />
          <input 
            type="text" 
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="color-text-input"
          />
          <button 
            onClick={handleCustomColorSelect}
            className="color-select-button"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker; 