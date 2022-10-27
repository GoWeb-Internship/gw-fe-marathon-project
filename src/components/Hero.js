import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { StaticImage } from 'gatsby-plugin-image';
import Container from './Container';
import icons from '../assets/images/sprite.svg';
import useMediaRules from '../helpers/getMedia';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Hero = ({ openModal }) => {
  const { t } = useTranslation();
  const media = useMediaRules();

  return (
    <section className="relative flex overflow-hidden justify-center h-[220px] md:block md:h-[240px] xl:h-[477px] ">
      <Container>
        <h2 className="text-center font-montserrat font-bold text-xl leading-[1.2] text-font-light md:text-[40px] md:leading-[1.225] md:w-[342px] md:text-left md:mb-11 xl:py-[146px]">
          {t('Title')}
        </h2>
        {media !== 'mobile' && (
          <button
            className="relative  md:w-[336px] md:h-[28px] border-b-2 border-solid border-b-font-light xl:w-96"
            onClick={openModal}
          >
            <MagnifyingGlassIcon className="absolute top-0 right-[10px] h-5 w-5 z-0  text-font-light" />
          </button>
        )}
      </Container>
      {/* <StaticImage
        src="../assets/images/hero-mob.png"
        alt="hero"
        className="absolute h-[167px] w-[266px] top-0"
      /> */}
      <svg className="absolute  w-[268px] h-[172px] bottom-0 md:right-0 md:w-[369px] md:h-[231px] md:bottom-[-3px] xl:w-[812px] xl:h-[510px] ">
        <use href={`${icons}#hero-section`} />
      </svg>
      <svg className="absolute bottom-0 left-0 w-[42px] h-[53px]">
        <use href={`${icons}#hero-bottom`} />
      </svg>
    </section>
    // <input
    //   className="w-12 h-12 relative z-1 bg-transparent cursor-default"
    //   type="text"
    //   name="search"
    //   onChange={e => {
    //     e.target.value = '';
    //     openModal();
    //   }}
    // />
  );
};
export default Hero;
