import React from 'react';
import { Link } from 'gatsby';
import Icon from '../Icon';
import { logoLink, logo } from './Logo.module.css';

export default function Logo() {
  return (
    <Link to="/" className={logoLink} aria-label="company logo">
      <Icon className={logo} iconId="logo" />
    </Link>
  );
}
