// src/config.js
// CONFIGURATION - Automatically detects your computer's IP for physical devices

import Constants from 'expo-constants';

// Automatically get the API URL based on environment
const getApiBaseUrl = () => {
  // In development, use the Expo host IP (works automatically on physical devices)
  if (__DEV__) {
    const debuggerHost = Constants.expoConfig?.hostUri ?? Constants.manifest?.debuggerHost;
    const localhost = debuggerHost?.split(':')[0];
    if (localhost) {
      return `http://${localhost}:5000/api`;
    }
  }
  // Fallback for emulators or production
  return 'http://10.0.2.2:5000/api';
};

export const CONFIG = {
  // API Base URL - automatically detected from Expo's dev server
  API_BASE_URL: getApiBaseUrl(),

  // Request timeout in milliseconds
  API_TIMEOUT: 10000, // 10 seconds
};
