import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types';
import {
  noResultsWrapper,
  noResultsTitle,
  searchWord,
  noResultsDesc,
  btnToFeedbackPage,
  link,
} from './Search.module.css';

const NotFound = ({ searchPhrase }) => {
  const { t } = useTranslation();
  const noAnswer = t('noAnswer', { returnObjects: true });
  return (
    <div className={`${noResultsWrapper}`}>
      <h3 className={`${noResultsTitle} `}>
        {noAnswer.title} <span className={searchWord}>{searchPhrase}</span>
      </h3>
      <p className={noResultsDesc}>{noAnswer.description}</p>
      <button className={btnToFeedbackPage}>
        <Link to="/feedback" className={link}>
          {noAnswer.button}
        </Link>
      </button>
    </div>
  );
};

export default NotFound;

NotFound.propTypes = {
  searchPhrase: PropTypes.string.isRequired,
};
