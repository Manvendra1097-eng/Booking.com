import axios from 'axios';
import {
  fetchValueFromLs,
  removeValueFromLs,
  storeValueInLs,
  TOKEN_KEY,
} from './storage-manage';
import { devLog } from './utils';

// Validate required environment variables
const validateEnv = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  if (!baseURL) {
    console.error('Missing required environment variable: VITE_BASE_URL');
    devLog('error', 'API requests may fail without VITE_BASE_URL configured');
  }
  return baseURL || 'http://localhost:3000/api';
};

// Token refresh state
let isRefreshing = false;
let refreshSubscribers = [];

// Notify all waiting requests that token is refreshed
const onRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Add request to queue while refreshing
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

// Event emitter for auth events
const createAuthEmitter = () => {
  let listeners = {
    tokenRefreshed: [],
    logout: [],
    navigationNeeded: [],
  };

  return {
    on(event, callback) {
      if (listeners[event]) {
        listeners[event].push(callback);
      }
      return () => {
        listeners[event] = listeners[event].filter((cb) => cb !== callback);
      };
    },

    emit(event, data) {
      if (listeners[event]) {
        listeners[event].forEach((callback) => {
          setTimeout(() => callback(data), 0);
        });
      }
    },
  };
};

export const authEmitter = createAuthEmitter();

const axiosInstance = axios.create({
  baseURL: validateEnv(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for refresh token cookies
});

// Request interceptor - add access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = fetchValueFromLs(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Not a 401 or already retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Don't retry auth endpoints
    const authEndpoints = ['/auth/login', '/auth/signup', '/auth/refresh'];
    if (
      authEndpoints.some((endpoint) => originalRequest.url?.includes(endpoint))
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        addRefreshSubscriber((newToken) => {
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          } else {
            reject(error);
          }
        });
      });
    }

    isRefreshing = true;

    try {
      // Attempt token refresh (refresh token sent via httpOnly cookie)
      const refreshResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const newAccessToken = refreshResponse.data?.data?.accessToken;

      if (!newAccessToken) {
        throw new Error('No access token in refresh response');
      }

      // Update localStorage
      storeValueInLs(TOKEN_KEY, newAccessToken);

      // Notify auth context and all waiting requests
      authEmitter.emit('tokenRefreshed', newAccessToken);
      onRefreshed(newAccessToken);

      // Retry original request with new token
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh failed - logout user
      devLog('error', 'Token refresh failed:', refreshError);
      removeValueFromLs(TOKEN_KEY);

      // Notify all waiting requests
      onRefreshed(null);

      // Emit logout event
      authEmitter.emit('logout');
      authEmitter.emit('navigationNeeded', '/signin');

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
