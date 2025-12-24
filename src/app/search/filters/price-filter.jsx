import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import Text from '@/components/ui/Text';
import { PRICE_FILTERS } from '@/config/app.config';
import { cn } from '@/lib/utils';
import React from 'react';

function PriceFilter({ className, form }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Text variant="h4">Price per night</Text>
      <FormField
        control={form.control}
        name="priceRange"
        render={({ field }) => (
          <FormItem>
            {PRICE_FILTERS.map((priceRange) => (
              <div className="flex items-center gap-3" key={priceRange.id}>
                <FormControl>
                  <Checkbox
                    className="border-foreground size-4"
                    {...field}
                    checked={field.value?.includes(priceRange.value)}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? priceRange.value : '');
                    }}
                  />
                </FormControl>

                <FormLabel className="text-sm font-normal text-foreground">
                  {priceRange.label}
                </FormLabel>
              </div>
            ))}
          </FormItem>
        )}
      />
    </div>
  );
}

export default PriceFilter;
