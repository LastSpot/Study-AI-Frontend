import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, checkAuthStatus } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      await checkAuthStatus();
    };
    checkAuth();
  }, []);

  console.log(isAuthenticated);

  if (loading) {
    // You might want to show a loading spinner here
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 