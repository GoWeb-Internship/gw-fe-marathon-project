import { withLayout } from '../components/Layout/Layout';
import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import { graphql } from 'gatsby';
import ChapterList from '../components/Chapter/ChapterList';
import Accordion from '../components/Accordion/Accordion';
import qs from 'qs';

const Day = ({ data, pageContext, location }) => {
  const chapter = pageContext.i18n.originalPath.slice(1);
  const day = data?.allMarkdownRemark?.nodes?.find(
    day => chapter === day.frontmatter.chapter,
  ).frontmatter;
  // console.log(chapter);
  // console.log(day);

  const id = location.search.split('=')[1];
  const [questionId, setQuestionId] = useState({});

  // const chapterOfPage = chapter.chapter;
  let objForAccordion = {};

  // data.subhead.map(element =>
  //   element.questions.map(el => (objForAccordion[String(el.id)] = false)),
  // );

  const handleChangeAccordion = id => {
    setQuestionId(prev => Object.assign({}, prev, { [id]: !prev[id] }));
  };

  useEffect(() => {
    if (id) activateCurrentAccordion(questionId, id);
  }, [id]);

  function activateCurrentAccordion(obj, id) {
    if (Object.keys(obj).length > 0) {
      for (let key in obj) {
        obj[key] = false;
      }

      obj[id] = true;

      setQuestionId(obj);
    }
  }

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
                  />
                );
              })
            : null}
        </ul>
      </div>
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
