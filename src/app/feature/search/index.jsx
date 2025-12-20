import React from 'react';
import LocationInput from './location-input';
import DateInput from './date-input';
import RoomInput from './room-input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

const onSubmit = (data) => {
  console.log('Search form input ... : ', data);
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
          className="flex flex-col md:flex-row gap-1 p-1 justify-between  md:h-16 w-full bg-yellow-400 rounded"
        >
          <LocationInput form={form} />
          <DateInput form={form} />
          <RoomInput form={form} />
          <Button className="w-full md:h-full md:w-2/12 text-lg" size="lg">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Search;
