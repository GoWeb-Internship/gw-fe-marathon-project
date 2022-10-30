import React from 'react';
import AccordionItem from '../AccordionItem/AccordionItem';
import { subheadTitle, subhead } from './Accordion.module.css';

const Accordion = ({ subhead_title, questions, questionId, changeId }) => {
  return (
    <li className={subhead}>
      <h2 className={subheadTitle}>{subhead_title}</h2>
      <ul>
        {[
          ...questions
            .sort((a, b) => a.question_range - b.question_range)
            .map(question => {
              return (
                <AccordionItem
                  key={question.id}
                  data={question}
                  titleId={questionId}
                  changeId={changeId}
                />
              );
            }),
        ]}
      </ul>
    </li>
  );
};

export default Accordion;
