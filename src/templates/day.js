import { withLayout } from '../components/Layout/Layout';
import React from 'react';
import Section from '../components/Section';
// import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import ChapterList from '../components/Chapter/ChapterList';

const Day = ({ pageContext }) => {
  const day = pageContext;
  const { i18n } = useTranslation();

  console.log(day);

  return (
    // <Layout>
    <Section styles="main-section">
      <ChapterList />
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="font-montserrat text-4xl font-bold text-gray-700">
          День 1
        </h1>
      </div>
    </Section>
    // {/* </Layout> */}
  );
};

export default withLayout(Day);

// export const query = graphql`
//   query ($language: String!) {
//     locales: allLocale(filter: { language: { eq: $language } }) {
//       edges {
//         node {
//           ns
//           data
//           language
//         }
//       }
//     }
//   }
// `;
