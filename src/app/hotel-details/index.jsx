import React from 'react';
import PropertViewCarousel from './property-view-carousel';
import HotelCheckoutCard from './hotel-checkout-card';
import HotelMetaData from './hotel-metadata';
import HotelPolicy from './hotel-policy';
import RoomPicker from './room-picker';
import { HOTEL_DATA, HOTEL_INFO } from './hotel-details-dummy-data';

function HotelDetails() {
  const hotelData = HOTEL_DATA;
  const hotelInfo = HOTEL_INFO;
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
