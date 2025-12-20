import { Button } from '@/components/ui/button';
import React from 'react';

function Hero() {
  return (
    <section className="relative min-h-[372px] bg-black py-10">
      <div className="absolute inset-0 z-2 xl:bg-tunnel max-w-[1440px] h-full mx-auto"></div>
      <img
        className="size-full object-cover max-w-[1440px] mx-auto absolute inset-0 z-1"
        src="/assets/hero-image-1440.jpeg"
        alt="Booking.com hero section"
      />
      <div className="container z-3 relative text-white space-y-2">
        <h2 className="text-4xl md:text-5xl leading-none font-extrabold">
          Travel has never <br></br>felt this cosy
        </h2>
        <p className="text-xl md:text-2xl font-medium leading-snug">
          Book an entire place all to yourself
        </p>
        <Button className="cursor-pointer h-12 px-4 text-base font-semibold mt-6">
          Discover holiday rentals
        </Button>
      </div>
    </section>
  );
}

export default Hero;
