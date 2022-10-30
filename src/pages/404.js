import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Section from '../components/Section';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const error = t('404', { returnObjects: true });
  return (
    <main>
      <Section
        styles={
          'not-found  min-h-[100vh] flex items-center bg-accent dark:bg-body-dark md:justify-center md:flex md:items-center'
        }
      >
        <div className="pb-[300px] md:max-w-[50%] md:py-12 xl:py-48">
          <h1 className="mb-4 justify-center text-center font-montserrat text-[1.25rem] font-bold leading-[1.2] text-font-light md:text-start xl:max-w-[380px] xl:text-[2rem]">
            {error.title}
          </h1>
          <p className="mb-16 text-center font-inter text-[1.125rem] font-light leading-[1.22] text-font-light md:text-start xl:text-[1.5rem]">
            {error.description}
          </p>
          <Link
            className="mx-auto table rounded border border-[#FCFCFC] bg-[#FCFCFC] py-4 px-8 text-center font-inter text-[0.875rem] font-semibold leading-[1.25rem] text-font-dark outline-none duration-300 hover:bg-transparent hover:text-font-light focus:bg-transparent focus:text-font-light md:mx-0"
            to="/"
          >
            {error.button}
          </Link>
        </div>
      </Section>
    </main>
  );
};

export default NotFoundPage;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
