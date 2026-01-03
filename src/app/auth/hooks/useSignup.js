import { API_CONFIG } from '@/config/aipconfig';
import { PATH } from '@/config/app.path';
import { useMutation } from '@tanstack/react-query';
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

  // TanStack Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (signupData) => {
      const response = await axiosInstance.post(API_CONFIG.SIGNUP, signupData);
      return response.data;
    },
    onSuccess: (response) => {
      // Extract user data from response
      const userData = response?.data;

      toast.success('Account created successfully!', {
        description: `Welcome ${userData?.name || 'aboard'}! Please sign in to continue.`,
      });

      // Navigate to signin page
      setTimeout(() => {
        navigate(PATH.SIGN_IN, { replace: true });
      }, 1500);
    },
    onError: (err) => {
      console.error('Signup error:', err);

      let errorMessage = 'Signup failed';
      let errorDescription = 'Something went wrong, please try again';

      // Handle API error response
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error.status || errorMessage;
        errorDescription = err.response.data.error.message || errorDescription;
      }
      // Handle common HTTP status codes
      else if (err.response?.status === 409) {
        errorMessage = 'Email already registered';
        errorDescription = 'This email is already in use. Please sign in or use a different email.';
      } else if (err.response?.status === 422) {
        errorMessage = 'Invalid information';
        errorDescription = 'Please check your details and try again.';
      } else if (err.response?.status === 400) {
        errorMessage = 'Invalid request';
        errorDescription = err.response?.data?.message || 'Please check your information.';
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000,
      });

      // Clear password field for security
      form.setValue('password', '');
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return { form, onSubmit, pending: isPending };
};

export default useSignup;
