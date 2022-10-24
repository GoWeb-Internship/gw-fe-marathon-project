import Markdown from 'markdown-to-jsx';
import React from 'react';
import { memo } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const AccordionItem = memo(({ data, titleId, changeId }) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  const contentHeight = contentRef.current?.scrollHeight;

  const handleClick = id => {
    changeId(state => {
      state[id] = !state[id];
      setActive(!active);
      return state;
    });
  };

  useEffect(() => {
    if (titleId[data.id]) setActive(!active);
  }, []);

  return (
    <li className="accordion">
      <div
        onClick={() => handleClick(data.id)}
        className="accordionHeading cursor-pointer p-3 text-xl font-bold mb-4 duration-300 bg-blue-800 hover:bg-blue-500 text-white"
      >
        <h3 className="title">
          <Markdown>{data.title}</Markdown>
        </h3>
      </div>
      <div
        style={active ? { height: `${contentHeight}px` } : { height: 0 }}
        ref={contentRef}
        className={`${
          active ? `py-3` : 'h-0 py-0'
        } accordionContent bg-black md:block box-content  px-3  text-white  overflow-hidden duration-500 ease-in-out`}
      >
        <Markdown>{data.content}</Markdown>
      </div>
    </li>
  );
});

export default AccordionItem;
