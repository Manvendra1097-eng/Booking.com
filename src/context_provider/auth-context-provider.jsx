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
import axiosInstance from '@/lib/axios-instance';
import { devLog, isAuthError } from '@/lib/utils';

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => fetchValueFromLs(TOKEN_KEY));
  const queryClient = useQueryClient();

  // TanStack Query for user profile
  const {
    data: user,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await axiosInstance.get(API_CONFIG.USER.PROFILE);
      return response.data;
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error) => {
      if (isAuthError(error)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Handle token invalidation
  useEffect(() => {
    if (isError && token) {
      if (isAuthError(error)) {
        devLog('warn', 'Token invalid, logging out');
        removeValueFromLs(TOKEN_KEY);
        setToken(null);
        queryClient.clear();
      }
    }
  }, [isError, error?.response?.status, token, queryClient]);

  // Login function
  const login = useCallback((accessToken) => {
    storeValueInLs(TOKEN_KEY, accessToken);
    setToken(accessToken);
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await axiosInstance.post(API_CONFIG.SIGNOUT, {});
    } catch (error) {
      devLog('warn', 'Logout API failed:', error.message);
    } finally {
      removeValueFromLs(TOKEN_KEY);
      setToken(null);
      queryClient.clear();
    }
  }, [queryClient]);

  // Update user data (optimistic update)
  const updateUser = useCallback(
    (updates) => {
      queryClient.setQueryData(['user-profile'], (old) => ({
        ...old,
        ...updates,
      }));
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
    isLoading: isLoading && !!token,
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
