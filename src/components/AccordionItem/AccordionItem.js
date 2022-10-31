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
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import {
  MinusCircleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import qs from 'qs';
import copy from 'copy-to-clipboard';
import Swal from 'sweetalert2';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const AccordionItem = memo(({ data, titleId, changeId, location, chapter }) => {
  const { t } = useTranslation();

  function handleClick(id) {
    changeId(id);
  }

  const handleCopyLink = (chapter, id) => {
    const params = `?${qs.stringify(qs.parse({ page: chapter, title: id }))}`;
    const copyLink = `${location.origin}${location.pathname}${params} `;
    copy(copyLink);

    Swal.fire({
      icon: 'success',
      title: t('copyLink'),
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <li className={accordionItem}>
      <div
        onClick={() => handleClick(data.id)}
        className={
          titleId[data.id]
            ? `${accordionHeadingShown} dark:!bg-hover-dark`
            : accordionHeading
        }
      >
        <h3 id={data.id}>
          <Markdown>{data.title}</Markdown>
        </h3>
        <DocumentDuplicateIcon
          className={titleId[data.id] ? copyIconHover : copyIcon}
          onClick={() => {
            handleCopyLink(chapter, data.id);
          }}
        />
        {titleId[data.id] ? (
          <MinusCircleIcon className={`${minusIcon} ml-3`} />
        ) : (
          <PlusCircleIcon className={`${plusIcon} ml-3`} />
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
