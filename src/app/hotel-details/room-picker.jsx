import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import React from 'react';

const Room = ({ type, amenities, price, isSelected, photos }) => (
  <article>
    {isSelected && (
      <div className="flex gap-2 items-center bg-brand text-background p-1 rounded-t-lg">
        <Icon
          icon="star"
          size="14"
          className="fill-amber-500 stroke-transparent"
        />
        <span className="uppercase text-sm font-bold">selected category</span>
      </div>
    )}
    <div
      className={`flex flex-col lg:flex-row p-2 border ${
        !isSelected && 'rounded-t-md'
      }`}
    >
      <div className="lg:flex-1">
        <h3 className=" font-bold">{type}</h3>
        <ul className="flex flex-wrap gap-1 p-2 w-full">
          {amenities.map((item, index) => (
            <li
              key={index}
              className="flex gap-1 items-center min-w-2/5 lg:min-w-[180px]"
            >
              <Icon icon="check" size="12" className="text-green-600 " />
              <span className="text-secondary-foreground text-xs font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-[150px] md:w-[180px] md:h-[120px] ">
        <img
          src={photos[0]}
          alt={photos[0]}
          className="object-cover size-full rounded-lg"
        />
      </div>
    </div>
    <div className="flex items-center justify-between p-2 border-x border-b rounded-b-md">
      <div>
        <span className="font-bold">{`₹${price}`}</span>
      </div>
      <div>
        <Button variant={`outline`} size="lg">
          {isSelected && (
            <Icon
              icon="check"
              className="bg-green-400 text-white rounded-full p-0.5"
            />
          )}
          <span className={`${!isSelected && 'text-destructive'}`}>
            SELECTED
          </span>
        </Button>
      </div>
    </div>
  </article>
);

function RoomPicker({ rooms }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Choose your room</h2>
      <div className="space-y-4">
        {rooms.map((room, index) => (
          <Room {...room} key={index} />
        ))}
      </div>
    </section>
  );
}

export default RoomPicker;
