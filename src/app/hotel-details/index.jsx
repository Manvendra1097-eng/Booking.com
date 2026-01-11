import HotelDetailsSkelton from '@/components/HotelDetailsSkelton';
import RenderUI from '@/components/layouts/RenderUI';
import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router';
import HotelCheckoutCard from './hotel-checkout-card';
import { HOTEL_INFO } from './hotel-details-dummy-data';
import HotelMetaData from './hotel-metadata';
import HotelPolicy from './hotel-policy';
import PropertViewCarousel from './property-view-carousel';
import RoomPicker from './room-picker';

function HotelDetails() {
  const [searchParams] = useSearchParams();
  const { hotelId } = useParams();

  const params = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams.toString()]
  );

  const fetchHotelDetails = () => {
    return axiosInstance.get(`/hotels/${hotelId}/info`, { params });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'hotelDetails',
      hotelId,
      params.endDate,
      params.startDate,
      params.roomsCount,
    ],
    queryFn: fetchHotelDetails,
  });

  const hotelData = data?.data?.data || {};
  const hotelInfo = HOTEL_INFO | {};

  return (
    <RenderUI
      isLoading={isLoading}
      error={error}
      loadingComp={HotelDetailsSkelton}
    >
      <div className="container mt-6 mb-12">
        <PropertViewCarousel images={hotelData.hotel?.photos} />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="flex-1 space-y-8">
            <HotelMetaData hotel={hotelData.hotel} info={hotelInfo} />
            <RoomPicker rooms={hotelData.rooms} />
            <HotelPolicy hotelPolicy={hotelInfo.hotelPolicy || {}} />
          </div>
          <aside className="md:w-[340px] w-full border border-border shadow-md rounded-xl sticky top-6 h-min">
            <HotelCheckoutCard
              rooms={hotelData.rooms}
              cancellationPolicy={hotelInfo.cancellationPolicy || {}}
            />
          </aside>
        </div>
      </div>
    </RenderUI>
  );
}

export default HotelDetails;
