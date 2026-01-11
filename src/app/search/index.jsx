import React from 'react';
import Filters from './filters';
import Hotels from './hotels';
import useSearchHotels from '@/hooks/useSearchHotels';

const SearchPage = () => {
  const {
    hotels,
    totalElements,
    params,
    isLoading,
    error,
  } = useSearchHotels();
  return (
    <div className="container flex gap-4 mt-4">
      <Filters className="w-60 border border-border rounded-sm shadow-sm h-fit" />
      <Hotels
        className="flex-1"
        hotels={hotels}
        isLoading={isLoading}
        error={error}
        totalElements={totalElements}
        params={params}
      />
    </div>
  );
};

export default SearchPage;
