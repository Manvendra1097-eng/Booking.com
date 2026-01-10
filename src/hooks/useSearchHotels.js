import { API_CONFIG } from '@/config/aipconfig';
import axiosInstance from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

const useSearchHotels = () => {
  const [searchParams] = useSearchParams();
  const params = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams.toString()]
  );

  const fetchHotels = (params) =>
    axiosInstance.get(API_CONFIG.HOTEL.BROWSE_HOTELS, { params });

  const { data, isLoading, error } = useQuery({
    queryKey: ['hotels', params],
    queryFn: () => fetchHotels(params),
  });
  const hotels = data?.data?.data.content || [];
  const totalElements = data?.data?.data.totalElements || 0;
  return { hotels, totalElements, isLoading, error, city: params.city };
};

export default useSearchHotels;
