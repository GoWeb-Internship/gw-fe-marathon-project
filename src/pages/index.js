import * as React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { graphql, navigate } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Button from '../components/Button';
import Section from '../components/Section';
import Modal from '../components/Modal';
import Accordion from '../components/Accordion';
import { SearchContext } from '../utils/searchContext.js';
import qs from 'qs';

const IndexPage = ({ data, location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const days = [
    ...data.allMarkdownRemark.nodes.sort(
      (a, b) => a.frontmatter.chapter_range - b.frontmatter.chapter_range,
    ),
  ];
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useState('');
  const chapter = location.search?.split('=')[1]?.split('&')[0];
  const id = location.search?.split('&')[1]?.split('=')[1];
  const [openedDayId, setOpenedDayId] = useState(
    chapter || days[0].frontmatter.chapter,
  );
  const [questionId, setQuestionId] = useState(id || null);

  console.log(days);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleNavigate = redirect => {
    setSearchParams(redirect);
  };

  useEffect(() => {
    if (searchParams) {
      navigate(`?${searchParams}`);
    }
  }, [searchParams]);

  // useEffect(() => {
  //   if (window.netlifyIdentity) {
  //     window.netlifyIdentity.on('init', user => {
  //       if (!user) {
  //         window.netlifyIdentity.on('login', () => {
  //           document.location.href = '/admin/';
  //         });
  //       }
  //     });
  //   }
  // }, []);

  return (
    <SearchContext.Provider value={{ days: days }}>
      <Layout openModal={openModal}>
        <Section>
          <p>{t('Subtitle')}</p>

          <ul className="flex gap-3">
            {days
              ? days?.map(({ frontmatter }) => {
                  return (
                    <li
                      key={frontmatter.title}
                      className="flex gap-3 p-4 rounded-md duration-300 bg-blue-700 text-white hover:bg-blue-400"
                    >
                      <button
                        onClick={() => {
                          setOpenedDayId(frontmatter.chapter);
                        }}
                      >
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
                  ?.find(day => openedDayId === day.frontmatter.chapter)
                  ?.frontmatter?.subhead?.map(
                    ({ subhead_title, questions }, index) => {
                      return (
                        // <div key={index}>
                        //   <h3>{subhead_title}</h3>
                        //   <ul key={index}>
                        //     {questions.map((question, index) => {
                        //       return (
                        //         <li key={index}>
                        //           <h2>
                        //             <Markdown>{question.title}</Markdown>
                        //           </h2>
                        //           {}
                        //           <div>
                        //             <Markdown>{question.content}</Markdown>
                        //           </div>
                        //         </li>
                        //       );
                        //     })}
                        //   </ul>
                        // </div>
                        <Accordion
                          key={index}
                          subhead_title={subhead_title}
                          questions={questions}
                          index={index}
                          questionId={questionId}
                        />
                      );
                    },
                  )
              : null}
          </ul>
          <Button text="adawadwad" handleClick={() => {}}></Button>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            onNavigate={handleNavigate}
          />
        </Section>
      </Layout>
    </SearchContext.Provider>
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
