// import { withLayout } from '../components/Layout/Layout';
import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
// import { useStaticQuery } from 'gatsby';
import { SearchContext } from '../hooks/searchContext.js';
import Section from '../components/Section';
import Layout from '../components/Layout/Layout';
import ChapterList from '../components/Chapter/ChapterList';

const Day = ({ data, location }) => {
  const days = useMemo(
    () => [
      ...data?.allMarkdownRemark?.nodes?.sort(
        (a, b) => a.frontmatter.chapter_range - b.frontmatter.chapter_range,
      ),
    ],
    [data],
  );

  return (
    <SearchContext.Provider value={{ days: days }}>
      <Layout>
        <Section>
          <ChapterList days={days} />
          <div className="flex h-1/3 flex-col items-center justify-center">
            <h1 className="font-montserrat text-4xl font-bold text-gray-700">
              Day
            </h1>
          </div>
        </Section>
      </Layout>
    </SearchContext.Provider>
  );
};

// export default withLayout(Day);

export default Day;

// export const data = useStaticQuery;

export const query = graphql`
  query ($language: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { language: { eq: $language } } }
    ) {
      nodes {
        frontmatter {
          title
          chapter_range
          chapter
          language
          subhead {
            subhead_title
            questions {
              id
              question_range
              content: description
              title: question_title
            }
          }
        }
      }
    }
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
