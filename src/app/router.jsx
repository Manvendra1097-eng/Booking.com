import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './home';
import Signin from './auth/sign-in';
import { PATH } from '@/config/app.path';
import SearchPage from './search';
import Signup from './auth/sign-up';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import { AuthContextProvider } from '@/context_provider/auth-context-provider';
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

const Router = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          {/* Listen for navigation events from axios interceptor */}
          <NavigationListener />

          <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1">
              <Routes>
                <Route path={PATH.HOME} element={<Home />} />
                <Route path={PATH.SIGN_IN} element={<Signin />} />
                <Route path={PATH.SIGN_UP} element={<Signup />} />
                <Route path={PATH.SEARCH} element={<SearchPage />} />
                {/* Add more routes here */}
              </Routes>
            </main>

            <Footer />
          </div>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default Router;
