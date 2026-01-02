import React from 'react';
import Auth from '.';
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
import { Link } from 'react-router';
import { PATH } from '@/config/app.path';
import useSignin from './hooks/useSignin';

function Signin() {
  const { form, onSubmit, pending } = useSignin();

  return (
    <Auth title="Welcome Back" desc="Please enter your details to sign in">
      <div className="w-full space-y-4">
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
                    <Input
                      placeholder="enter your email"
                      {...field}
                      disabled={pending}
                    />
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
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="enter your password"
                      {...field}
                      disabled={pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={pending}
              size="lg"
              className="w-full"
            >
              {pending ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
        <div className="flex gap-2 justify-center">
          <Text variant="mutedp">Don't have an account?</Text>
          <Link
            to={PATH.SIGN_UP}
            className="text-sm text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </Auth>
  );
}

export default Signin;
