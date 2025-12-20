import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';
import dayjs from 'dayjs';

function DateInput({ form }) {
  return (
    <Popover>
      <FormField
        name="bookingDates"
        control={form.control}
        render={({ field }) => (
          <div className="relative">
            <PopoverTrigger asChild>
              <FormItem className="p-4 md:px-4 md:py-2 rounded bg-background h-full md:min-w-[300px] lg:flex-auto">
                <FormControl>
                  <div role="button" className="flex items-center h-full">
                    <Icon
                      icon="calendar"
                      size="24"
                      className="text-muted-foreground shrink-0"
                    />
                    <div className="flex items-center flex-1 gap-2 px-2">
                      <p className="text-sm">
                        {field?.value?.from
                          ? dayjs(field.value.from).format('ddd D MMM')
                          : 'Check-in date'}
                      </p>
                      <span aria-hidden>-</span>
                      <p className="text-sm">
                        {field?.value?.to
                          ? dayjs(field.value.to).format('ddd D MMM')
                          : 'Check-out date'}
                      </p>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            </PopoverTrigger>
            <PopoverContent
              avoidCollisions={false}
              sideOffset="1"
              align="start"
              className="w-[500px] md:w-[640px] "
              // onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Calendar
                mode="range"
                min={2}
                selected={field.value}
                numberOfMonths={2}
                fromMonth={new Date()}
                disabled={(date) => dayjs().isAfter(dayjs(date), 'date')}
                onSelect={(value) => {
                  field.onChange(value);
                }}
                className="mx-auto"
              />
            </PopoverContent>
          </div>
        )}
      />
    </Popover>
  );
}

export default DateInput;
