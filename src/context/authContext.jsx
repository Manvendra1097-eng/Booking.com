import axiosInstance from '@/lib/axios-instance';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

const AuthContext = createContext(null);

let isRefreshing = false;
let refreshQueue = [];

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  /* ---------------- REQUEST INTERCEPTOR ---------------- */
  useLayoutEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token && config.headers && !config._retry) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  /* ---------------- RESPONSE INTERCEPTOR (REFRESH LOGIC) ---------------- */
  useLayoutEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const url = originalRequest?.url;

        if (
          status !== 401 ||
          ['/auth/login', '/auth/refresh'].includes(url) ||
          originalRequest._retry
        ) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        /* ---- Queue requests while refresh is in progress ---- */
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          }).then((newToken) => {
            originalRequest.headers = {
              ...(originalRequest.headers || {}),
              Authorization: `Bearer ${newToken}`,
            };
            return axiosInstance(originalRequest);
          });
        }

        isRefreshing = true;

        try {
          const res = await axiosInstance.post('/auth/refresh');
          const newToken = res.data?.data?.accessToken;

          setToken(newToken);

          refreshQueue.forEach((p) => p.resolve(newToken));
          refreshQueue = [];

          originalRequest.headers = {
            ...(originalRequest.headers || {}),
            Authorization: `Bearer ${newToken}`,
          };

          return axiosInstance(originalRequest);
        } catch (err) {
          refreshQueue.forEach((p) => p.reject(err));
          refreshQueue = [];

          setToken(null);
          setProfile(null);

          return Promise.reject(err);
        } finally {
          isRefreshing = false;
          originalRequest._retry = false;
        }
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  /* ---------------- SILENT LOGIN ON APP LOAD ---------------- */
  useEffect(() => {
    const silentLogin = async () => {
      try {
        const res = await axiosInstance.post('/auth/refresh');
        setToken(res.data?.data?.accessToken);
      } catch {
        setToken(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    silentLogin();
  }, []);

  /* ---------------- FETCH PROFILE ---------------- */
  useEffect(() => {
    if (!token) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/users/profile');
        setProfile(res.data?.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [token]);

  /* ---------------- CONTEXT VALUE ---------------- */
  const value = {
    token,
    setToken,
    profile,
    setProfile,
    isAuthLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ---------------- HOOK ---------------- */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};

export default AuthProvider;
