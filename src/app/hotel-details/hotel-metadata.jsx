import Icon from '@/components/ui/icon';
import Text from '@/components/ui/Text';
import React from 'react';

function HotelMetaData({ hotel, info }) {
  return (
    <>
      <section className="space-y-4">
        <div className="flex">
          <div className="flex-1 space-y-1">
            <Text as="h1" variant="h1">
              {hotel.name}
            </Text>
            <p className="text-muted-foreground">{`${hotel.contactInfo?.address}, ${hotel.city}`}</p>
          </div>
          <div>
            <div className="flex gap-2 bg-brand text-white justify-center items-center  py-1 rounded-t-sm">
              <span className="font-bold">4.8</span>
              <Icon icon="star" className="fill-white" size="14" />
            </div>
            <span className="text-xs px-2 py-1 font-medium text-muted-foreground flex items-center justify-center">
              663 Ratings
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-1.5 py-1 rounded bg-gray-100 w-fit font-semibold">
          <Icon icon="gem" size="14" />
          <span className="text-sm">Company-Serviced</span>
        </div>
        <div className="flex items-center gap-2 px-2">
          <Icon icon="curve" className="-mt-4 stroke-gray-400" />
          <p>5.0 · Check-in rating &gt; Delightful experience</p>
        </div>
        <div className="flex gap-1 items-center text-orange-500 bg-orange-50 p-2 border border-orange-200 rounded-sm">
          <Icon icon="heart" size="16" />
          <p className="text-sm font-medium">
            Located Less Than 5 Km From Medanta Hospital | Located 3 Kms From
            Omaxe Celebration Mall
          </p>
        </div>
      </section>
      <section className="space-y-4 my-8">
        <h2 className="text-xl font-bold">Amenities</h2>
        <ul className="flex flex-wrap gap-2">
          {hotel.amenities.map((item, index) => (
            <li key={index} className="flex gap-2 items-center min-w-[180px]">
              <Icon icon="check" size="18" className="text-green-600 " />
              <span className="text-muted-foreground text-sm font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-4 my-8">
        <h2 className="text-xl font-bold">About this Property</h2>
        <p className="text-sm leading-relaxed tracking-wide text-muted-foreground">
          {info.description}
        </p>
      </section>
    </>
  );
}

export default HotelMetaData;
