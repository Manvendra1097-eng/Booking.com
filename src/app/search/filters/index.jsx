import { Button } from '@/components/ui/button';
import Text from '@/components/ui/Text';
import React from 'react';
import StarFilter from './star-filter';
import PriceFilter from './price-filter';
import useFilterForm from './hooks/use-filter-form';
import { Form } from '@/components/ui/form';

function Filters({ className }) {
  const { form } = useFilterForm();
  function onSubmit(data) {
    console.log('Filter form data: ', data);
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center border-b p-2">
        <Text variant="h3">Filter by:</Text>
        <Button variant="link" className="underline-offset-1">
          Clear All
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <StarFilter className="p-2 border-b" form={form} />
          <PriceFilter className="p-2" form={form} />
          {/* <Button variant="link">Submit</Button> */}
        </form>
      </Form>
    </div>
  );
}

export default Filters;
