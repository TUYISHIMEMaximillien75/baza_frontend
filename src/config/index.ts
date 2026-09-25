const rawApiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Ensure API URL always includes /api/v1 prefix regardless of environment config format
const sanitizeApiUrl = (url: string): string => {
  let clean = url.trim().replace(/\/+$/, '');
  if (!clean.endsWith('/api/v1')) {
    if (clean.endsWith('/api')) {
      clean = `${clean}/v1`;
    } else {
      clean = `${clean}/api/v1`;
    }
  }
  return clean;
};

export const config = {
  apiBaseUrl: sanitizeApiUrl(rawApiUrl),
  appName: import.meta.env.VITE_APP_NAME || 'BAZA Marketplace',
  cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'baza-dev',
};
