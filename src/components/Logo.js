import React from 'react';
import logo from '../assets/images/logo.svg';
import { Link } from 'gatsby';

export default function Logo() {
  return (
    <Link to="/" className="w-25 relative z-20 block h-full">
      <img
        src={logo}
        alt="company logo"
        className="md:w-25 block h-6 w-20 md:h-7"
      />
    </Link>
  );
}
