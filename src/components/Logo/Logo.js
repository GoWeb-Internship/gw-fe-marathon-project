import React from 'react';
import { Link } from 'gatsby';
import logoIcon from '../../assets/images/logo.svg';
import { logoLink, logo } from './Logo.module.css';

export default function Logo() {
  return (
    <Link to="/" className={logoLink} aria-label="company logo">
      <img src={logoIcon} alt="company logo" className={logo} />
    </Link>
  );
}
