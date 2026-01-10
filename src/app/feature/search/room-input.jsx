import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

function RoomInput({ form }) {
  const roomsCount = form.watch('roomsCount');
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="bg-background w-full h-full flex items-center gap-2 p-4">
          <Icon icon="person" className="stroke-muted-foreground" size="24" />
          <span>{roomsCount}</span>
          <span>{roomsCount <= 1 ? 'room' : 'rooms'}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        avoidCollisions={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
        sideOffset="1"
        align="center"
        className="lg:w-[400px] shadow-lg"
      >
        <FormField
          name="roomsCount"
          control={form.control}
          render={({ field }) => (
            <div className="flex flex-col gap-4 py-4">
              <div className="flex justify-between items-center font-semibold">
                <p className="flex-1">Room</p>
                <FormItem className="flex justify-between w-28 h-10 items-center border border-slate-500 rounded-sm p-2 ">
                  <Icon
                    icon="minus"
                    className={`${
                      field.value < 2
                        ? 'stroke-muted-foreground'
                        : 'stroke-primary'
                    }`}
                    onClick={() => form.setValue('roomsCount', field.value - 1)}
                  />
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none ring-0 focus-visible:ring-0 text-center pointer-events-none"
                    />
                  </FormControl>
                  <Icon
                    icon="plus"
                    className={`stroke-primary`}
                    onClick={() => form.setValue('roomsCount', field.value + 1)}
                  />
                </FormItem>
              </div>
              <Button
                size="lg"
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}

export default RoomInput;
