// Option 1: Named export (recommended for multiple exports)
export const API_CONFIG = {
  HOTEL: {
    BROWSE_HOTELS: '/hotels/search',
    HOTEL_INFO: (hotelId) => `/hotels/${hotelId}/info`,
  },
  SIGNIN: '/auth/login',
  SIGNUP: '/auth/signup',
  SIGNOUT: '/auth/logout',
  USER: {
    PROFILE: '/users/profile',
  },
};
