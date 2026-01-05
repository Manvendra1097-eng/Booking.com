import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Text from '@/components/ui/Text';
import { useForm } from 'react-hook-form';
import useFilterParams from '../hooks/useFilterParams';
import PriceFilter from './price-filter';
import StarFilter from './star-filter';

function Filters({ className }) {
  const { setFilters, clearFilters, starRating, priceRange } =
    useFilterParams();
  const form= useForm({
    defaultValues: {
      starCategory: starRating ? starRating.split(',').map(Number) : [],
      priceRange: priceRange || '',
    },
  });

  function onSubmit(data) {
    console.log('Filter form data: ', data);
    setFilters(data);
  }

  const handleClearAll = () => {
    form.reset();
    clearFilters();
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center border-b p-2">
        <Text variant="h3">Filter by:</Text>
        <Button
          variant="link"
          className="underline-offset-1"
          onClick={handleClearAll}
          type="button"
        >
          Clear All
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <StarFilter className="p-2 border-b" form={form} />
          <PriceFilter className="p-2" form={form} />
          <Button className="w-full mt-4" type="submit">
            Apply Filters
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Filters;
