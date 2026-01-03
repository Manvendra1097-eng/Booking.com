import React from 'react';
import LocationInput from './location-input';
import DateInput from './date-input';
import RoomInput from './room-input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { devLog } from '@/lib/utils';

const onSubmit = (data) => {
  devLog('log', 'Search form input: ', data);
};

function Search() {
  const form = useForm({
    defaultValues: {
      city: '',
      bookingDates: {
        from: '',
        to: '',
      },
      roomCount: 1,
    },
  });
  return (
    <div className="container relative -mt-8  z-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-1 p-1 justify-between md:h-16 w-full bg-yellow-400 rounded"
        >
          <div className="flex-5">
            <LocationInput form={form} />
          </div>

          <div className="flex-4">
            <DateInput form={form} />
          </div>

          <div className="flex-4">
            <RoomInput form={form} />
          </div>

          <div className="flex-2">
            <Button className="w-full h-full text-lg" size="lg">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Search;
