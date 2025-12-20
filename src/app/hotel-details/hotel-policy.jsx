import TimeCard from '@/components/ui/time-card';
import React from 'react';

function HotelPolicy({ hotelPolicy }) {
  return (
    <section className="space-y-4 text-center md:text-justify">
      <h2 className="text-xl font-bold">Hotel policies</h2>
      <div className="flex gap-4 items-center justify-center md:justify-start">
        <div>
          <span className="text-sm">Check-in</span>
          <TimeCard text={hotelPolicy.checkIn} />
        </div>
        <div className="w-px h-16 bg-slate-200"></div>
        <div>
          <span className="text-sm">Check-out</span>
          <TimeCard text={hotelPolicy.checkOut} />
        </div>
      </div>
    </section>
  );
}

export default HotelPolicy;
