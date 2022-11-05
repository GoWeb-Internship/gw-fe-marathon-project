import React from 'react';
import { graphql } from 'gatsby';
import { withLayout } from '../components/Layout/Layout';
import FeedbackForm from '../components/FeedbackForm';

const FeedbackPage = () => {
  return <FeedbackForm />;
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
