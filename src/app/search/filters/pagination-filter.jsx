import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useFilterParams from '../hooks/useFilterParams';

function PaginationFilter() {
  const { currentPage, goToPreviousPage, goToNextPage } = useFilterParams();

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        onClick={goToPreviousPage}
        disabled={currentPage === 0}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Icon icon="chevronLeft" size="20" />
        Previous
      </Button>

      <span className="text-sm font-medium">Page {currentPage + 1}</span>

      <Button
        onClick={goToNextPage}
        variant="outline"
        className="flex items-center gap-2"
      >
        Next
        <Icon icon="chevronRight" size="20" />
      </Button>
    </div>
  );
}

export default PaginationFilter;
