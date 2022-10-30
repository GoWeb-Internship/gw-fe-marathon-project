import * as React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer';
import Hero from '../Hero';

const Layout = ({ children, openModal, isOpen }) => {
  return (
    <div className=" flex min-h-screen flex-col">
      <div className="bg-accent dark:bg-accent-dark ">
        <Header openModal={openModal} />
        <Hero openModal={openModal} isOpen={isOpen} />
      </div>
      <main className="grow bg-body dark:bg-body-dark">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
