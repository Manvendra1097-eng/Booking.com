import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';

export const useSearch = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const form = useForm({
    defaultValues: {
      city: params?.city || '',
      bookingDates: {
        from: params?.startDate || '',
        to: params.endDate || '',
      },
      roomsCount: params?.roomsCount || 1,
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
  return { form, onSubmit };
};
