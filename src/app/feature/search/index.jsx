import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useSearch } from '@/hooks/useSearch';
import DateInput from './date-input';
import LocationInput from './location-input';
import RoomInput from './room-input';

function Search() {
  const { form, onSubmit } = useSearch();
  return (
    <div className="container relative -mt-6  z-10">
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
