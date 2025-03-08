import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (full_name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  api: typeof api;
  checkAuthStatus: () => Promise<void>;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5050',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/auth/status');
  
      if (response.status === 200) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const signup = async (full_name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/signup', { 
        full_name, 
        email, 
        password 
      });

      if (response.status === 200) {
        const { user, access_token } = response.data;
        // Set token from response body
        if (access_token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
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

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });

      if (response.status === 200) {
        const { user, access_token } = response.data;
        // Set token from response body
        if (access_token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        }
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

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Remove the Authorization header
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signup, login, logout, loading, api, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 