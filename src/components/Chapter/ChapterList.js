import React from 'react';
import ChapterItem from './ChapterItem';
import { list } from './Chapter.module.css';

const ChapterList = ({ days, setOpenedDayId, openedDayId }) => {
  return (
    <ul className={list}>
      {days
        ? days?.map(({ frontmatter }) => {
            return (
              <ChapterItem
                key={frontmatter.title}
                onClick={() => {
                  setOpenedDayId(frontmatter.chapter);
                }}
                frontmatter={frontmatter}
                active={openedDayId}
              />
            );
          })
        : null}
    </ul>
  );
};

export default ChapterList;
