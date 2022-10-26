import React, { useEffect } from 'react';

import AccordionItem from './AccordionItem';

const Accordion = ({ subhead_title, questions, questionId, changeId }) => {
  return (
    <div>
      <h2>{subhead_title}</h2>
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
    </div>
  );
};

export default Accordion;
