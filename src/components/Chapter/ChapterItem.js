import React from 'react';
import { item, button, activeButton } from './Chapter.module.css';

const ChapterItem = ({ onClick, active, frontmatter }) => {
  return (
    <li className={`${item} dark:text-white`}>
      <button
        className={`${
          active === frontmatter.chapter && activeButton
        } ${button} `}
        onClick={onClick}
      >
        {frontmatter.title}
      </button>
    </li>
  );
};

export default ChapterItem;
