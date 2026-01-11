import React from 'react';
import { Button } from '../ui/button';
import { SERVICE_LIST } from '@/config/app.config';
import Icon from '../ui/icon';
import { Link } from 'react-router';
import { useAuth } from '@/context/authContext';
import AvatarDropDownMenu from '../AvatarDropDownMenu';

function Header() {
  const { token, profile } = useAuth();
  return (
    <header className="bg-brand pt-2 px-6 lg:px-0">
      <div className="container flex justify-between items-center">
        <div className="logo-wrapper">
          <Link to="/" aria-label="Go to Booking.com">
            <img
              width={144}
              height={24}
              src="/assets/booking.com.svg"
              alt="Booking.com Logo"
            />
          </Link>
        </div>
        <div className="flex gap-2 items-center justify-center ">
          {!token && (
            <Button className="bg-background text-primary rounded-sm cursor-pointer hover:bg-white/95">
              <Link to="/signup">Register</Link>
            </Button>
          )}
          <Button
            asChild
            className="bg-background text-primary rounded-sm cursor-pointer hover:bg-white/95"
          >
            {token && profile ? (
              <AvatarDropDownMenu />
            ) : (
              <Link to="/signin">Login</Link>
            )}
          </Button>
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
