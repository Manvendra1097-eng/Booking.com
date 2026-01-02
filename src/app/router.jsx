import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router';
import Home from './home';
import Signin from './auth/sign-in';
import { PATH } from '@/config/app.path';
import SearchPage from './search';
import Signup from './auth/sign-up';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import { useEffect } from 'react';
import { useAuth } from '@/context_provider/auth-context-provider';
import { navigationEmitter } from '@/lib/axios-instance';

// Navigation handler for axios interceptor
function NavigationHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = navigationEmitter.subscribe((path) => {
      navigate(path, { replace: true });
    });

    return unsubscribe;
  }, [navigate]);

  return null;
}

const Router = () => {
  return (
    <BrowserRouter>
      <NavigationHandler />
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path={PATH.HOME} element={<Home />} />
        <Route path={PATH.SEARCH} element={<SearchPage />} />
        <Route path={PATH.SIGN_IN} element={<Signin />} />
        <Route path={PATH.SIGN_UP} element={<Signup />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
