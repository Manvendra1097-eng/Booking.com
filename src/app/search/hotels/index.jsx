import Text from '@/components/ui/Text';
import React from 'react';
import SortFilter from '../filters/sort-filter';
import useSearchQuery from '../hooks/useSearchQuery';
import Hotel from './component/hotel';
import HotelCardSkelton from './component/hotel-card-skelton';

function Hotels({ className = '', setTotalPages }) {
  const { city, data, isLoading, error,searchParams } = useSearchQuery();

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
              hotels.map((hotel) => <Hotel key={hotel.id} {...hotel} searchParams={searchParams} />)
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
