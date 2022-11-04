import { withLayout } from '../components/Layout/Layout';
import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import { graphql } from 'gatsby';
import ChapterList from '../components/Chapter/ChapterList';
import Accordion from '../components/Accordion/Accordion';
import qs from 'qs';
import Icon from '../components/Icon';

const Day = ({ data, pageContext, location }) => {
  const chapter = pageContext.i18n.originalPath.slice(1);
  const day = data?.allMarkdownRemark?.nodes?.find(
    day => chapter === day.frontmatter.chapter,
  ).frontmatter;

  const [questionId, setQuestionId] = useState({});
  const [id, setId] = useState(null);

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
        console.log(obj);
        obj[id] = true;
        console.log(obj[id]);
        setQuestionId(obj);
        console.log(questionId);
      }
    }
    if (id !== null) {
      activateCurrentAccordion(questionId, id);
    }
  }, [id, questionId]);

  console.log(id);
  console.log(chapter);
  return (
    <Section styles="main-section">
      <ChapterList />
      <div>
        <ul className="subhead-list" id="subhead-list">
          {day
            ? day.subhead.map(({ subhead_title, questions }, index) => {
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
