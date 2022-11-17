import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import logoIcon from '../../assets/images/logo.svg';
import { logoLink, logo } from './Logo.module.css';

export default function Logo() {
  const { t } = useTranslation();

  return (
    <Link to="/" className={logoLink} aria-label="company logo">
      <img src={logoIcon} alt={t('logoAlt')} className={logo} />
    </Link>
  );
}
