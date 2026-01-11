import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useSignin } from './useSignin';
import axiosInstance from '@/lib/axios-instance';
export const useSignup = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { signin, isPending: isLoginPending } = useSignin({
    onError: (error) => {
      form.setError('root', {
        type: 'server',
        message:
          error.response?.data?.error?.message ||
          'Signup succeeded but login failed',
      });
    },
  });

  const signup = (userData) => {
    return axiosInstance.post('/auth/signup', userData);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (_, variables) => {
      signin({
        email: variables.email,
        password: variables.password,
      });
    },
    onError: (error) => {
      form.setError('root', {
        type: 'server',
        message:
          error.response?.data?.error?.message ||
          'Something went wrong, try again later.',
      });
    },
  });

  const onSubmit = (userData) => {
    form.clearErrors('root');
    mutate(userData);
  };

  return {
    form,
    onSubmit,
    isPending: isPending || isLoginPending,
  };
};
