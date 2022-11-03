import * as React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer';
import Hero from '../Hero';
import PropTypes from 'prop-types';

const Layout = ({ children, openModal }) => {
  return (
    <div className=" flex min-h-screen flex-col">
      <div className="bg-accent dark:bg-accent-dark ">
        <Header openModal={openModal} />
        <Hero openModal={openModal} />
      </div>
      <main className="grow bg-body dark:bg-body-dark">{children}</main>

      <Footer />
    </div>
  );
};

export const withLayout = Component => props => {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

Layout.propTypes = {
  openModal: PropTypes.func,
};
