import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(name) {
  return `/assets/${name}`;
}

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
};

// Extract error status from API responses
export const extractErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'An unknown error occurred'
  );
};

// Check if error is authentication-related
export const isAuthError = (error) => {
  const status = error?.response?.status;
  return status === 401 || status === 403;
};

// Log with environment check (only in development)
export const devLog = (level = 'log', ...args) => {
  if (process.env.NODE_ENV === 'development') {
    console[level](...args);
  }
};
