import { API_CONFIG } from '@/config/aipconfig';
import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router';
import HotelCheckoutCard from './hotel-checkout-card';
import { HOTEL_INFO } from './hotel-details-dummy-data';
import HotelMetaData from './hotel-metadata';
import HotelPolicy from './hotel-policy';
import PropertViewCarousel from './property-view-carousel';
import RoomPicker from './room-picker';

function HotelDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const {
    data: hotelData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['hotelDetails', id],
    queryFn: async () => {
      const response = await axiosInstance.get(
        API_CONFIG.HOTEL.HOTEL_INFO(id),
        {
          params: searchParams,
        }
      );
      return response.data.data;
    },
  });
  console.log(hotelData);

  const hotelInfo = HOTEL_INFO;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading hotel details...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load hotel details: {error.message || 'Unknown error'}
      </div>
    );
  }
  return (
    <div className="container mt-6 mb-12">
      <PropertViewCarousel images={hotelData.hotel.photos} />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1 space-y-8">
          <HotelMetaData hotel={hotelData.hotel} info={hotelInfo} />
          <RoomPicker rooms={hotelData.rooms} />
          <HotelPolicy hotelPolicy={hotelInfo.hotelPolicy} />
        </div>
        <aside className="md:w-[340px] w-full border border-border shadow-md rounded-xl sticky top-6 h-min">
          <HotelCheckoutCard
            rooms={hotelData.rooms}
            cancellationPolicy={hotelInfo.cancellationPolicy}
          />
        </aside>
      </div>
    </div>
  );
}

export default HotelDetails;
