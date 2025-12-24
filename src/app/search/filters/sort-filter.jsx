import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SEARCH_FILTERS } from '@/config/app.config';
import React from 'react';

function SortFilter() {
  const [value, setValue] = React.useState('');

  return (
    <div>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select sort filter" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {SEARCH_FILTERS.map((filter, index) => (
              <SelectItem key={index} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortFilter;
