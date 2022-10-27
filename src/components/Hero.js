import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
// import { StaticImage } from 'gatsby-plugin-image';
import Container from './Container';
import useMediaRules from '../helpers/getMedia';
import Icon from './Icon';

const Hero = () => {
  const { t } = useTranslation();
  const media = useMediaRules();

  return (
    <section className="relative flex h-[220px] justify-center overflow-hidden md:block md:h-[240px]">
      <Container>
        <h2 className="text-center font-montserrat text-xl font-bold leading-[1.2] text-font-light md:mb-11 md:w-[329px] md:text-left md:text-[40px] md:leading-[1.225]">
          {t('Title')}
        </h2>
      </Container>

      <Icon
        className="absolute  bottom-0 h-[172px] w-[268px] md:right-0 md:bottom-[-3px] md:h-[231px] md:w-[369px]"
        iconId="hero-section"
      />
      <Icon
        className="absolute bottom-0 left-0 h-[53px] w-[42px]"
        iconId="hero-bottom"
      />
    </section>
  );
};
export default Hero;
