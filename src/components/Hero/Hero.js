import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Container from '../Container';
import useMediaRules from '../../helpers/getMedia';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Icon from '../Icon';
import {
  people,
  title,
  searchIcon,
  iconBottom,
  section,
  search,
} from './Hero.module.css';

const Hero = ({ openModal }) => {
  const { t } = useTranslation();
  const media = useMediaRules();

  return (
    <section className={section}>
      <Container>
        <h2 className={title}>{t('title')}</h2>
        {media !== 'mobile' && (
          <button className={search} onClick={openModal}>
            {t('input')}
            <MagnifyingGlassIcon className={searchIcon} />
          </button>
        )}
        <Icon className={people} iconId="hero-section" />
      </Container>
      <Icon className={iconBottom} iconId="hero-bottom" />
    </section>
  );
};
export default Hero;
