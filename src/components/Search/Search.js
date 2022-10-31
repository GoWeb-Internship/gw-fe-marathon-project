import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Markdown from 'markdown-to-jsx';
import qs from 'qs';
import { DebounceInput } from 'react-debounce-input';
import { useSearch } from '../../utils/searchContext';
import PropTypes from 'prop-types';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import {
  modalWrap,
  searchWrap,
  searchInput,
  foundOption,
  noResultsWrapper,
  noResultsTitle,
  searchWord,
  noResultsDesc,
  btnToFeedbackPage,
  iconGlass,
  xMarkIcon,
  infoWrap,
  link,
} from './Search.module.css';

const Search = ({ onNavigate, closeModal }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [arrayOfQuestions, setArrayOfQuestions] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(null);

  const { days } = useSearch();
  const { t } = useTranslation();
  const noAnswer = t('noAnswer', { returnObjects: true });

  useEffect(() => {
    if (!days) return;

    const arrayOfQuestions = days?.reduce(
      (prevVal, { frontmatter: { chapter, subhead } }) => {
        return [
          ...prevVal,
          ...subhead.reduce((prevVal, { questions }) => {
            return [
              ...prevVal,
              ...questions.map(({ id, title, content }) => {
                return {
                  question_title: title,
                  content: content,
                  chapter: chapter,
                  id: id,
                };
              }),
            ];
          }, []),
        ];
      },
      [],
    );

    setArrayOfQuestions(arrayOfQuestions);
  }, [days]);

  useEffect(() => {
    if (!searchPhrase.trim() || !arrayOfQuestions) {
      setFilteredQuestions(null);
      return;
    }

    const filteredQuestions = arrayOfQuestions?.filter(
      ({ question_title, content }) =>
        question_title.toLowerCase().includes(searchPhrase) ||
        content.toLowerCase().includes(searchPhrase),
    );

    setFilteredQuestions(filteredQuestions);
  }, [arrayOfQuestions, searchPhrase]);

  const handleInputChange = ({ target: { value } }) => {
    setSearchPhrase(value.toLowerCase());
  };

  const handleRedirect = (chapter, id) => {
    const redirect = qs.parse({ page: chapter, title: id });
    onNavigate(qs.stringify(redirect));
    closeModal();
  };

  return (
    <div className={modalWrap}>
      <div className={searchWrap}>
        <DebounceInput
          debounceTimeout={300}
          className={`${searchInput}  dark:border-font-light dark:text-font-light dark:placeholder:text-font-light `}
          type="text"
          onChange={handleInputChange}
          value={searchPhrase}
          placeholder={t('input')}
        />
        <XMarkIcon
          className={`${xMarkIcon} dark:text-font-light`}
          onClick={closeModal}
        />
      </div>

      {filteredQuestions ? (
        <ul className={infoWrap}>
          {filteredQuestions?.map(({ question_title, chapter, id }) => {
            return (
              <li
                key={id}
                onClick={() => {
                  handleRedirect(chapter, id);
                }}
                className={foundOption}
                title={question_title}
              >
                <MagnifyingGlassIcon className={iconGlass} />
                <Markdown>{question_title}</Markdown>
              </li>
            );
          })}
        </ul>
      ) : null}

      {filteredQuestions?.length === 0 && (
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
      )}
    </div>
  );
};

export default Search;

Search.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
