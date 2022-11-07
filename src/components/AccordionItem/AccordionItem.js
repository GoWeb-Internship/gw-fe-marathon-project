import React, { useState, useEffect, memo } from 'react';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import myPlusIcon from '../../assets/images/plus-icon.svg';
import {
  accordionItem,
  accordionHeading,
  accordionHeadingShown,
  accordionContent,
  accordionContentShow,
  plusIcon,
  minusIcon,
} from './AccordionItem.module.css';
import { useLocation } from 'react-use';
import queryString from 'query-string';
import { navigate } from 'gatsby';
import { urlUpdate } from '../../hooks/urlUpdate';

// import { useQueryParam, StringParam } from 'use-query-params';

const AccordionItem = memo(({ data }) => {
  const [active, setActive] = useState(null);
  const location = useLocation();

  // const [id, setId] = useQueryParam('id', StringParam);

  // useEffect(() => {
  //   setActive(id);
  // }, [id]);

  const handleClick = id => {
    if (active === id) {
      setActive(null);
      urlUpdate(location.pathname);
      // setId(null);

      return;
    }

    navigate(`#${id}`);
    // setId(id);
    setActive(id);
  };

  return (
    <li className={accordionItem} id={data.id}>
      <div
        onClick={() => {
          handleClick(data.id);
        }}
        className={
          active === data.id
            ? `${accordionHeadingShown} dark:!bg-hover-dark`
            : accordionHeading
        }
      >
        <h3>
          <Markdown>{data.title}</Markdown>
        </h3>
        {active === data.id ? (
          <MinusCircleIcon className={minusIcon} />
        ) : (
          <img src={myPlusIcon} alt="plusIcon" className={plusIcon} />
        )}
      </div>

      <div
        className={active === data.id ? accordionContentShow : accordionContent}
      >
        <Markdown>{data.content}</Markdown>
      </div>
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
