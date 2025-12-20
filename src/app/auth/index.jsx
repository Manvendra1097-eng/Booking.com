import Text from '@/components/ui/Text';
import React from 'react';

function Auth({ children, title, desc }) {
  return (
    <div className="container my-10">
      <div className="w-full md:w-5/12 flex flex-col items-center mx-auto rounded-sm shadow  p-2">
        <img
          className="size-10 rounded-md"
          src="https://cdn.brandfetch.io/id9mEmLNcV/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1725855381233"
          alt=""
        />
        <Text variant="h2" className="mt-4">
          {title}
        </Text>
        <Text variant="mutedp">{desc}</Text>
        {children}
      </div>
    </div>
  );
}

export default Auth;
