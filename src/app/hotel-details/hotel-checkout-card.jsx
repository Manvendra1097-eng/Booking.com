import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

import React from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { HoverCardArrow } from '@radix-ui/react-hover-card';

const CancellationPolicy = ({ cancellationPolicy }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="flex gap-1 items-center">
          <p className="text-rose-600 text-sm font-medium">
            Cancellation policy
          </p>
          <Icon icon="info" size="16" className="text-rose-600" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="center" side="left" className="w-80">
        <div className="space-y-2 p-1">
          <h3 className="font-bold text-lg">Cancellation policy</h3>
          <ul>
            {cancellationPolicy.map?.((policy, index) => (
              <li
                className="list-disc text-muted-foreground textsm"
                key={index}
              >
                {policy}
              </li>
            ))}
          </ul>
        </div>
        <HoverCardArrow className="fill-brand" />
      </HoverCardContent>
    </HoverCard>
  );
};

function HotelCheckoutCard({ rooms, cancellationPolicy }) {
  let room = rooms.filter((r) => r.isSelected === true)[0];
  room = { ...room, price: 6000 };
  return (
    <div className="space-y-6 p-2">
      <div className="flex  gap-1">
        <span className="font-bold text-2xl ">{`₹${room.price}`}</span>
        <span className="text-lg line-through text-muted-foreground">
          {room.price * 1.5}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Your savings</span>
          <span className="font-bold">{`₹${room.price * 0.5}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Total price</span>
          <span className="font-bold">{`₹${room.price}`}</span>
        </div>
      </div>

      <Button className="w-full text-lg" size="lg">
        Continue to Book
      </Button>

      <div className="flex gap-1">
        <Icon
          icon="zap"
          size="16"
          className="text-rose-600 fill-rose-600 mt-1"
        />
        <p className="text-rose-600 text-sm font-medium">
          1k+ peoples booked this OYO in last 6 months
        </p>
      </div>
      <CancellationPolicy cancellationPolicy={cancellationPolicy} />
    </div>
  );
}

export default HotelCheckoutCard;
