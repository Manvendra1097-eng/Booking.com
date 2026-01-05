import React from 'react';
import Filters from './filters';
import React, { useState } from 'react';
import Filters from './filters';
import Hotels from './hotels';
import PaginationFilter from './filters/pagination-filter';

const SearchPage = () => {
  const [totalPages, setTotalPages] = useState(1);
  return (
    <div className="container flex gap-4 mt-4">
      <Filters className="w-60 border border-border rounded-sm shadow-sm h-fit" />
      <div className="flex-1">
        <Hotels setTotalPages={setTotalPages} />
        <PaginationFilter totalPages={totalPages} />
      </div>
    </div>
  );
};

export default SearchPage;
