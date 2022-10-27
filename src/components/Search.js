import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Markdown from 'markdown-to-jsx';
import qs from 'qs';
import { DebounceInput } from 'react-debounce-input';
import { useSearch } from '../utils/searchContext';
import PropTypes from 'prop-types';

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
          ...subhead[0].questions.map(({ id, title, content }) => {
            return {
              question_title: title,
              content: content,
              chapter: chapter,
              id: id,
            };
          }),
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
    <div>
      <form>
        <DebounceInput
          debounceTimeout={300}
          className="w-80 border-b-2 pt-2 pb-2 pl-3  placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
          type="text"
          onChange={handleInputChange}
          value={searchPhrase}
          placeholder={t('input')}
        />
      </form>

      {filteredQuestions ? (
        <div>
          <ul>
            {filteredQuestions?.map(({ question_title, chapter, id }) => {
              return (
                <li
                  key={id}
                  onClick={() => {
                    handleRedirect(chapter, id);
                  }}
                  className="cursor-pointer truncate text-left hover:text-blue-900"
                >
                  <Markdown>{question_title}</Markdown>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {filteredQuestions?.length === 0 && (
        <div className="mt-4 flex flex-col items-center">
          <h3 className="w-80 text-xl font-bold leading-6 text-slate-900 ">
            {noAnswer.title}{' '}
            <span className="text-blue-500">{searchPhrase}</span>
          </h3>
          <p className="mt-5 text-base">{noAnswer.description}</p>
          <button className="mt-4 rounded border-2 border-blue-700 bg-blue-700 py-4 px-8 text-white duration-300 hover:bg-white hover:text-blue-700">
            <Link to="/feedback">{noAnswer.button}</Link>
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
