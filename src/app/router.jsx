import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './home';
import Signin from './auth/sign-in';
import { PATH } from '@/config/app.path';
import SearchPage from './search';
import Signup from './auth/sign-up';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import ErrorBoundary from '@/components/error-boundary';
import {
  AuthContextProvider,
  useAuth,
} from '@/context_provider/auth-context-provider';
import NavigationListener from './NavigationListener';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!token) {
    return <Navigate to={PATH.SIGN_IN} replace />;
  }

  return children;
};

// Public Route Component (redirect to home if already logged in)
const PublicRoute = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (token) {
    return <Navigate to={PATH.HOME} replace />;
  }

  return children;
};

const Router = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            {/* Listen for navigation events from axios interceptor */}
            <NavigationListener />

            <div className="flex flex-col min-h-screen">
              <Header />

              <main className="flex-1" id="main-content">
                <Routes>
                  <Route path={PATH.HOME} element={<Home />} />
                  <Route
                    path={PATH.SIGN_IN}
                    element={
                      <PublicRoute>
                        <Signin />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path={PATH.SIGN_UP}
                    element={
                      <PublicRoute>
                        <Signup />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path={PATH.SEARCH}
                    element={
                      <ProtectedRoute>
                        <SearchPage />
                      </ProtectedRoute>
                    }
                  />
                  {/* Catch-all 404 route */}
                  <Route
                    path="*"
                    element={<Navigate to={PATH.HOME} replace />}
                  />
                </Routes>
              </main>

              <Footer />
            </div>
          </AuthContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default Router;
