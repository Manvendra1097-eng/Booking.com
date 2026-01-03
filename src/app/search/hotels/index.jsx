import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import SortFilter from '../filters/sort-filter';
import Text from '@/components/ui/Text';
import { API_CONFIG } from '@/config/aipconfig';
import axiosInstance from '@/lib/axios-instance';
import Hotel from './component/hotel';
import HotelCardSkelton from './component/hotel-card-skelton';

function Hotels({ className }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['hotels', 'Delhi', '2025-12-31', '2026-01-02', 2, 0, 2],
    queryFn: async () => {
      const response = await axiosInstance.get(API_CONFIG.HOTEL.BROWSE_HOTELS, {
        params: {
          city: 'Delhi',
          startDate: '2025-12-31',
          endDate: '2026-01-02',
          roomsCount: 2,
          page: 0,
          size: 2,
        },
      });
      return response.data;
    },
  });

  const hotels = data?.data.content || [];

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
        <Text variant="h1">Jaipur: 858 properties found</Text>
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
            <HotelCardSkelton />
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
    </div>
  );
}

export default Hotels;
