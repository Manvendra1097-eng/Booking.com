import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context_provider/auth-context-provider';
import { PATH } from '@/config/app.path';

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted location for redirect after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to={PATH.SIGN_IN} state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
