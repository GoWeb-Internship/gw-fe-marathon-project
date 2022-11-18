import React from 'react';
import { graphql } from 'gatsby';
import { withLayout } from '../components/Layout/Layout';
import FeedbackForm from '../components/FeedbackForm';
import Seo from '../components/Seo';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const FeedbackPage = () => {
  const { t, i18n } = useTranslation();
  const form = t('Form', { returnObjects: true });

  return (
    <>
      <Seo title={form.seo} description={form.title} lang={i18n.language} />
      <FeedbackForm />
    </>
  );
};

export default withLayout(FeedbackPage);

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
