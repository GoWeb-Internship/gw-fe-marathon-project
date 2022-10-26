import React from 'react';
import logo from '../assets/images/logo.svg';
import { Link } from 'gatsby';

export default function Logo() {
  return (
    <Link to="/" className="block relative z-20 h-6 w-20 md:w-24">
      <img src={logo} alt="company logo" className="block w-full md:w-24" />
    </Link>
  );
}
