import React from 'react';
import Auth from '.';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Text from '@/components/ui/Text';
import { Link, replace, useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios-instance';
import { useAuth } from '@/context/authContext';

function Signin() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const login = (credentials) => {
    const res = axiosInstance.post('/auth/login', credentials);
    return res;
  };

  const handleLoginSuccess = (res) => {
    const accessToken = res.data?.data?.accessToken || null;
    setToken(accessToken);
    navigate('/', { replace: true });
  };
  const handleLoginError = (err) => {
    setToken(null);
    console.log(err);
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Auth title="Welcome Back" desc="Please enter your details to sign in">
      <div className="w-full  space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 w-full space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: 'Password is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} size="lg" className="w-full">
              {isPending ? (
                <>
                  {' '}
                  <span className="animate-spin">↻</span> Signing...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </Form>
        <div className="flex gap-2 justify-center">
          <Text variant="mutedp">Don't have an account?</Text>
          <Link to="/signin" className="text-sm text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </Auth>
  );
}

export default Signin;
