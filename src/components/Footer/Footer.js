import React from 'react';
import Icon from '../Icon';
import { footer, iconRight, iconLeft } from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={`${footer} dark:bg-accent-dark`} id="footer">
      <p>GoIT 2022</p>

      <Icon className={iconRight} iconId="footer-right" />
      <Icon className={iconLeft} iconId="footer-left" />
    </footer>
  );
};

export default Footer;
