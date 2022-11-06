import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useLocation } from 'react-use';
import { item, button, activeButton } from './Chapter.module.css';
import PropTypes from 'prop-types';

const ChapterItem = ({ frontmatter }) => {
  const [activeDay, setActiveDay] = useState('');
  const { pathname } = useLocation();
  const location = useLocation();
  // console.log(location.hash);

  useEffect(() => {
    let arr = pathname.split('');
    let counter = 0;
    for (let elem of arr) {
      if (elem === '/') {
        counter++;
      }
    }

    if (counter === 1) {
      setActiveDay(pathname.split('/')[1]);
    } else {
      setActiveDay(pathname.split('/')[2]);
    }

    // if (counter === 2 && location.hash) {
    //   setActiveDay(pathname.split('/')[1]);
    // } else {
    //   setActiveDay(pathname.split('/')[2]);
    // }
  }, [location.hash, pathname]);

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

ChapterItem.propTypes = {
  frontmatter: PropTypes.object.isRequired,
};
