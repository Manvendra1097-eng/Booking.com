import { FOOTER_SECTION, SOCIAL_LINKS } from '@/config/app.config';
import dayjs from 'dayjs';
import React from 'react';
import Icon from '../ui/icon';

function Footer() {
  return (
    <div className="bg-secondary ">
      <div className="container grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] py-6 gap-6">
        {FOOTER_SECTION.map((element) => (
          <div key={element.title} className="space-y-3">
            <h4 className="text-sm font-bold ">{element.title}</h4>
            <ul className="space-y-2">
              {element.links.map((link) => (
                <li
                  key={link.text}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  {link.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-brand">
        <div className="flex flex-col flex-wrap items-center justify-center gap-4 p-4 mx-auto sm:flex-row sm:justify-between max-w-7xl">
          <div className="flex items-center justify-center gap-4">
            {SOCIAL_LINKS.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="text-slate-100 hover:text-slate-300 transition-colors"
              >
                <Icon icon={link.icon} size="18" />
              </a>
            ))}
          </div>
          <div>
            <p className="text-sm text-center text-white">
              Copyright &copy;{' '}
              {`${dayjs().year()} Booking.com™. All rights reserved.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
