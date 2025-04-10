import React from 'react';
import IconPicker from './IconPicker';
import ColorPicker from './ColorPicker';
import ImageUploader from './ImageUploader';

const ChatControls = ({
  input,
  setInput,
  isProcessing,
  currentNode,
  showIconPicker,
  showColorPicker,
  showImageUploader,
  showToggle,
  currentIconContext,
  currentColorContext,
  currentImageContext,
  currentToggleContext,
  showInput,
  onSubmit,
  onIconSelect,
  onColorSelect,
  onImageSelect,
  onToggleSelect,
  onCloseIconPicker,
  onCloseColorPicker,
  onCloseImageUploader,
  onCloseToggle
}) => {
  
  return (
    <>
      {showIconPicker && (
        <div className="icon-picker-container">
          <div className="icon-picker-header">
            <h4>Select an icon</h4>
            <button 
              className="close-icon-picker"
              onClick={onCloseIconPicker}
            >
              &times;
            </button>
          </div>
          <IconPicker onSelectIcon={onIconSelect} />
        </div>
      )}
      
      {showImageUploader && (
        <div className="image-uploader-container">
          <div className="image-uploader-header">
            <h4>Upload Image</h4>
            <button 
              className="close-image-uploader"
              onClick={onCloseImageUploader}
            >
              &times;
            </button>
          </div>
          <ImageUploader 
            onImageSelect={onImageSelect}
            onClose={onCloseImageUploader}
          />
        </div>
      )}
      
      {showColorPicker && (
        <div className="color-picker-container">
          <div className="color-picker-header">
            <h4>
              Select a color
            </h4>
            <button 
              className="close-color-picker"
              onClick={onCloseColorPicker}
            >
              &times;
            </button>
          </div>
          <ColorPicker onSelectColor={onColorSelect} />
        </div>
      )}
      
      {showToggle && (
        <div className="toggle-container">
          <div className="toggle-header">
            <h4>Toggle</h4>
            <button 
              className="close-toggle"
              onClick={onCloseToggle}
            >
              &times;
            </button>
          </div>
          <div className="toggle-buttons">
            <button 
              className={`toggle-button ${currentToggleContext?.currentValue === true ? 'active' : ''}`}
              onClick={() => onToggleSelect(true)}
            >
              Show
            </button>
            <button 
              className={`toggle-button ${currentToggleContext?.currentValue === false ? 'active' : ''}`}
              onClick={() => onToggleSelect(false)}
            >
              Hide
            </button>
          </div>
        </div>
      )}
      
      {showInput && (
        <form className="chat-input-form" onSubmit={onSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentNode ? "Enter your value here..." : "Type here if you need something specific..."}
              className="chat-input"
              disabled={isProcessing}
              autoFocus
            />
          </div>
          <button 
            type="submit" 
            className="chat-submit-button"
            disabled={isProcessing || !input.trim()}
          >
            {isProcessing ? "..." : "Send"}
          </button>
        </form>
      )}
    </>
  );
};

export default ChatControls; 