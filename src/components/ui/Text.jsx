import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React from 'react';

const textVarient = cva('', {
  variants: {
    variant: {
      h1: ' text-2xl font-bold tracking-tight text-balance',
      h2: ' text-xl font-bold tracking-tight first:mt-0',
      h3: ' text-lg font-bold tracking-tight',
      h4: ' text-sm font-bold tracking-tight',
      p: 'leading-5 [&:not(:first-child)]:mt-2',
      mutedp:
        'text-sm font-semibold text-muted-foreground [&:not(:first-child)]:mt-1',
      lead: 'text-muted-foreground text-xl',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

function Text({
  className,
  as: Component = 'p',
  variant = 'p',
  children,
  ...props
}) {
  return (
    <Component className={cn(textVarient({ className, variant }))} {...props}>
      {children}
    </Component>
  );
}

export default Text;
