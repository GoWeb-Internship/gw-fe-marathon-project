import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Container from '../components/Container';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import * as css from '../assets/styles/sections/404.module.css';
import Seo from '../components/Seo';

const NotFoundPage = () => {
  const { t, i18n } = useTranslation();
  const content = t('404', { returnObjects: true });

  return (
    <>
      <Seo
        title="404 Not Found"
        description={content.title}
        lang={i18n.language}
      />
      <main>
        <section className={`${css.section} dark:bg-body-dark`}>
          <Container styles={css.container}>
            <div className={css.wrapper}>
              <h1 className={css.title}>{content.title}</h1>
              <p className={css.text}>{content.description}</p>
              <Link className={css.link} to="/">
                {content.button}
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
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
