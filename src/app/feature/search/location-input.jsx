import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import Text from '@/components/ui/Text';
import { DESTINATION } from '@/config/app.config';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import React, { useState } from 'react';

function LocationInput({ form }) {
  const [open, setOpen] = useState(false);
  const cityValue = form.watch('city');

  const onLocationClick = (index) => {
    form.setValue(
      'city',
      DESTINATION[index]?.city + ',' + DESTINATION[index]?.country
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          className="bg-background w-full h-full flex gap-2 items-center p-2 md:p-4"
          onClick={() => {
            form.clearErrors('city');
            setOpen(true);
          }}
        >
          <Icon icon="bed" className="text-muted-foreground" />
          <FormField
            name="city"
            control={form.control}
            rules={{
              required: 'Please enter a destination to start searching.',
            }}
            render={({ field }) => (
              <FormItem className="flex-1 relative">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Where are you going?"
                    className="border-none  focus-visible:ring-0
                    focus-visible:ring-offset-0 ring-0 ring-offset-0 aria-invalid:ring-0 aria-invalid:border-transparent"
                  />
                </FormControl>
                <FormMessage
                  className="absolute left-0 top-full mt-1 bg-red-600 text-white text-xs p-2 rounded-sm shadow-md 
                before:content-[''] before:border-l-4 before:border-l-transparent before:border-r-4 before:border-r-transparent before:border-b-4
                before:border-b-red-600 before:absolute before:bottom-full w-[280px]
                "
                />
              </FormItem>
            )}
          />
          <Button
            className={
              !cityValue ? 'pointer-events-none opacity-0 ' : 'cursor-pointer'
            }
            variant="ghost"
            size="icon-sm"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              form.setValue('city', '');
              setOpen(true);
            }}
          >
            <Icon icon="x" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        sideOffset="1"
        align="start"
        avoidCollisions={false}
        className="w-80 lg:w-[480px]"
      >
        <div className="bg-background rounded-sm p-2 space-y-6 shadow-sm">
          <Text variant="h3" className="text-sm">
            Trending Destinations
          </Text>
          <div className="flex flex-col divide-y ">
            {DESTINATION.map((cityOb, index) => (
              <div
                key={index}
                className="text-sm flex items-center gap-2 p-2 hover:bg-muted-foreground/10 transition-colors"
                onClick={() => onLocationClick(index)}
              >
                <Icon size="24" icon="location" />
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-bold">{cityOb.city}</span>{' '}
                  <span className="text-xs text-muted-foreground">
                    {cityOb.country}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default LocationInput;
