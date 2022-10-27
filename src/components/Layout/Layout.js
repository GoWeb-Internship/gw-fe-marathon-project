import * as React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer';
import Hero from '../Hero';

const Layout = ({ children, openModal }) => {
  return (
    <div>
      <div className="bg-accent dark:bg-accent-dark ">
        <Header openModal={openModal} />
        <Hero openModal={openModal} />
      </div>
      <main className="bg-body dark:bg-body-dark ">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
