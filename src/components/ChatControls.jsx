import React from 'react';
import IconPicker from './IconPicker';
import ColorPicker from './ColorPicker';
import ImageUploader from './ImageUploader';

const ChatControls = ({
  input,
  setInput,
  isProcessing,
  currentContext,
  showIconPicker,
  showColorPicker,
  showImageUploader,
  currentIconContext,
  currentColorContext,
  currentImageContext,
  showInput,
  onSubmit,
  onIconSelect,
  onColorSelect,
  onImageSelect,
  onCloseIconPicker,
  onCloseColorPicker,
  onCloseImageUploader
}) => {
  return (
    <>
      {showIconPicker && (
        <div className="icon-picker-container">
          <div className="icon-picker-header">
            <h4>Select an icon for {currentIconContext?.section} {currentIconContext?.item}</h4>
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
            <h4>Upload Image for {currentImageContext?.section}</h4>
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
              {currentColorContext?.item 
                ? `Select a color for ${currentColorContext?.section} ${currentColorContext?.item} ${currentColorContext?.property}`
                : `Select a color for ${currentColorContext?.section} ${currentColorContext?.property}`
              }
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
      
      {showInput && (
        <form className="chat-input-form" onSubmit={onSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentContext.property ? "Enter your value here..." : "Type here if you need something specific..."}
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