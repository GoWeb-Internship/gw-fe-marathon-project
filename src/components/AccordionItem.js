import Markdown from 'markdown-to-jsx';
import React from 'react';
import { memo } from 'react';

const AccordionItem = memo(({ data, titleId, changeId }) => {
  function hamdleClick(id) {
    changeId(id);
  }
  return (
    <li className="accordion">
      <div
        onClick={() => hamdleClick(data.id)}
        className="accordionHeading cursor-pointer p-3 text-xl font-bold mb-4 duration-300 bg-blue-800 hover:bg-blue-500 text-white"
      >
        <h3 className="title">
          <Markdown>{data.title}</Markdown>
        </h3>
      </div>
      <div
        className={`${
          titleId[data.id] ? 'accordionContent--show' : 'accordionContent '
        }  bg-black md:block  box-content  text-white px-3 overflow-hidden duration-300 ease-in-out`}
      >
        <Markdown>{data.content}</Markdown>
      </div>
    </li>
  );
});

export default AccordionItem;
