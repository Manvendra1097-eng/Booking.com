import React from 'react';
import { Button } from '../ui/button';
import { SERVICE_LIST } from '@/config/app.config';
import Icon from '../ui/icon';
import { Link } from 'react-router';
import { PATH } from '@/config/app.path';
import { useAuth } from '@/context_provider/auth-context-provider';
import UserDropdown from '@/app/auth/use-drop-down';

function Header() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <header className="bg-brand pt-2">
        <div className="container flex justify-between items-center">
          <div className="logo-wrapper">
            <a href="/" aria-label="Go to Booking.com">
              <img
                width={144}
                height={24}
                src="/assets/booking.com.svg"
                alt="Booking.com Logo"
              />
            </a>
          </div>

          <div className="flex gap-2 items-center">
            {/* Skeleton loaders while checking auth */}
            <div className="w-20 h-10 bg-white/20 rounded-sm animate-pulse"></div>
            <div className="w-20 h-10 bg-white/20 rounded-sm animate-pulse"></div>
          </div>
        </div>

        <div className="container flex gap-1 overflow-x-scroll scrollbar">
          {SERVICE_LIST.map((item) => (
            <Button
              key={item.id}
              className={`bg-transparent rounded-full hover:bg-white/10 cursor-pointer px-6 h-11 font-normal flex justify-between items-center gap-2 ${
                item.active && 'border border-white bg-white/10'
              }`}
            >
              <Icon icon={item.icon} />
              {item.title}
            </Button>
          ))}
        </div>
      </header>
    );
  }

  return (
    <header className="bg-brand pt-2">
      <div className="container flex justify-between items-center">
        <div className="logo-wrapper">
          <a href="/" aria-label="Go to Booking.com">
            <img
              width={144}
              height={24}
              src="/assets/booking.com.svg"
              alt="Booking.com Logo"
            />
          </a>
        </div>

        <div className="flex gap-2 items-center justify-center">
          {!isAuthenticated ? (
            <>
              <Button
                asChild
                className="bg-background text-primary rounded-sm cursor-pointer hover:bg-white/95"
              >
                <Link to={PATH.SIGN_UP}>Register</Link>
              </Button>
              <Button
                asChild
                className="bg-background text-primary rounded-sm cursor-pointer hover:bg-white/95"
              >
                <Link to={PATH.SIGN_IN}>Login</Link>
              </Button>
            </>
          ) : (
            <UserDropdown />
          )}
        </div>
      </div>

      <div className="container flex gap-1 overflow-x-scroll scrollbar">
        {SERVICE_LIST.map((item) => (
          <Button
            key={item.id}
            className={`bg-transparent rounded-full hover:bg-white/10 cursor-pointer px-6 h-11 font-normal flex justify-between items-center gap-2 ${
              item.active && 'border border-white bg-white/10'
            }`}
          >
            <Icon icon={item.icon} />
            {item.title}
          </Button>
        ))}
      </div>
    </header>
  );
}

export default Header;
