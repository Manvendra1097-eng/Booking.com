import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import useFilterParams from '../hooks/useFilterParams';

function PaginationFilter() {
  const { currentPage, setPage } = useFilterParams();
  const [totalPages, setTotalPages] = useState(1);

  // Get totalPages from hidden div rendered by Hotels
  useEffect(() => {
    const el = document.getElementById('hotels-pagination-data');
    if (el) {
      const pages = parseInt(el.getAttribute('data-total-pages'), 10);
      setTotalPages(isNaN(pages) ? 1 : pages);
    }
  }, [
    document
      .getElementById('hotels-pagination-data')
      ?.getAttribute('data-total-pages'),
  ]);

  // Helper to generate page numbers (simple version, can be improved for large sets)
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }
    if (currentPage < 3) {
      return [0, 1, 2, 3, 'ellipsis', totalPages - 1];
    }
    if (currentPage > totalPages - 4) {
      return [
        0,
        'ellipsis',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      ];
    }
    return [
      0,
      'ellipsis',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis',
      totalPages - 1,
    ];
  };

  const pages = getPages();

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 0) setPage(currentPage - 1);
            }}
            aria-disabled={currentPage === 0}
          />
        </PaginationItem>
        {pages.map((page, idx) =>
          page === 'ellipsis' ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages - 1) setPage(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages - 1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationFilter;
