import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface User {
  // Define the properties of the user object here
  full_name: string;
  email: string;
  token: string;
  // Add other properties as needed
}

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

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // This is important for sending/receiving cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/auth/status');
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // 401 is an expected response when not authenticated
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 