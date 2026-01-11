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
import { useSignin } from '@/hooks/useSignin';
import { Link } from 'react-router';
import Auth from '.';

function Signin() {
  const { form, onSubmit, isPending } = useSignin();

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
            {form.formState.errors.root && (
              <p className="text-sm text-red-500 text-center">
                {form.formState.errors.root.message}
              </p>
            )}
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
