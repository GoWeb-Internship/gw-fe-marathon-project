import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Container from './Container';
import icons from '../assets/images/sprite.svg';
import useMediaRules from '../helpers/getMedia';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Hero = ({ openModal }) => {
  const { t } = useTranslation();
  const media = useMediaRules();

  return (
    <section className="relative  flex justify-center overflow-hidden pb-[194px] pt-[22px]  md:block md:pt-16 md:pb-[70px] xl:py-[149px] ">
      <Container>
        <h2 className=" text-center font-montserrat text-xl font-bold leading-[1.2] text-font-light md:mb-11 md:w-[342px] md:text-left md:text-[40px] md:leading-[1.225] xl:mb-16 xl:w-[420px] xl:text-5xl xl:leading-[59px]">
          {t('Title')}
        </h2>
        {media !== 'mobile' && (
          <button
            className="relative border-b-2 border-solid border-b-font-light  text-left font-inter text-xs font-extralight text-font-search md:h-[28px] md:w-[336px] xl:h-9 xl:w-96"
            onClick={openModal}
          >
            {t('input')}
            <MagnifyingGlassIcon className="absolute top-0 right-[10px] z-0 h-5 w-5  text-font-light" />
          </button>
        )}
      </Container>
      <svg className="absolute  bottom-0 h-[172px] w-[268px] md:right-[-13px] md:bottom-[-3px] md:h-[231px] md:w-[369px] xl:bottom-[-7px] xl:right-[-20px] xl:h-[508px] xl:w-[812px]">
        <use href={`${icons}#hero-section`} />
      </svg>
      <svg className="absolute bottom-0 left-0 h-[53px] w-[42px]">
        <use href={`${icons}#hero-bottom`} />
      </svg>
    </section>
  );
};
export default Hero;
