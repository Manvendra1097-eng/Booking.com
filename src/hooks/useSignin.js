import { useAuth } from '@/context/authContext';
import axiosInstance from '@/lib/axios-instance';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export const useSignin = (options = {}) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { onError: externalOnError } = options;

  const login = (credentials) => {
    const res = axiosInstance.post('/auth/login', credentials);
    return res;
  };

  const handleLoginSuccess = (res) => {
    const accessToken = res.data?.data?.accessToken || null;
    setToken(accessToken);
    navigate('/', { replace: true });
  };
  const handleLoginError = (error) => {
    setToken(null);
    externalOnError?.(error);
    if (error.status === 401)
      form.setError('root', {
        type: 'server',
        message: error.response?.data?.error?.message,
      });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const onSubmit = (data) => {
    form.clearErrors('root');
    mutate(data);
  };

  return { form, onSubmit, isPending, signin: mutate };
};
