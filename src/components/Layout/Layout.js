import * as React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Search from '../Search';

const Layout = ({ children, openModal }) => {
  return (
    <div>
      <Header openModal={openModal} />
      <Search />
      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
