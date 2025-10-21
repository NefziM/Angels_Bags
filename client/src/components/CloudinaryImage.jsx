// components/CloudinaryImage.jsx
import React from 'react';
import { CLOUDINARY_CONFIG, getCloudinaryUrl } from '../config/cloudinary';

const CloudinaryImage = ({ 
  publicId, 
  alt, 
  className = '',
  width = 600,
  height = 600,
  crop = 'fill',
  quality = 'auto',
  format = 'auto',
  ...props 
}) => {
  const imageUrl = getCloudinaryUrl(publicId, {
    width, height, crop, quality, format
  });

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
    />
  );
};

export default CloudinaryImage;