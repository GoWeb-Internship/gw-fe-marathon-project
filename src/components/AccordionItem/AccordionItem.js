import React, { useState, useEffect, memo } from 'react';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import {
  accordionItem,
  accordionHeading,
  accordionHeadingShown,
  accordionContent,
  accordionContentShow,
  plusIcon,
  minusIcon,
  questionTitle,
} from './AccordionItem.module.css';
import { navigate } from 'gatsby';
import { useLocation } from 'react-use';
import { urlUpdate } from '../../helpers/urlUpdate';
import PlusIconComponent from '../PlusIconComponent';

const AccordionItem = memo(({ data }) => {
  const [active, setActive] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) setActive(location.hash.slice(1));
  }, [location.hash]);

  const handleClick = id => {
    if (active === id) {
      setActive(null);
      location.hash = '';
      urlUpdate(location.pathname);
      return;
    }

    navigate(`?#${id}`);
    setActive(id);
  };

  return (
    <li className={accordionItem}>
      <button
        type="button"
        aria-expanded={active === data.id ? true : false}
        onClick={() => {
          handleClick(data.id);
        }}
        className={
          active === data.id
            ? `${accordionHeadingShown} dark:!bg-hover-dark`
            : accordionHeading
        }
      >
        <span id={data.id} className={questionTitle}>
          <Markdown>{data.title}</Markdown>
        </span>
        {active === data.id ? (
          <MinusCircleIcon className={minusIcon} />
        ) : (
          <PlusIconComponent className={plusIcon} />
        )}
      </button>

      {/* <div
        className={active === data.id ? accordionContentShow : accordionContent}
      >
        <Markdown>{data.content}</Markdown>
      </div> */}

      {active === data.id ? (
        <div className={`${accordionContentShow} dark:text-font-light`}>
          <Markdown>{data.content}</Markdown>{' '}
        </div>
      ) : (
        <div className={accordionContent}></div>
      )}
    </li>
  );
});

export default AccordionItem;

AccordionItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    question_range: PropTypes.string,
    title: PropTypes.string.isRequired,
  }),
};
