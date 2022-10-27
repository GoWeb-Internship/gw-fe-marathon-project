import React from 'react';
import { Link } from 'gatsby';
import Icon from './Icon';

export default function Logo() {
  return (
    <Link
      to="/"
      className="w-25 relative z-20 block h-full"
      ariaLabel="company logo"
    >
      <Icon className="md:w-25 block h-6 w-20 md:h-7" iconId="logo" />
    </Link>
  );
}
