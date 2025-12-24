function useDebouncedQuery({ url, options, enabled, delay = 300 }) {
  const [debouncedValue, setDebouncedValue] = useState(
    options?.params?.query || ''
  );

  // Debounce the query param
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(options?.params?.query);
    }, delay);

    return () => clearTimeout(timer);
  }, [options?.params?.query, delay]);

  return useQuery({
    url,
    options: {
      ...options,
      params: { ...options.params, query: debouncedValue },
    },
    enabled,
  });
}
