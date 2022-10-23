import Markdown from 'markdown-to-jsx';
import React from 'react';
import { useState, useEffect } from 'react';

const Accordion = ({ subhead_title, questions, index, questionId }) => {
  const [active, setActive] = useState(null);

  const handleClick = id => {
    setActive(id);
  };

  useEffect(() => {
    setActive(questionId);
  }, [questionId]);

  return (
    <div key={index}>
      <h2>{subhead_title}</h2>
      <ul key={index}>
        {questions.map((question, index) => {
          return (
            <li className="accordion" key={index}>
              <div
                onClick={() => handleClick(question.id)}
                className="accordionHeading cursor-pointer p-3 text-xl font-bold mb-4 duration-300 bg-blue-800 hover:bg-blue-500 text-white"
              >
                <h3 className="title">
                  <Markdown>{question.title}</Markdown>
                </h3>
              </div>
              <div
                className={`${
                  active === question.id
                    ? 'h-auto opacity-1 p-3'
                    : 'h-0 opacity-0'
                } accordionContent bg-black md:block text-white  overflow-hidden duration-300 ease-in-out`}
              >
                <Markdown>{question.content}</Markdown>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Accordion;
