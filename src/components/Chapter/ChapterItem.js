import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useLocation } from 'react-use';
import { item, button, activeButton } from './Chapter.module.css';
import PropTypes from 'prop-types';
import { normalizedPath } from '../../helpers/normalizedPath';

const ChapterItem = ({ frontmatter }) => {
  const [activeDay, setActiveDay] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    let arr = pathname.split('');
    let counter = 0;

    arr.forEach(elem => {
      if (elem === '/') {
        counter++;
      }
    });

    if (counter === 1) {
      setActiveDay(pathname.split('/')[1]);
    } else {
      setActiveDay(pathname.split('/')[2]);
    }
  }, [pathname]);

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
