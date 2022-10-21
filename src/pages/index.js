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
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const { t } = useTranslation();
  const days = data.allMarkdownRemark.nodes;
  // const chapter = location.search.split('').splice(1).join('');
  const chapter = location.search.split('=')[1];

  console.log(chapter);
  const [openedDayId, setOpenedDayId] = useState(
    chapter || days[0].frontmatter.chapter,
  );
  const a = qs.parse({ page: `${openedDayId}` });

  console.log(qs.stringify(a));
  console.log(openedDayId);
  const b = qs.stringify(a);

  useEffect(() => {
    const onNavigate = () => {
      navigate(`?${qs.stringify(a)}`);
    };
    onNavigate();
  }, [a, openedDayId]);

  console.log(openedDayId);
  // const dayId = days[0].frontmatter.chapter;
  // console.log(navigate('?day-1'));
  // navigate('?day-1');
  // navigate(qs.stringify(dayId));

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
              ? days?.map(({ id, frontmatter }) => {
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
                        />
                      );
                    },
                  )
              : null}
          </ul>
          <Button text="adawadwad" handleClick={() => {}}></Button>
          <Modal isOpen={isOpen} closeModal={closeModal} />
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
