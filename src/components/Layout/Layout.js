import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Hero from '../Hero';

const Layout = ({ children, openModal }) => {
  return (
    <div>
      <div className="bg-accent dark:bg-accent-dark ">
        <Header openModal={openModal} />
        <Hero openModal={openModal} />
      </div>
      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
