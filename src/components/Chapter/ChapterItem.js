import React from 'react';
import { Link } from 'gatsby';
import { useLocation } from 'react-use';
import { item, button, activeButton } from './Chapter.module.css';

const ChapterItem = ({ frontmatter }) => {
  const { pathname } = useLocation();
  const activeDay = pathname.split('/')[2];
  const normalizedPath = path => (path === 'start' ? '' : path);

  return (
    <li className={`${item} dark:text-white`}>
      <Link
        className={`${
          activeDay === normalizedPath(frontmatter.chapter) && activeButton
        } ${button} `}
        to={`/${normalizedPath(frontmatter.chapter)}`}
      >
        {frontmatter.title}
      </Link>
    </li>
  );
};

export default ChapterItem;
