const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `allMarkdownRemark`) {
//     const value = createFilePath({ node, getNode, basePath: `chapters` });
//     createNodeField({
//       name: `chapter`,
//       node,
//       value,
//     });
//   }
// };

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const data = await graphql(`
    query Days {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              chapter
              chapter_range
              language
              title
              subhead {
                subhead_title
                questions {
                  description
                  id
                  question_range
                  question_title
                }
              }
            }
          }
        }
      }
    }
  `);

  console.table(data.allMarkdownRemark.edges);

  if (data.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // data.allMarkdownRemark.nodes.forEach(node => {
  //   const { chapter, language } = node.frontmatter;
  //   createPage({
  //     path: `/${language}/${chapter}`,
  //     component: path.resolve('src/templates/day.js'),
  //     context: {
  //       chapter,
  //     },
  //   });
  // });
};
