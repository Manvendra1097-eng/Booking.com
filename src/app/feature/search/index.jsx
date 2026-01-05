import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import DateInput from './date-input';
import LocationInput from './location-input';
import RoomInput from './room-input';

function Search() {
  const navigate = useNavigate();
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

  const onSubmit = (formData) => {
    const { city, bookingDates, roomCount } = formData;

    // Extract just the city name (before comma)
    const cityName = city.split(',')[0];

    // Format dates as YYYY-MM-DD
    const startDate = dayjs(bookingDates.from).format('YYYY-MM-DD');
    const endDate = dayjs(bookingDates.to).format('YYYY-MM-DD');

    // Build query string and navigate
    const searchParams = new URLSearchParams({
      city: cityName,
      startDate,
      endDate,
      roomsCount: roomCount,
      page: 0,
      size: 2,
    });

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
