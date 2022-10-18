import * as React from 'react';

import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ pageTitle, children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
