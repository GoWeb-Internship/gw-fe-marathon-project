import React from 'react';
import PropTypes from 'prop-types';
import { subheadTitle, subhead } from './Accordion.module.css';
import AccordionItem from '../AccordionItem/AccordionItem';

const Accordion = ({
  subhead_title,
  questions,
  questionId,
  changeId,
  location,
  chapter,
  id,
}) => {
  return (
    <li className={subhead}>
      <h2 className={subheadTitle}>{subhead_title}</h2>
      <ul>
        {[
          ...questions
            ?.sort((a, b) => a.question_range - b.question_range)
            ?.map(question => {
              return (
                <AccordionItem
                  key={question.id}
                  data={question}
                  titleId={questionId}
                  changeId={changeId}
                  location={location}
                  chapter={chapter}
                  id={id}
                />
              );
            }),
        ]}
      </ul>
    </li>
  );
};

export default Accordion;

Accordion.propTypes = {
  subhead_title: PropTypes.string,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      question_range: PropTypes.string,
      title: PropTypes.string.isRequired,
    }),
  ),
  questionId: PropTypes.object.isRequired,
  changeId: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  chapter: PropTypes.string.isRequired,
};
