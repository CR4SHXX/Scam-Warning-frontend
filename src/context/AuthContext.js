// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Auth Context
const AuthContext = createContext();

// AuthProvider component that wraps the app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app start
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if token exists in AsyncStorage
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      
      if (token) {
        setIsLoggedIn(true);
        if (userData) {
          try {
            setUser(JSON.parse(userData));
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            setUser(null);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function - stores token and updates state
  const login = async (token, userData = null) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      if (userData) {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
      }
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error storing auth data:', error);
      throw error;
    }
  };

  // Logout function - clears token and updates state
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error('Error clearing auth data:', error);
      throw error;
    }
  };

  const value = {
    isLoggedIn,
    user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
