import Markdown from 'markdown-to-jsx';
import React from 'react';
import { memo } from 'react';
import {
  accordionItem,
  accordionHeading,
  accordionHeadingShown,
  accordionContent,
  accordionContentShow,
  plusIcon,
  minusIcon,
  copyIcon,
  copyIconHover,
} from './AccordionItem.module.css';
import {
  MinusCircleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import qs from 'qs';
import copy from 'copy-to-clipboard';
import Swal from 'sweetalert2';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import myPlusIcon from '../../assets/images/plus-icon.svg';

const AccordionItem = memo(({ data, titleId, changeId, location, chapter }) => {
  const { t } = useTranslation();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  function handleClick(e, id) {
    if (e.target.dataset.svg === 'copy') {
      return;
    }
    changeId(id);
  }

  const handleCopyLink = (chapter, id) => {
    const params = `?${qs.stringify(qs.parse({ page: chapter, title: id }))}`;
    const copyLink = `${location.origin}${location.pathname}${params} `;
    copy(copyLink);

    Toast.fire({
      icon: 'success',
      title: t('copyLink'),
    });
  };

  return (
    <li className={accordionItem} id={data.id}>
      <div
        onClick={e => {
          handleClick(e, data.id);
        }}
        className={
          titleId[data.id]
            ? `${accordionHeadingShown} dark:!bg-hover-dark`
            : accordionHeading
        }
      >
        <h3>
          <Markdown>{data.title}</Markdown>
        </h3>
        <DocumentDuplicateIcon
          data-svg="copy"
          className={titleId[data.id] ? copyIconHover : copyIcon}
          onClick={() => {
            handleCopyLink(chapter, data.id);
          }}
        />
        {titleId[data.id] ? (
          <MinusCircleIcon className={minusIcon} />
        ) : (
          <img src={myPlusIcon} alt="plusIcon" className={plusIcon} />
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

AccordionItem.propTypes = {
  // data: PropTypes.shape({

  // }),
  // titleId: PropTypes.string.isRequired,
  // changeId,
  // location,
  chapter: PropTypes.string.isRequired,
};
