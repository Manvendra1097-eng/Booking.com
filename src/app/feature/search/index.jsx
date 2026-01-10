import React from 'react';
import LocationInput from './location-input';
import DateInput from './date-input';
import RoomInput from './room-input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

function Search() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      city: '',
      bookingDates: {
        from: '',
        to: '',
      },
      roomsCount: 1,
    },
  });

  const onSubmit = (data) => {
    const { bookingDates, city, ...rest } = data;
    const params = {
      ...rest,
      city: city?.split(',')[0],
      startDate: dayjs(bookingDates?.from).format('YYYY-MM-DD'),
      endDate: dayjs(bookingDates?.to).format('YYYY-MM-DD'),
    };
    const searchParams = new URLSearchParams(params);
    navigate(`/search?${searchParams.toString()}`);
  };

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
