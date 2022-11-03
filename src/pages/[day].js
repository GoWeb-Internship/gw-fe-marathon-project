import { withLayout } from '../components/Layout/Layout';
import React from 'react';
import { graphql } from 'gatsby';
import Section from '../components/Section';
import ChapterList from '../components/Chapter/ChapterList';
// import { useStaticQuery } from 'gatsby';

const Day = () => {
  return (
    // <Layout>
    <Section styles="main-section">
      <ChapterList />
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="font-montserrat text-4xl font-bold text-gray-700">
          Day
        </h1>
      </div>
    </Section>
    // {/* </Layout> */}
  );
};

export default withLayout(Day);

// export default Day;

// export const data = useStaticQuery;
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
