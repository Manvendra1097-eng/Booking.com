import { useSearchParams } from 'react-router';

/**
 * Custom hook to manage filter and pagination updates
 * @returns {Object} Filter parameters and setter functions
 */
export const useFilterParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current page
  const currentPage = parseInt(searchParams.get('page')) || 0;

  // Get current filter values
  const starRatings = searchParams.get('starRatings');
  const priceRange = searchParams.get('priceRange');
  const sortBy = searchParams.get('sortBy');

  /**
   * Apply filters and reset to page 0
   * @param {Object} filters - Filter object with starRatings and priceRange
   */
  const setFilters = (filters) => {
    const newParams = new URLSearchParams(searchParams);

    // Set star ratings filter
    if (filters.starCategory && filters.starCategory.length > 0) {
      console.log(filters.starCategory);

      newParams.set('starCategory', filters.starCategory.join(','));
    } else {
      newParams.delete('starCategory');
    }

    // Set price range filter
    if (filters.priceRange) {
      newParams.set('priceRange', filters.priceRange);
    } else {
      newParams.delete('priceRange');
    }

    // Reset to page 0 when filters change
    newParams.set('page', '0');

    setSearchParams(newParams);
  };

  /**
   * Update the current page
   * @param {number} newPage - New page number
   */
  const setPage = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  /**
   * Go to next page
   */
  const goToNextPage = () => {
    setPage(currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Go to previous page
   */
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Clear all filters and reset pagination
   */
  const clearFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('starRatings');
    newParams.delete('priceRange');
    newParams.delete('sortBy');
    newParams.set('page', '0');
    setSearchParams(newParams);
  };

  /**
   * Set sort order
   * @param {string} sort - Sort parameter value
   */
  const setSort = (sort) => {
    const newParams = new URLSearchParams(searchParams);
    if (sort) {
      newParams.set('sortBy', sort);
    } else {
      newParams.delete('sortBy');
    }
    setSearchParams(newParams);
  };

  return {
    // Current values
    currentPage,
    starRatings,
    priceRange,
    sortBy,

    // Setter functions
    setFilters,
    setPage,
    goToNextPage,
    goToPreviousPage,
    clearFilters,
    setSort,
  };
};

export default useFilterParams;
