import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql, useStaticQuery } from 'gatsby';

import { list } from './Chapter.module.css';
import ChapterItem from './ChapterItem';

const ChapterList = () => {
  const { i18n } = useTranslation();

  const data = useStaticQuery(graphql`
    query ChapterList {
      allMarkdownRemark(
        sort: { order: ASC, fields: frontmatter___chapter_range }
      ) {
        nodes {
          frontmatter {
            chapter
            chapter_range
            title
            language
          }
        }
      }
    }
  `);

  const days = data.allMarkdownRemark.nodes;
  const filteredDays = days?.filter(
    ({ frontmatter: { language } }) => language === i18n.language,
  );

  return (
    <ul className={list}>
      {days
        ? filteredDays?.map(({ frontmatter }) => {
            return (
              <ChapterItem key={frontmatter.title} frontmatter={frontmatter} />
            );
          })
        : null}
    </ul>
  );
};

export default ChapterList;

ChapterList.propTypes = {};
