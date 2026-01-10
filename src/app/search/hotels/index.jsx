import Text from '@/components/ui/Text';
import SortFilter from '../filters/sort-filter';
import Hotel from './component/hotel';
import HotelCardSkelton from './component/hotel-card-skelton';

function Hotels({ hotels, totalElements,city, error, isLoading }) {
  if (error) {
    return (
      <div className="flex-1">
        <div className="error-message">
          Failed to load hotels: {error.message || 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <Text variant="h1">{`${city}: ${totalElements} properties found`}</Text>
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
    </div>
  );
}

export default Hotels;
