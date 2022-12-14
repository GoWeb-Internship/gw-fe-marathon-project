import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Container from '../Container';
import useMediaRules from '../../helpers/getMedia';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { title, searchIcon, section, search } from './Hero.module.css';
import PropTypes from 'prop-types';
import { useLocation } from 'react-use';
import { routes } from '../../utils/routes';
import { heroContainer } from './Hero.module.css';

const Hero = ({ openModal, isOpen }) => {
  const { t } = useTranslation();
  const main = t('title', { returnObjects: true });
  const media = useMediaRules();

  const { pathname } = useLocation();
  return (
    <section className={section}>
      <Container styles={heroContainer}>
        {media !== 'mobile' ? (
          <h1 className={title}>
            {main.split(' ')[0]}
            <br />
            {main.split(' ').slice(1).join(' ')}
          </h1>
        ) : (
          <h1 className={title}>{main}</h1>
        )}

        {media !== 'mobile' &&
        !pathname?.includes(routes.FEEDBACK) &&
        !isOpen ? (
          <button
            className={`${search} dark:text-font-searchDark`}
            onClick={openModal}
          >
            {t('input')}
            <MagnifyingGlassIcon className={searchIcon} />
          </button>
        ) : null}
      </Container>
    </section>
  );
};
export default Hero;

Hero.propTypes = {
  openModal: PropTypes.func,
};
