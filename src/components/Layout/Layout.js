import * as React from 'react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import Header from '../Header/Header';
import Footer from '../Footer';
import Hero from '../Hero';
import Modal from '../Modal';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <div className=" flex min-h-screen flex-col">
          <div className="bg-accent dark:bg-accent-dark ">
            <Header openModal={openModal} />
            <Hero openModal={openModal} />
          </div>

          <main className="grow bg-body dark:bg-body-dark">{children}</main>

          <Footer />
          <Modal isOpen={isOpen} closeModal={closeModal} />
        </div>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export const withLayout = Component => props => {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};
