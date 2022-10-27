import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Hero from '../Hero';
import icons from '../../assets/images/sprite.svg';

const Layout = ({ children, openModal }) => {
  return (
    <div>
      <div className="relative overflow-hidden  bg-accent dark:bg-accent-dark ">
        <Header openModal={openModal} />
        <Hero openModal={openModal} />
        {/* <svg className="absolute  w-[268px] h-[172px] bottom-0  md:right-0 md:w-[369px] md:h-[231px] md:bottom-[-3px] xl:w-[812px] xl:h-[510px] ">
          <use href={`${icons}#hero-section`} />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[42px] h-[53px]">
          <use href={`${icons}#hero-bottom`} />
        </svg> */}
      </div>
      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
