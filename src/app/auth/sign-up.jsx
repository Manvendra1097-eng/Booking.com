import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Text from '@/components/ui/Text';
import { PATH } from '@/config/app.path';
import { Link } from 'react-router';
import Auth from '.';
import useSignup from './hooks/useSignup';

function Signup() {
  const { form, onSubmit, pending } = useSignup();

  return (
    <Auth title="Create Account" desc="Please fill the form to sign up">
      <div className="w-full  space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: 'Name is required.',
                minLength: {
                  value: 2,
                  message: 'Name should be greator than 2 length.',
                },
                maxLength: {
                  value: 30,
                  message: 'Name should not be grator than 30 characters.',
                },
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
                    <Input
                      type="password"
                      placeholder="enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="lg" className="w-full" disabled={pending}>
              {pending ? (
                <>
                  <span className="animate-spin mr-2">↻</span>
                  Creating New Account ...
                </>
              ) : (
                'Create New Account'
              )}
            </Button>
          </form>
        </Form>
        <div className="flex gap-2 justify-center">
          <Text variant="mutedp">Already have an account?</Text>
          <Link
            to={PATH.SIGN_IN}
            className="text-sm text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </Auth>
  );
}

export default Signup;
