import { API_CONFIG } from '@/config/aipconfig';
import { PATH } from '@/config/app.path';
import { useAuth } from '@/context_provider/auth-context-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios-instance';

const useSignup = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const queryClient = useQueryClient();

  // TanStack Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (signup_data) => {
      const response = await axiosInstance.post(API_CONFIG.SIGNUP, signup_data);
      return response.data;
    },
    onSuccess: (response) => {
      toast.success('Registrated successfully', {
        description: 'Redirecting to login page, login with your credential',
      });
      // Navigate after short delay
      setTimeout(() => {
        navigate(PATH.SIGN_IN, { replace: true });
      }, 100);
    },
    onError: (err) => {
      console.error('Signup error:', err);

      let errorMessage = 'Signup failed';
      let errorDescription = 'Something went wrong, try after sometime';

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error.status || errorMessage;
        errorDescription = err.response.data.error.message || errorDescription;
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000,
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return { form, onSubmit, pending: isPending };
};

export default useSignup;
