import React from 'react';
import icons from '../assets/images/sprite.svg';

const Footer = () => {
  return (
    <footer className="relative -z-[1] overflow-hidden text-center h-[82px] bg-accent py-[29px] text-font-light font-semibold text-xl leading-6 dark:bg-accent-dark">
      <p>GoIT 2022</p>
      <svg className="absolute  w-[60px] h-[90px] top-1 right-[-3px] -rotate-2 md:w-[134px] md:h-[196px] md:top-[-81px] md:right-[-22px] md:rotate-[-7deg] xl:w-[188px] xl:h-[274px] xl:top-[-121px] xl:right-[-41px] xl:rotate-0">
        <use href={`${icons}#footer-right`} />
      </svg>
      <svg className="absolute  w-[60px] h-[88px] top-[3px] left-[-3px] md:w-[134px] md:h-[196px]  md:left-[-35px] md:top-[-78px] xl:w-[188px] xl:h-[274px]  xl:left-[-53px] xl:top-[-121px] xl:rotate-[-3deg]">
        <use href={`${icons}#footer-left`} />
      </svg>
    </footer>
  );
};

export default Footer;
