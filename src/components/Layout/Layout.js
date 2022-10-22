import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children, openModal }) => {
  return (
    <div>
      <Header openModal={openModal} />
      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
