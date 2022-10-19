import * as React from 'react';
import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { graphql } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Button from '../components/Button';
import Section from '../components/Section';

// const IndexPage = () => {
const IndexPage = ({ data }) => {
  const { t } = useTranslation();
  const days = data.allMarkdownRemark.nodes;
  const [openedDayId, setOpenedDayId] = useState(days[0].id || 0);

  return (
    <Layout>
      <Section>
        <p>{t('Subtitle')}</p>

        <ul className="flex gap-3">
          {days
            ? days?.map(({ id, frontmatter }) => {
                return (
                  <li
                    key={frontmatter.title}
                    className="flex gap-3 p-4 rounded-md duration-300 bg-blue-700 text-white hover:bg-blue-400"
                  >
                    <button onClick={() => setOpenedDayId(id)}>
                      {frontmatter.title}
                    </button>
                  </li>
                );
              })
            : null}
        </ul>
        <ul>
          {days
            ? days
                ?.find(day => openedDayId === day.id)
                ?.frontmatter?.subhead?.map(
                  ({ subhead_title, questions }, index) => {
                    return (
                      <div key={index}>
                        <h3>{subhead_title}</h3>
                        <ul key={index}>
                          {questions.map((question, index) => {
                            return (
                              <li key={index}>
                                <h2>
                                  <Markdown>{question.question_title}</Markdown>
                                </h2>
                                <p>
                                  <Markdown>{question.description}</Markdown>
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  },
                )
            : null}
        </ul>
        <Button text="adawadwad" handleClick={() => {}}></Button>
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { language: { eq: $language } } }
    ) {
      nodes {
        frontmatter {
          chapter
          language
          title
          subhead {
            subhead_title
            questions {
              question_title
              description
            }
          }
        }
        id
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
