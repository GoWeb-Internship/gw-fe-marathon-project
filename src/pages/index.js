import React from 'react';
import { useState, useEffect } from 'react';
import { withLayout } from '../components/Layout/Layout';
import { graphql, navigate } from 'gatsby';
import Section from '../components/Section';
import Accordion from '../components/Accordion/Accordion';
import qs from 'qs';
import ChapterList from '../components/Chapter';
import Icon from '../components/Icon';

const IndexPage = ({ data, location }) => {
  const day = data?.allMarkdownRemark?.nodes[0].frontmatter;
  const chapterOfMainPage = day.chapter;
  const [id, setId] = useState(null);
  const [questionId, setQuestionId] = useState({});

  // const [searchParams, setSearchParams] = useState('');
  // const [openedDayId, setOpenedDayId] = useState(
  //   chapter || days[0].frontmatter.chapter,
  // );

  const [openedDayId, setOpenedDayId] = useState(chapterOfMainPage);
  // const [dataByChapter, setDataByChapter] = useState(null);

  // useEffect(() => {
  //   const openedDayData = days?.find(
  //     day => openedDayId === day.frontmatter.chapter,
  //   ).frontmatter;

  //   setDataByChapter(openedDayData);
  // }, [days, openedDayId]);

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

  // useEffect(() => {
  //   if (chapter) setOpenedDayId(chapter);
  // }, [chapter]);

  useEffect(() => {
    if (location.search) {
      setId(location.search.split('=')[1]);
    }
  }, [location.search]);
  console.log(id);
  useEffect(() => {
    if (id) {
      activateCurrentAccordion(questionId, id);
    }
  }, [id, questionId]);

  function activateCurrentAccordion(obj, id) {
    if (Object.keys(obj).length > 0) {
      for (let key in obj) {
        obj[key] = false;
      }

      obj[id] = true;

      setQuestionId(obj);
    }
  }

  // const handleNavigate = redirect => {
  //   setSearchParams(redirect);
  // };

  // useEffect(() => {
  //   if (searchParams) {
  //     navigate(`?${searchParams}`);
  //   }
  // }, [searchParams]);

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }, []);

  return (
    <Section styles="main-section">
      <ChapterList />

      <div>
        <ul className="subhead-list" id="subhead-list">
          {day
            ? day?.subhead?.map(({ subhead_title, questions }, index) => {
                return (
                  <Accordion
                    key={index}
                    subhead_title={subhead_title}
                    questions={questions}
                    questionId={questionId}
                    changeId={handleChangeAccordion}
                    location={location}
                    chapter={chapterOfMainPage}
                  />
                );
              })
            : null}
        </ul>
      </div>

      <Icon iconId="main-page" className="main-page-image-mobile" />
      <Icon iconId="main-page-desktop" className="main-page-image-desktop" />
    </Section>
  );
};

export default withLayout(IndexPage);

// export default IndexPage;

export const query = graphql`
  query ($language: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { language: { eq: $language }, chapter: { eq: "start" } }
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
