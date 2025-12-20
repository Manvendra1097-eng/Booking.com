import icons from '@/lib/icons';
import React from 'react';

function Icon({ icon, ...props }) {
  const IconComponent = icons[icon];
  return <IconComponent {...props} />;
}

export default Icon;
