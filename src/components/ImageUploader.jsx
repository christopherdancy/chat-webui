import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient'; // Adjust path as needed

const ImageUploader = ({ onImageSelect, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setSelectedFile(file);
    setError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      // Trigger file selection if no file is selected
      document.getElementById('file-input').click();
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Create a unique file name
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      
      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from('images') // Your bucket name
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Get the public URL with transformations for sizing
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      // Add transformations for sizing (if your Supabase setup supports it)
      // Otherwise, you might need to use a service like Imgix or Cloudinary
      const optimizedUrl = `${publicUrl}?width=1000&quality=80`;
      
      onImageSelect(optimizedUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      <div className="image-uploader-content">
        {preview ? (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        ) : (
          <div className="image-preview-empty">
            <p>Select an image to preview</p>
          </div>
        )}
        
        <div className="file-input-container">
          <label htmlFor="file-input" className="file-input-label">
            Choose File
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
          {selectedFile && (
            <span className="file-name">{selectedFile.name}</span>
          )}
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <div className="image-uploader-actions">
          <button 
            type="button" 
            className="upload-button"
            onClick={uploadImage}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : selectedFile ? 'Upload' : 'Select Image'}
          </button>
          
          <button
            type="button"
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader; 