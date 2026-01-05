import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import SortFilter from '../filters/sort-filter';
import Text from '@/components/ui/Text';
import { API_CONFIG } from '@/config/aipconfig';
import axiosInstance from '@/lib/axios-instance';
import useSearchQuery from '../hooks/useSearchQuery';
import Hotel from './component/hotel';
import HotelCardSkelton from './component/hotel-card-skelton';

function Hotels({ className = '', setTotalPages }) {
  const {
    city,
    startDate,
    endDate,
    roomsCount,
    page,
    size,
    starRatings,
    priceRange,
    sortBy,
  } = useSearchQuery();

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

  const hotels = data?.data.content || [];
  const totalElements = data?.data.totalElements || 0;
  const totalPages = data?.data.totalPages || 1;
  React.useEffect(() => {
    if (setTotalPages) setTotalPages(totalPages);
  }, [setTotalPages, totalPages]);

  // Add error handling
  if (error) {
    return (
      <div className={className}>
        <div className="error-message">
          Failed to load hotels: {error.message || 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <Text variant="h1">
          {city}: {totalElements} properties found
        </Text>
        <SortFilter />
      </div>
      <section className="mt-4">
        {isLoading ? (
          <div className="space-y-4">
            <HotelCardSkelton />
            <HotelCardSkelton />
          </div>
        ) : (
          <div className="hotel-list space-y-4">
            {hotels?.length > 0 ? (
              hotels.map((hotel) => <Hotel key={hotel.id} {...hotel} />)
            ) : (
              <div className="no-results">
                <p>No hotels found for your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </section>
      {/* No hidden div for pagination */}
    </div>
  );
}

export default Hotels;
