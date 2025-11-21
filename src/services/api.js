// src/services/api.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Register a new user
  register: async (username, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', {
        username,
        email,
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Registration failed',
      };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      
      // Store token in AsyncStorage
      if (response.data.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Logout failed',
      };
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return { success: true, data: !!token };
    } catch (error) {
      return { success: false, data: false };
    }
  },
};

// Warnings API
export const warningsAPI = {
  // Get all approved warnings
  getAll: async () => {
    try {
      const response = await apiClient.get('/warnings');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch warnings',
      };
    }
  },

  // Get specific warning by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/warnings/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch warning',
      };
    }
  },

  // Search warnings
  search: async (searchTerm = '', categoryId = '') => {
    try {
      const params = {};
      if (searchTerm) params.searchTerm = searchTerm;
      if (categoryId) params.categoryId = categoryId;
      
      const response = await apiClient.get('/warnings/search', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to search warnings',
      };
    }
  },

  // Create new warning (requires authentication)
  create: async (title, description, categoryId, warningSigns) => {
    try {
      const response = await apiClient.post('/warnings', {
        title,
        description,
        categoryId,
        warningSigns,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to create warning',
      };
    }
  },
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getAll: async () => {
    try {
      const response = await apiClient.get('/categories');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch categories',
      };
    }
  },
};

// Comments API
export const commentsAPI = {
  // Get comments for a warning
  getByWarningId: async (warningId) => {
    try {
      const response = await apiClient.get(`/warnings/${warningId}/comments`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch comments',
      };
    }
  },

  // Add comment to a warning (requires authentication)
  add: async (warningId, text) => {
    try {
      const response = await apiClient.post(`/warnings/${warningId}/comments`, {
        text,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to add comment',
      };
    }
  },
};
