/**
 * ProtectedRoute Component
 * A wrapper component that protects routes from unauthorized access.
 * It checks if the user is authenticated before rendering the child components.
 * If the user is not authenticated, they are redirected to the login page.
 * The component also preserves the attempted URL for redirecting back after login.
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;  // The components to render if authentication passes
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, checkAuthStatus } = useAuth();  // Get auth state and utilities
  const location = useLocation();  // Get current location for redirect after login

  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();
    };
    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content if authenticated
  return <>{children}</>;
}; 