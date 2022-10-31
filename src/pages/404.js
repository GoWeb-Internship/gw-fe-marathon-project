import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Section from '../components/Section';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import * as css from '../assets/styles/sections/404.module.css';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const content = t('404', { returnObjects: true });

  return (
    <main>
      <Section styles={css.section}>
        <div className={css.wrapper}>
          <h1 className={css.title}>{content.title}</h1>
          <p className="mb-16 text-center font-inter text-[1.125rem] font-light leading-[1.22] text-font-light md:text-start xl:text-[1.5rem]">
            {content.description}
          </p>
          <Link
            className="mx-auto table rounded border border-[#FCFCFC] bg-[#FCFCFC] py-4 px-8 text-center font-inter text-[0.875rem] font-semibold leading-[1.25rem] text-font-dark outline-none duration-300 hover:bg-transparent hover:text-font-light focus:bg-transparent focus:text-font-light md:mx-0"
            to="/"
          >
            {content.btn}
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
