import axios from 'axios';
import {
  fetchValueFromLs,
  removeValueFromLs,
  storeValueInLs,
  TOKEN_KEY,
} from './storage-manage';

// Create event emitter for navigation from interceptors
const createNavigationEmitter = () => {
  let listeners = [];

  return {
    subscribe(callback) {
      listeners.push(callback);
      return () => {
        listeners = listeners.filter(l => l !== callback);
      };
    },

    navigateTo(path) {
      setTimeout(() => {
        listeners.forEach(callback => callback(path));
      }, 0);
    },
  };
};

export const navigationEmitter = createNavigationEmitter();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use((request) => {
  const authToken = fetchValueFromLs(TOKEN_KEY);
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }
  return request;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  // Success handler
  (response) => response,

  // Error handler
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Don't retry auth endpoints
      if (
        originalRequest.url === '/auth/login' ||
        originalRequest.url === '/auth/refresh'
      ) {
        removeValueFromLs(TOKEN_KEY);
        navigationEmitter.navigateTo('/signin');
        return Promise.reject(error);
      }

      try {
        // Try to refresh token
        const refreshResponse = await axiosInstance.post('/auth/refresh');
        const newAccessToken = refreshResponse?.data?.accessToken;

        if (newAccessToken) {
          storeValueInLs(TOKEN_KEY, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        removeValueFromLs(TOKEN_KEY);
        navigationEmitter.navigateTo('/signin');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
