import React from 'react';
import ChapterItem from './ChapterItem';
import { list } from './Chapter.module.css';
import qs from 'qs';
import { navigate } from 'gatsby';

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

                  const params = `?${qs.stringify(qs.parse({}))}`;
                  navigate(params);
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
