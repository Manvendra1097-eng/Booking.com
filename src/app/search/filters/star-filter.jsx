import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import Text from '@/components/ui/Text';
import { STAR_FILTERS } from '@/config/app.config';
import { cn } from '@/lib/utils';
import React from 'react';

function StarFilter({ className, form }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Text variant="h4">Star Category</Text>
      <FormField
        control={form.control}
        name="starCategory"
        render={({ field }) => (
          <FormItem>
            {STAR_FILTERS.map((star) => (
              <div className="flex items-center gap-3" key={star.id}>
                <FormControl>
                  <Checkbox
                    id={`star-${star.value}`}
                    className="border-foreground size-4"
                    {...field}
                    checked={(field.value || []).includes(star.value)}
                    onCheckedChange={(checked) => {
                      const currentValue = field.value || [];
                      const newValue = checked
                        ? [...currentValue, star.value]
                        : currentValue.filter((value) => value !== star.value);
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>

                <FormLabel
                  htmlFor={`star-${star.value}`}
                  className="text-sm font-normal text-foreground cursor-pointer"
                >
                  {star.label}
                </FormLabel>
              </div>
            ))}
          </FormItem>
        )}
      />
    </div>
  );
}

export default StarFilter;
