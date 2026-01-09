import { API_CONFIG } from '@/config/aipconfig';
import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

/**
 * Custom hook to extract and manage search/hotel query parameters
 * @returns {Object} Search query parameters object with all needed values
 */
export const useSearchQuery = () => {
  const [searchParams] = useSearchParams();

  // Extract and parse all search parameters
  const city = searchParams.get('city') || 'Delhi';
  const startDate = searchParams.get('startDate') || '2025-12-31';
  const endDate = searchParams.get('endDate') || '2026-01-02';
  const roomsCount = parseInt(searchParams.get('roomsCount')) || 1;
  const page = parseInt(searchParams.get('page')) || 0;
  const size = parseInt(searchParams.get('size')) || 2;

  // Filter parameters
  const starRatings = searchParams.get('starRatings');
  const priceRange = searchParams.get('priceRange');
  const sortBy = searchParams.get('sortBy');

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'hotels',
      city,
      startDate,
      endDate,
      roomsCount,
      page,
      size,
      starRatings,
      priceRange,
      sortBy,
    ],
    queryFn: async () => {
      const params = {
        city,
        startDate,
        endDate,
        roomsCount,
        page,
        size,
      };

      // Add optional filter parameters if they exist
      if (starRatings) {
        params.starRatings = starRatings;
      }
      if (priceRange) {
        params.priceRange = priceRange;
      }
      if (sortBy) {
        params.sortBy = sortBy;
      }

      const response = await axiosInstance.get(API_CONFIG.HOTEL.BROWSE_HOTELS, {
        params,
      });
      return response.data;
    },
  });

  return { city, data, isLoading, error,searchParams };
};

export default useSearchQuery;
