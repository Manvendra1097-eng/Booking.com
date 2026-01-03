import { API_CONFIG } from '@/config/aipconfig';
import { PATH } from '@/config/app.path';
import { useAuth } from '@/context_provider/auth-context-provider';
import { useMutation } from '@tanstack/react-query';
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

  // TanStack Query mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials) => {
      const response = await axiosInstance.post(API_CONFIG.SIGNIN, credentials);
      return response.data;
    },
    onSuccess: (response) => {
      // Extract access token from response
      // Assuming structure: { data: { accessToken: "..." } }
      const accessToken = response?.data?.accessToken;

      if (!accessToken) {
        toast.error('Login failed', {
          description: 'No access token received from server',
        });
        return;
      }

      // Update auth context (this triggers automatic profile fetch)
      login(accessToken);

      // Show success message
      toast.success('Welcome back!', {
        description: 'You have successfully signed in.',
      });

      // Navigate to home page
      setTimeout(() => {
        navigate(PATH.HOME, { replace: true });
      }, 300);
    },
    onError: (err) => {
      console.error('Login error:', err);

      let errorMessage = 'Login failed';
      let errorDescription = 'Please check your credentials and try again';

      // Handle API error response
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error.status || errorMessage;
        errorDescription = err.response.data.error.message || errorDescription;
      }
      // Handle common HTTP status codes
      else if (err.response?.status === 401) {
        errorMessage = 'Invalid credentials';
        errorDescription = 'The email or password you entered is incorrect.';
      } else if (err.response?.status === 404) {
        errorMessage = 'Account not found';
        errorDescription = 'No account exists with this email address.';
      } else if (err.response?.status === 403) {
        errorMessage = 'Account suspended';
        errorDescription = 'Your account has been suspended. Please contact support.';
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

export default useSignin;
