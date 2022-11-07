import React, { useEffect, useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Markdown from 'markdown-to-jsx';
import { DebounceInput } from 'react-debounce-input';
import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import NotFound from './NotFound';
import {
  modalWrap,
  searchWrap,
  searchInput,
  foundOption,
  iconGlass,
  xMarkIcon,
  infoWrap,
} from './Search.module.css';
import { normalizedPath } from '../../helpers/normalizedPath';

const Search = ({ closeModal }) => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [arrayOfQuestions, setArrayOfQuestions] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(null);

  const { t } = useTranslation();

  const data = useStaticQuery(graphql`
    query SearchQuery {
      allMarkdownRemark {
        nodes {
          frontmatter {
            chapter
            language
            subhead {
              subhead_title
              questions {
                description
                id
                question_range
                question_title
              }
            }
            title
          }
        }
      }
    }
  `);

  const days = data.allMarkdownRemark.nodes;
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!days) return;

    const arrayOfQuestions = days
      ?.filter(({ frontmatter: { language } }) => language === i18n.language)
      .reduce((prevVal, { frontmatter: { chapter, subhead } }) => {
        return [
          ...prevVal,
          ...subhead.reduce((prevVal, { questions }) => {
            return [
              ...prevVal,
              ...questions.map(({ id, question_title, description }) => {
                return {
                  title: question_title,
                  content: description,
                  chapter: chapter,
                  id: id,
                };
              }),
            ];
          }, []),
        ];
      }, []);

    setArrayOfQuestions(arrayOfQuestions);
  }, [days, i18n.language]);

  useEffect(() => {
    if (!searchPhrase.trim() || !arrayOfQuestions) {
      setFilteredQuestions(null);
      return;
    }

    const filteredQuestions = arrayOfQuestions?.filter(
      ({ title, content }) =>
        title.toLowerCase().includes(searchPhrase) ||
        content.toLowerCase().includes(searchPhrase),
    );

    setFilteredQuestions(filteredQuestions);
  }, [arrayOfQuestions, searchPhrase]);

  const handleInputChange = ({ target: { value } }) => {
    setSearchPhrase(value.toLowerCase());
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
          {filteredQuestions?.map(({ title, chapter, id }) => {
            return (
              <li
                key={id}
                className={foundOption}
                title={title}
                onClick={closeModal}
              >
                <Link to={`/${normalizedPath(chapter)}?#${id}`}>
                  <MagnifyingGlassIcon className={iconGlass} />
                  <Markdown>{title}</Markdown>
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
  closeModal: PropTypes.func.isRequired,
};
