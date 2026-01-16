import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import React, { useState } from 'react';
import dayjs from 'dayjs';

function DateInput({ form }) {
  const [open, setOpen] = useState(false);

  const isDateDisabled = React.useCallback(
    (date) => dayjs().isAfter(dayjs(date), 'date'),
    []
  );
  const isSameDay = (a, b) => a && b && dayjs(a).isSame(dayjs(b), 'day');

  const isNextDay = (from, to) => {
    if (!from || !to) return false;
    return dayjs(to).diff(dayjs(from), 'day') === 1;
  };

  const handleSelect = (range, field) => {
    field.onChange(range);
    if (isNextDay(range?.from, range?.to)) setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <FormField
        name="bookingDates"
        control={form.control}
        render={({ field }) => (
          <>
            <PopoverTrigger asChild>
              <FormItem className="p-4 md:px-4 md:py-2 rounded bg-background h-full flex-2">
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
                        {field?.value?.to &&
                        !isSameDay(field.value.from, field.value.to)
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
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Calendar
                mode="range"
                selected={field.value}
                numberOfMonths={2}
                fromMonth={new Date()}
                disabled={isDateDisabled}
                onSelect={(range) => handleSelect(range, field)}
                className="mx-auto"
              />
            </PopoverContent>
          </>
        )}
      />
    </Popover>
  );
}

export default DateInput;
