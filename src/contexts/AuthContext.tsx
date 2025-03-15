/**
 * AuthContext and Provider
 * Manages authentication state and provides authentication-related functionality throughout the application.
 * Features:
 * - User authentication state management
 * - Login/Signup/Logout functionality
 * - Authentication status checking
 * - Axios instance with authentication configuration
 */
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Define the structure for User data
interface User {
  id: string;
  email: string;
  full_name: string;
}

/**
 * AuthContext interface defining all authentication-related functionality
 * @property isAuthenticated - Boolean indicating if a user is currently authenticated
 * @property user - Current user object or null if not authenticated
 * @property login - Function to authenticate user with email/password
 * @property signup - Function to create and authenticate new user
 * @property logout - Function to end the current session
 * @property loading - Boolean indicating if auth operations are in progress
 * @property api - Configured axios instance for authenticated requests
 * @property checkAuthStatus - Function to verify current authentication status
 */
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (full_name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  api: typeof api;
  checkAuthStatus: () => Promise<void>;
}

// Configure axios instance with authentication settings
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // Enable cookie-based authentication
  headers: {
    'Content-Type': 'application/json',
  }
});

// Create the context with null as initial value
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * AuthProvider component
 * Wraps the application and provides authentication state and functions to all children
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Verifies the current authentication status with the backend
   * Updates the auth state based on the response
   */
  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/auth/status');
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setUser(null);
          setIsAuthenticated(false);
        } else {
          console.error('Auth check failed:', error);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates a new user account and authenticates them
   */
  const signup = async (full_name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/signup', { 
        full_name, 
        email, 
        password 
      });

      if (response.status === 200) {
        const { user } = response.data;
        setUser(user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  /**
   * Authenticates an existing user
   */
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });

      if (response.status === 200) {
        const { user } = response.data;
        setUser(user);
        setIsAuthenticated(true);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  /**
   * Ends the current user session
   */
  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signup, login, logout, loading, api, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context
 * @throws Error if used outside of AuthProvider
 * @returns AuthContextType object containing auth state and functions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 