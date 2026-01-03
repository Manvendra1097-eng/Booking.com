import { API_CONFIG } from '@/config/aipconfig';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  fetchValueFromLs,
  removeValueFromLs,
  storeValueInLs,
  TOKEN_KEY,
} from '@/lib/storage-manage';
import axiosInstance, { authEmitter } from '@/lib/axios-instance';

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => fetchValueFromLs(TOKEN_KEY));
  const [isInitializing, setIsInitializing] = useState(true);
  const queryClient = useQueryClient();

  // ✅ On mount, check if we can refresh token from cookie
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔄 Initializing auth...');

      // If we already have a token, skip refresh attempt
      if (token) {
        console.log('✅ Token found in localStorage');
        setIsInitializing(false);
        return;
      }

      // No token in localStorage, but maybe refresh token cookie exists
      console.log('⚠️ No access token, attempting refresh from cookie...');

      try {
        const response = await axiosInstance.post('/auth/refresh');
        const newAccessToken = response.data?.data?.accessToken;

        if (newAccessToken) {
          console.log('✅ Successfully refreshed token from cookie');
          storeValueInLs(TOKEN_KEY, newAccessToken);
          setToken(newAccessToken);
        } else {
          console.log('❌ No access token in refresh response');
        }
      } catch (error) {
        console.log('❌ Refresh failed, user needs to login:', error.message);
        // Refresh failed - user truly needs to login
        removeValueFromLs(TOKEN_KEY);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []); // Only run once on mount

  // Listen for token refresh from axios interceptor
  useEffect(() => {
    console.log('🔧 Setting up auth event listeners');

    const unsubscribeRefresh = authEmitter.on('tokenRefreshed', (newToken) => {
      console.log('✅ Token refreshed event received, updating context');
      setToken(newToken);
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    });

    const unsubscribeLogout = authEmitter.on('logout', () => {
      console.log('🚪 Logout event received from interceptor');
      setToken(null);
      queryClient.clear();
    });

    return () => {
      console.log('🧹 Cleaning up auth event listeners');
      unsubscribeRefresh();
      unsubscribeLogout();
    };
  }, [queryClient]);

  // TanStack Query for user profile
  const {
    data: user,
    isLoading: isProfileLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await axiosInstance.get(API_CONFIG.USER.PROFILE);
      return response.data;
    },
    enabled: !!token && !isInitializing, // Wait for initialization
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Handle auth errors
  useEffect(() => {
    if (isError && token) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        console.error('❌ Auth error after refresh attempt');
        removeValueFromLs(TOKEN_KEY);
        setToken(null);
        queryClient.clear();
      }
    }
  }, [isError, error, token, queryClient]);

  // Login function
  const login = useCallback((accessToken) => {
    console.log('🔐 Login: Storing token and updating state');
    storeValueInLs(TOKEN_KEY, accessToken);
    setToken(accessToken);
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    console.log('🚪 Logout: Starting logout process');

    try {
      if (token) {
        await axiosInstance.post(API_CONFIG.SIGNOUT, {});
        console.log('✅ Logout API successful - refresh token cleared');
      }
    } catch (error) {
      console.warn('⚠️ Logout API failed, continuing client-side:', error.message);
    } finally {
      removeValueFromLs(TOKEN_KEY);
      setToken(null);
      queryClient.clear();

      console.log('✅ Client-side logout complete');
    }
  }, [queryClient, token]);

  // Update user data (optimistic update)
  const updateUser = useCallback(
    (updates) => {
      queryClient.setQueryData(['user-profile'], (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, ...updates };
      });
    },
    [queryClient]
  );

  // Refresh user profile
  const refreshUserProfile = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['user-profile'] });
  }, [queryClient]);

  const value = {
    user: user || null,
    isAuthenticated: !!token && !!user && !isError,
    isLoading: isInitializing || (isProfileLoading && !!token),
    token,
    login,
    logout,
    updateUser,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthContextProvider');
  }

  return context;
};

export { AuthContextProvider, useAuth };
