import { API_CONFIG } from '@/config/aipconfig';
import { PATH } from '@/config/app.path';
import { useAuth } from '@/context_provider/auth-context-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios-instance';

const useSignin = () => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  // TanStack Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials) => {
      const response = await axiosInstance.post(API_CONFIG.SIGNIN, credentials);
      return response.data;
    },
    onSuccess: (response) => {
      const accessToken = response?.data?.accessToken;

      if (!accessToken) {
        toast.error('Login failed', {
          description: 'No access token received',
        });
        return;
      }

      // Update auth context
      login(accessToken);

      // Prefetch user profile for better UX
      queryClient.prefetchQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
          const profileResponse = await axiosInstance.get(
            API_CONFIG.USER.PROFILE
          );
          return profileResponse.data;
        },
      });

      toast.success('Logged in successfully');

      // Navigate after short delay
      setTimeout(() => {
        navigate(PATH.HOME, { replace: true });
      }, 300);
    },
    onError: (err) => {
      console.error('Login error:', err);

      let errorMessage = 'Login failed';
      let errorDescription = 'Please check your credentials';

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error.status || errorMessage;
        errorDescription = err.response.data.error.message || errorDescription;
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000,
      });

      form.setValue('password', '');
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return { form, onSubmit, pending: isPending };
};

export default useSignin;
