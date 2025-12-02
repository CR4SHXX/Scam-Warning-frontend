// src/services/api.js
import axios from 'axios';
import { CONFIG } from '../config';

// Create axios instance - no auth headers needed with simplified backend
// NOTE: This simplified approach passes userId in request body instead of using JWT tokens.
// This is intended for development/school project use where the backend trusts the client.
// For production apps, implement proper token-based authentication with server-side validation.
const apiClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: CONFIG.API_TIMEOUT,
});

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
        error: error.response?.data?.error || error.message || 'Registration failed',
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
      // Backend returns user info: { id, username, email }
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Login failed',
      };
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
        error: error.response?.data?.error || error.message || 'Failed to fetch warnings',
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
        error: error.response?.data?.error || error.message || 'Failed to fetch warning',
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
        error: error.response?.data?.error || error.message || 'Failed to search warnings',
      };
    }
  },

  // Create new warning (userId passed in body for simplified backend without JWT)
  create: async (title, description, categoryId, userId) => {
    try {
      const response = await apiClient.post('/warnings', {
        title,
        description,
        categoryId,
        userId, // Include userId in body since no JWT
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to create warning',
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
        error: error.response?.data?.error || error.message || 'Failed to fetch categories',
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
        error: error.response?.data?.error || error.message || 'Failed to fetch comments',
      };
    }
  },

  // Add comment to a warning (userId passed in body for simplified backend without JWT)
  add: async (warningId, content, userId) => {
    try {
      const response = await apiClient.post(`/warnings/${warningId}/comments`, {
        content,
        userId, // Include userId in body since no JWT
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to add comment',
      };
    }
  },
};
