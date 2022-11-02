import React, { useEffect, useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Markdown from 'markdown-to-jsx';
import qs from 'qs';
import { DebounceInput } from 'react-debounce-input';
import { useSearch } from '../../hooks/searchContext';
import PropTypes from 'prop-types';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import NotFound from './NotFound';
import { Link } from 'gatsby';
import {
  modalWrap,
  searchWrap,
  searchInput,
  foundOption,
  iconGlass,
  xMarkIcon,
  infoWrap,
} from './Search.module.css';

// node.frontmatter.language === i18n.language &&
// const { i18n } = useTranslation();

const Search = ({ onNavigate, closeModal }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [arrayOfQuestions, setArrayOfQuestions] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(null);

  const { days } = useSearch();
  const { t } = useTranslation();

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

  const normalizedPath = path => (path === 'start' ? '' : path);

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
            console.log(normalizedPath(chapter));
            return (
              <li key={id} className={foundOption} title={question_title}>
                <Link
                  to={`/${normalizedPath(chapter)}?${id}`}
                  // onClick={e => {
                  // console.log(e.target);
                  // handleRedirect(chapter, id);
                  // }}
                >
                  <MagnifyingGlassIcon className={iconGlass} />
                  <Markdown>{question_title}</Markdown>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}

      {filteredQuestions?.length === 0 && (
        <NotFound searchPhrase={searchPhrase} />
      )}
    </div>
  );
};

export default Search;

Search.propTypes = {
  // onNavigate: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
