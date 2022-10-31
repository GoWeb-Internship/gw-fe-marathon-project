import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { graphql, navigate } from 'gatsby';
import Section from '../components/Section';
import Modal from '../components/Modal';
import Accordion from '../components/Accordion/Accordion';
import { SearchContext } from '../hooks/searchContext.js';
import qs from 'qs';
import ChapterList from '../components/Chapter';
import Icon from '../components/Icon';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { useCallback } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

const IndexPage = ({ data, location }) => {
  const days = useMemo(
    () => [
      ...data?.allMarkdownRemark?.nodes?.sort(
        (a, b) => a.frontmatter.chapter_range - b.frontmatter.chapter_range,
      ),
    ],
    [data],
  );

  const { page: chapter, title: id } = qs.parse(location.search.slice(1));
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const [openedDayId, setOpenedDayId] = useState(
    chapter || days[0].frontmatter.chapter,
  );
  const [questionId, setQuestionId] = useState({});
  const [dataByChapter, setDataByChapter] = useState(null);
  const [visibleQuestions, setVisibleQuestions] = useState(null);
  const [isBtnMoreShown, setIsBtnMoreShown] = useState(false);
  const [isShownFullChapter, setIsShownFullChapter] = useState(false);

  const { t } = useTranslation();
  const button = t('showMoreButton', { returnObjects: true });

  let obj = {};

  useEffect(() => {
    const openedDayData = days?.find(
      day => openedDayId === day.frontmatter.chapter,
    ).frontmatter;

    setDataByChapter(openedDayData);
    setIsBtnMoreShown(false);
    setIsShownFullChapter(false);
  }, [days, openedDayId]);

  const showLessQuestions = useCallback(() => {
    const arrayOfSubheads = dataByChapter?.subhead;

    const allQuestions = arrayOfSubheads.reduce((prev, { questions }) => {
      return [...prev, ...questions];
    }, []);

    if (allQuestions.length <= 5) {
      setVisibleQuestions(arrayOfSubheads);
    } else if (allQuestions.length > 5 && arrayOfSubheads.length === 1) {
      const shortArray = getShortArray(arrayOfSubheads, 0, 5);

      setVisibleQuestions(shortArray);
      setIsBtnMoreShown(true);
    } else if (allQuestions.length > 5 && arrayOfSubheads.length > 1) {
      const shortArray = getShortArray(arrayOfSubheads, 0, 5);

      if (arrayOfSubheads[0].questions.length < 5) {
        const longArray = [
          ...shortArray,
          ...getShortArray(
            arrayOfSubheads,
            1,
            5 - arrayOfSubheads[0].questions.length,
          ),
        ];

        setVisibleQuestions(longArray);
        setIsBtnMoreShown(true);
        return;
      }

      setVisibleQuestions(shortArray);
      setIsBtnMoreShown(true);
    }
  }, [dataByChapter]);

  useEffect(() => {
    if (!dataByChapter) return;

    showLessQuestions();
  }, [chapter, dataByChapter, isBtnMoreShown, showLessQuestions]);

  function getShortArray(array, i, count) {
    return [
      {
        subhead_title: array[i].subhead_title,
        questions: array[i].questions.filter((el, index) => index < count),
      },
    ];
  }

  function handleToggleShowMore() {
    isShownFullChapter
      ? setIsShownFullChapter(false)
      : setIsShownFullChapter(true);
  }

  useEffect(() => {
    if (!dataByChapter) return;

    // if (isShownFullChapter) {
    //   setVisibleQuestions(dataByChapter?.subhead);
    //   document.getElementById('footer').scrollIntoView();
    // } else {
    //   showLessQuestions();
    // }

    isShownFullChapter
      ? setVisibleQuestions(dataByChapter?.subhead)
      : showLessQuestions();
  }, [dataByChapter, isShownFullChapter, showLessQuestions]);

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
        <Section styles="py-[34px] md:py-11 xl:relative xl:min-h-[792px] xl:pt-20 xl:pb-20 pb-15">
          <ChapterList
            days={days}
            setOpenedDayId={setOpenedDayId}
            openedDayId={openedDayId}
          />

          <div>
            <ul className="subhead-list">
              {visibleQuestions
                ? visibleQuestions?.map(
                    ({ subhead_title, questions }, index) => {
                      return (
                        <Accordion
                          key={index}
                          subhead_title={subhead_title}
                          questions={questions}
                          questionId={questionId}
                          changeId={handleChangeAccordion}
                          location={location}
                          chapter={openedDayId}
                        />
                      );
                    },
                  )
                : null}
            </ul>

            {isBtnMoreShown ? (
              <button onClick={handleToggleShowMore} className="btn-show-more ">
                {isShownFullChapter ? button.hide : button.show}

                <ArrowUpIcon
                  className={`btn-show-more-icon 
          ${isShownFullChapter ? 'rotate-0' : '-rotate-180'}`}
                />
              </button>
            ) : null}
          </div>

          <Icon iconId="main-page" className="main-page-image-mobile" />
          <Icon
            iconId="main-page-desktop"
            className="main-page-image-desktop"
          />
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
