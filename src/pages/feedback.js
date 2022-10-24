import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import FeedbackForm from '../components/FeedbackForm';

const FeedbackPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <p>{t('Form')}</p>
      <FeedbackForm />
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
