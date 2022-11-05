import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import qs from 'qs';
import { withLayout } from '../components/Layout/Layout';

import Section from '../components/Section';
import ChapterList from '../components/Chapter/ChapterList';
import Accordion from '../components/Accordion/Accordion';
import SyncLoader from 'react-spinners/SyncLoader';
import Icon from '../components/Icon';

const Day = ({ data, pageContext, location }) => {
  const chapter = pageContext.i18n.originalPath.slice(1);
  const day = data?.allMarkdownRemark?.nodes?.find(
    day => chapter === day.frontmatter.chapter,
  ).frontmatter;

  const [questionId, setQuestionId] = useState({});
  const [id, setId] = useState(null);

  const [isSpinnerShown, setIsSpinnerShown] = useState(false);
  const [visibleQuestions, setVisibleQuestions] = useState(null);
  const [numberOfPage, setNumberOfPage] = useState(1);
  const [countOfPages, setCountOfPages] = useState(1);
  const [visibleQuestionsId, setVisibleQuestionsId] = useState(null);
  const [allQuestions, setAllQuestions] = useState(null);
  const countOfQuestionsAtPage = 5;
  const target = document.getElementById('spinner');
  let url = new URL(location.href);

  const spinnerDefault = '#3b82f6';
  const spinnerDarkTheme = '#fcfcfc';
  const [color, setColor] = useState(spinnerDefault);
  let htmlDark;

  if (typeof window !== 'undefined') {
    htmlDark = document.querySelector('.dark');
  }
  const darkSpinner = () => {
    if (htmlDark) {
      setColor(spinnerDarkTheme);
    }
  };

  useEffect(() => {
    if (!visibleQuestions || !id) return;

    handleChangeAccordion(id);

    document.getElementById(`${id}`)?.scrollIntoView({ behavior: 'smooth' });
  }, [id, visibleQuestions]);

  useEffect(() => {
    numberOfPage < countOfPages
      ? setIsSpinnerShown(true)
      : setIsSpinnerShown(false);
  }, [countOfPages, numberOfPage]);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    function handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setNumberOfPage(prevState => prevState + 1);
        }
      });
    }

    observer?.observe(target);
  }, [target]);

  useEffect(() => {
    if (!visibleQuestionsId) {
      return;
    }
    const arrayOfSubheads = day.subhead;

    const visibleQuestionsAtPage = arrayOfSubheads.map(subhead => {
      return {
        subhead_title: subhead.subhead_title,
        questions: subhead.questions.filter(({ id }) =>
          visibleQuestionsId.includes(id),
        ),
      };
    });

    setVisibleQuestions(visibleQuestionsAtPage);
  }, [day, visibleQuestionsId]);

  //return all or cut and return array of needed id
  useEffect(() => {
    const arrayOfSubheads = day.subhead;

    //if it's the last page
    if (countOfPages / numberOfPage === 1) {
      setVisibleQuestions(arrayOfSubheads);
      return;
    } else if (countOfPages / numberOfPage > 1) {
      const countOfNeededQuestions = countOfQuestionsAtPage * numberOfPage;

      const visibleQ = allQuestions?.slice(0, countOfNeededQuestions);

      const visibleQId = visibleQ.map(({ id }) => id);
      setVisibleQuestionsId(visibleQId);
    }
  }, [countOfPages, day, numberOfPage, allQuestions]);

  //return array of all questions (sorted)
  useEffect(() => {
    const allOfTheQuestions = day?.subhead?.reduce((prev, { questions }) => {
      return [
        ...prev,
        ...questions.sort((a, b) => a.question_range - b.question_range),
      ];
    }, []);

    setAllQuestions(allOfTheQuestions);
  }, [day?.subhead]);

  //calculate count of pages for lazy load
  useEffect(() => {
    if (url.searchParams.get('id')) {
      return;
    }

    if (allQuestions?.length <= countOfQuestionsAtPage) {
      setCountOfPages(1);
    } else {
      setCountOfPages(Math.ceil(allQuestions?.length / countOfQuestionsAtPage));
    }
  }, [allQuestions, url.searchParams]);

  let objForAccordion = {};

  day.subhead.map(element =>
    element.questions.map(el => (objForAccordion[String(el.id)] = false)),
  );

  useEffect(() => {
    setQuestionId(objForAccordion);
  }, []);

  const handleChangeAccordion = id => {
    setQuestionId(prev => Object.assign({}, prev, { [id]: !prev[id] }));
  };

  useEffect(() => {
    if (location.search) {
      setId(location.search.split('=')[1]);
    }
  }, [location.search]);

  useEffect(() => {
    function activateCurrentAccordion(obj, id) {
      if (Object.keys(obj).length > 0) {
        for (let key in obj) {
          obj[key] = false;
        }

        obj[id] = true;

        setQuestionId(obj);
      }
    }
    if (!id) {
      activateCurrentAccordion(questionId, id);
    }
  }, [id]);

  return (
    <Section styles="main-section">
      <ChapterList />

      <div>
        <ul className="subhead-list" id="subhead-list">
          {visibleQuestions
            ? visibleQuestions?.map(({ subhead_title, questions }, index) => {
                return (
                  <Accordion
                    key={index}
                    subhead_title={subhead_title}
                    questions={questions}
                    questionId={questionId}
                    changeId={handleChangeAccordion}
                    location={location}
                    chapter={chapter}
                    id={id}
                  />
                );
              })
            : null}
        </ul>

        {isSpinnerShown ? (
          <div className="loaderContainer" id="spinner">
            <div className="loaderWrapper">
              <SyncLoader
                color={color}
                cssOverride={{
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <Icon iconId="main-page" className="main-page-image-mobile" />
      <Icon iconId="main-page-desktop" className="main-page-image-desktop" />
    </Section>
  );
};

export default withLayout(Day);

export const query = graphql`
  query ($language: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { language: { eq: $language }, chapter: { ne: "start" } }
      }
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
