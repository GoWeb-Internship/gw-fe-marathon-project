import Markdown from 'markdown-to-jsx';
import React from 'react';
import { memo } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const AccordionItem = memo(({ data, titleId, changeId }) => {
  const contentRef = useRef(null);
  const [heightA, setHeight] = useState(0);

  const contentHeight = contentRef.current?.scrollHeight;
  useEffect(() => {
    setHeight(contentHeight);
  }, [contentHeight]);

  return (
    <li className="accordion ">
      <div
        onClick={() => changeId(data.id)}
        className="accordionHeading cursor-pointer p-3 text-xl font-bold mb-4 duration-300 bg-blue-800 hover:bg-blue-500 text-white"
      >
        <h3 className="title">
          <Markdown>{data.title}</Markdown>
        </h3>
      </div>
      <div
        style={
          titleId[data.id]
            ? {
                height: `${heightA}px`,
                // maxHeight: `${heightA}px`,
                // paddingTop: '16px',
                // paddingBottom: '16px',
              }
            : {
                height: '0',
                // paddingTop: '0',
                // paddingBottom: '0',
              }
        }
        ref={contentRef}
        className="accordionContent bg-black md:block  box-content  text-white  overflow-hidden duration-500 ease-in-out"
      >
        <Markdown>{data.content}</Markdown>
      </div>
    </li>
  );
});

export default AccordionItem;
