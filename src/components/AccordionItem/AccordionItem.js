import Markdown from 'markdown-to-jsx';
import React from 'react';
import { memo } from 'react';
import {
  accordionItem,
  accordionHeading,
  accordionHeadingShown,
  accordionContent,
  accordionContentShow,
  title,
  plusIcon,
  minusIcon,
} from './AccordionItem.module.css';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { MinusCircleIcon } from '@heroicons/react/24/outline';

const AccordionItem = memo(({ data, titleId, changeId }) => {
  function hamdleClick(id) {
    changeId(id);
  }

  return (
    <li className={accordionItem}>
      <div
        onClick={() => hamdleClick(data.id)}
        className={titleId[data.id] ? accordionHeadingShown : accordionHeading}
      >
        <h3 className={title}>
          <Markdown>{data.title}</Markdown>
        </h3>

        {titleId[data.id] ? (
          <MinusCircleIcon className={minusIcon} />
        ) : (
          <PlusCircleIcon className={plusIcon} />
        )}
      </div>

      <div
        className={titleId[data.id] ? accordionContentShow : accordionContent}
      >
        <Markdown>{data.content}</Markdown>
      </div>
    </li>
  );
});

export default AccordionItem;
