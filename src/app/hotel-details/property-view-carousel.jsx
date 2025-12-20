import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

function PropertViewCarousel({ images }) {
  return (
    <Carousel
      className="rounded-lg"
      opts={{
        breakpoints: {
          '(min-width: 1024px)': { slidesToScroll: 2 },
        },
      }}
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem className="lg:basis-1/2 pl-0.5" key={index}>
            <img className="h-96 w-full object-cover" src={src} alt="hotel" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1 shadow-lg" />
      <CarouselNext className="right-1 shadow-lg" />
    </Carousel>
  );
}

export default PropertViewCarousel;
