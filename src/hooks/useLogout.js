import { useAuth } from '@/context/authContext';
import axiosInstance from '@/lib/axios-instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const { setToken, setProfile } = useAuth();
  const navigate = useNavigate();
  const client = useQueryClient();

  const logout = () => {
    return axiosInstance.post('/auth/logout');
  };

  const handleLogout = () => {
    setToken(null);
    setProfile(null);
    client.clear();
    navigate('/');
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: handleLogout,
    onError: handleLogout,
  });

  return { logout: () => mutate(), isPending, error };
};
