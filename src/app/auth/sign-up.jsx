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
import { Link } from 'react-router';
import { useSignup } from '@/hooks/useSignup';

function Signup() {
  const { form, onSubmit, isPending } = useSignup();
  return (
    <Auth title="Create Account" desc="Please fill the form to sign up">
      <div className="w-full  space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 w-full space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: 'Name is required',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <span className="animate-spin">↻</span> Creating & Login...
                </>
              ) : (
                'Create New Account'
              )}
            </Button>
          </form>
        </Form>
        <div className="flex gap-2 justify-center">
          <Text variant="mutedp">Already have an account?</Text>
          <Link to="/signin" className="text-sm text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </Auth>
  );
}

export default Signup;
