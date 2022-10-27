import React from 'react';
import Icon from './Icon';

const Footer = () => {
  return (
    <footer className="relative -z-[1] h-[82px] overflow-hidden bg-accent py-[29px] text-center text-xl font-semibold leading-6 text-font-light dark:bg-accent-dark">
      <p>GoIT 2022</p>

      <Icon
        className="absolute  top-1 right-[-3px] h-[90px] w-[60px] -rotate-2 md:top-[-81px] md:right-[-22px] md:h-[196px] md:w-[134px] md:rotate-[-7deg] xl:top-[-121px] xl:right-[-41px] xl:h-[274px] xl:w-[188px] xl:rotate-0"
        iconId="footer-right"
      />
      <Icon
        className="absolute  top-[3px] left-[-3px] h-[88px] w-[60px] md:left-[-35px] md:top-[-78px]  md:h-[196px] md:w-[134px] xl:left-[-53px] xl:top-[-121px]  xl:h-[274px] xl:w-[188px] xl:rotate-[-3deg]"
        iconId="footer-left"
      />
    </footer>
  );
};

export default Footer;
