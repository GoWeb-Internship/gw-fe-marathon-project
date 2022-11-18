import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import image from '../assets/images/cover.png';
import appleTouchIcon from '../../static/favicon/apple-touch-icon.png';
import faviconBig from '../../static/favicon/favicon-32x32.png';
import faviconSmall from '../../static/favicon/favicon-16x16.png';

function Seo({ description, title, lang = 'uk', meta = [] }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: site.siteMetadata.siteUrl + image,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <title>{title}</title>
      <link rel="canonical" href="/"></link>
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={faviconBig} />
      <link rel="icon" type="image/png" sizes="16x16" href={faviconSmall} />
      {/* <link rel="manifest" href="favicon/manifest.json" /> */}
      <base target="_blank" rel="noreferrer noopener"></base>
    </Helmet>
  );
}

Seo.defaultProps = {
  description: ``,
};

Seo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default Seo;
