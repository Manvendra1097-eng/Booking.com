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

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [token, setToken] = useState(() => fetchValueFromLs(TOKEN_KEY));
  const queryClient = useQueryClient();

  // TanStack Query for user profile
  const {
    data: userData,
    isLoading: isProfileLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['user-profile'], // Cache key includes token
    queryFn: async () => {
      if (!token) return null;

      const response = await axiosInstance.get(API_CONFIG.USER.PROFILE);
      return response.data;
    },
    enabled: !!token, // Only run if token exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403
      if (error.response?.status === 401 || error.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
  });

  // Sync auth state
  useEffect(() => {
    // No token = not authenticated
    if (!token) {
      setAuthData({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return;
    }

    // Loading from query
    if (isProfileLoading) {
      setAuthData((prev) => ({ ...prev, isLoading: true }));
      return;
    }

    // Success
    if (userData && !isError) {
      setAuthData({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });
      return;
    }

    // Error
    if (isError) {
      // Token is invalid (401/403)
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        removeValueFromLs(TOKEN_KEY);
        setToken(null);
        queryClient.removeQueries({ queryKey: ['user-profile'] }); // Clear cache
      }

      setAuthData({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [token, userData, isProfileLoading, isError, error, queryClient]);

  // Login function
  const login = useCallback((accessToken) => {
    storeValueInLs(TOKEN_KEY, accessToken);
    setToken(accessToken);
    // Query will auto-refetch because token changed
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      if (token) {
        await axiosInstance.post(API_CONFIG.SIGNOUT, {});
        console.log('✅ Logout API call successful');
      }
    } catch (error) {
      // Even if API fails, continue with client-side logout
      console.warn('Logout API failed, continuing client-side:', error.message);
    } finally {
      removeValueFromLs(TOKEN_KEY);
      setToken(null);
      // Clear ALL auth-related queries
      queryClient.removeQueries({
        predicate: (query) => {
          const queryKey = query.queryKey[0];
          const userQueries = [
            'user-profile',
            'bookings',
            'favorites',
            'reviews',
          ];
          return userQueries.includes(queryKey);
        },
      });
    }
  }, [queryClient, token]);

  // Update user data
  const updateUser = useCallback(
    (userData) => {
      setAuthData((prev) => ({
        ...prev,
        user: { ...prev.user, ...userData },
      }));

      // Update cache
      queryClient.setQueryData(['user-profile', token], userData);
    },
    [token, queryClient]
  );

  // Refresh user profile
  const refreshUserProfile = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['user-profile'] });
  }, [queryClient]);

  const value = {
    ...authData,
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
