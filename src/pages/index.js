import * as React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { graphql, navigate } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Section from '../components/Section';
import Modal from '../components/Modal';
import Accordion from '../components/Accordion';
import { SearchContext } from '../utils/searchContext.js';
import qs from 'qs';
import Hero from '../components/Hero/Hero';

const IndexPage = ({ data, location }) => {
  const days = [
    ...data?.allMarkdownRemark?.nodes?.sort(
      (a, b) => a.frontmatter.chapter_range - b.frontmatter.chapter_range,
    ),
  ];

  const { page: chapter, title: id } = qs.parse(location.search.slice(1));
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const [openedDayId, setOpenedDayId] = useState(
    chapter || days[0].frontmatter.chapter,
  );
  const [questionId, setQuestionId] = useState({});

  const { t } = useTranslation();

  let obj = {};

  useEffect(() => {
    data.allMarkdownRemark.nodes?.map(item => {
      item.frontmatter.subhead.map(element => {
        element.questions.map(el => {
          obj[String(el.id)] = false;
        });
      });
    }, {});

    setQuestionId(obj);
  }, [chapter, id]);

  const handleChangeAccordion = id => {
    setQuestionId(prev => Object.assign({}, prev, { [id]: !prev[id] }));
  };

  useEffect(() => {
    if (chapter) setOpenedDayId(chapter);
    if (id) activateCurrentAccordion(obj, id);
  }, [chapter, id]);

  function activateCurrentAccordion(obj, id) {
    if (Object.keys(obj).length > 0) {
      for (let key in obj) {
        obj[key] = false;
      }

      obj[id] = true;

      setQuestionId(obj);
    }
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleNavigate = redirect => {
    setSearchParams(redirect);
    // navigate(`?${redirect}`);
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
                      className="flex gap-3 rounded-md bg-blue-700 p-4 text-white duration-300 hover:bg-blue-400"
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
                        <Accordion
                          key={index}
                          subhead_title={subhead_title}
                          questions={questions}
                          questionId={questionId}
                          changeId={handleChangeAccordion}
                        />
                      );
                    },
                  )
              : null}
          </ul>
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
