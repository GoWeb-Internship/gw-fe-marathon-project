import React from 'react';
import ChapterItem from './ChapterItem';
import { list } from './Chapter.module.css';
import { StaticQuery, graphql } from 'gatsby';

const ChapterList = ({ days }) => {
  console.log(days);
  return (
    // <StaticQuery
    //   query={graphql`
    //     query ChapterList {
    //       allMarkdownRemark(
    //         filter: {
    //           frontmatter: {
    //             chapter_item: { elemMatch: { chapter_name: { glob: "*" } } }
    //           }
    //         }
    //       ) {
    //         nodes {
    //           frontmatter {
    //             chapter_item {
    //               chapter_name
    //             }
    //           }
    //         }
    //       }
    //     }
    //   `}
    //   render={data => (
    //     <ul className={list}>
    //       {data
    //         ? data?.allMarkdownRemark.nodes.map(({ frontmatter }) => {
    //             return frontmatter.chapter_item.map(({ chapter_name }) => {
    //               return <ChapterItem key={chapter_name} name={chapter_name} />;
    //             });
    //           })
    //         : null}
    //     </ul>
    //   )}
    // />
    <ul className={list}>
      {days
        ? days?.map(({ frontmatter }) => {
            console.log(frontmatter.chapter);
            return (
              <ChapterItem key={frontmatter.title} frontmatter={frontmatter} />
            );
          })
        : null}
    </ul>
  );
};

export default ChapterList;
