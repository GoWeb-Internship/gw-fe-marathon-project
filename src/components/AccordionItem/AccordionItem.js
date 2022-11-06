import React, { useState, useEffect } from 'react';
import { memo } from 'react';
import { Link, navigate } from 'gatsby';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
// import qs from 'qs';
// import copy from 'copy-to-clipboard';
// import Swal from 'sweetalert2';

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

const AccordionItem = memo(({ data, id }) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(id);
  }, [id]);

  const handleClick = id => {
    if (active === id) {
      setActive(null);
      navigate('');
      return;
    }

    setActive(id);
    navigate(`?#${id}`);
  };

  // const Toast = Swal.mixin({
  //   toast: true,
  //   position: 'top-end',
  //   showConfirmButton: false,
  //   timer: 1000,
  //   timerProgressBar: true,
  //   didOpen: toast => {
  //     toast.addEventListener('mouseenter', Swal.stopTimer);
  //     toast.addEventListener('mouseleave', Swal.resumeTimer);
  //   },
  // });

  // const handleCopyLink = (chapter, id) => {
  //   const params = `?${qs.stringify(qs.parse({ page: chapter, title: id }))}`;
  //   const copyLink = `${location.origin}${location.pathname}${params} `;
  //   copy(copyLink);

  //   Toast.fire({
  //     icon: 'success',
  //     title: t('copyLink'),
  //   });
  // };

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
  id: PropTypes.string,
};
