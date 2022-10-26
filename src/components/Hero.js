import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { StaticImage } from 'gatsby-plugin-image';
import Container from './Container';
import icons from '../assets/images/sprite.svg';
import useMediaRules from '../helpers/getMedia';

const Hero = () => {
  const { t } = useTranslation();
  const media = useMediaRules();
  console.log(media);
  return (
    <section className="relative flex justify-center w-screen h-[220px] md:block md:h-[240px]">
      <Container>
        <h2 className="text-center font-bold text-xl leading-[1.2] text-font-light md:text-[40px] md:leading-[1.225] md:w-[329px] md:text-left md:mb-11">
          {t('Title')}
        </h2>
      </Container>
      {/* <StaticImage
        src="../assets/images/hero-mob.png"
        alt="hero"
        className="absolute h-[167px] w-[266px] top-0"
      /> */}
      <svg className="absolute  w-[268px] h-[172px] bottom-0 md:right-0 md:w-[369px] md:h-[231px] md:bottom-[-3px]">
        <use href={`${icons}#hero-section`} />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[42px] h-[53px]">
        <use href={`${icons}#hero-bottom`} />
      </svg>
    </section>
  );
};
export default Hero;
