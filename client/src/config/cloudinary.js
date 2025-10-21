// config/cloudinary.js
export const CLOUDINARY_CONFIG = {
  cloudName: 'ddsvoimvr', // ← VOTRE CLOUD NAME
  uploadPreset: 'angels-bags' // Pour les uploads futurs
};

export const getCloudinaryUrl = (publicId, options = {}) => {
  const {
    width = 600,
    height = 600,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options;

  const transformations = `w_${width},h_${height},c_${crop},q_${quality},f_${format}`;
  
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformations}/${publicId}`;
};