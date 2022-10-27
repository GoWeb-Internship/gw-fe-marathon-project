import React from 'react';

const ChapterItem = ({ setOpenedDayId, frontmatter }) => {
  return (
    <li>
      <button
        onClick={() => {
          setOpenedDayId(frontmatter.chapter);
        }}
      ></button>
    </li>
  );
};

export default ChapterItem;
