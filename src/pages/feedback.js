import React from 'react';
import Layout from '../components/Layout/Layout';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
const FeedbackPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      {/* <p>{t('Form')}</p> */}
      <form>
        <input />
      </form>
    </Layout>
  );
};

export default FeedbackPage;

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
