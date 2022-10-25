import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Markdown from 'markdown-to-jsx';
import qs from 'qs';
import { useSearch } from '../../utils/searchContext';

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
        <input
          className="border-b-2 placeholder:text-slate-400 focus:outline-none w-80 focus:border-sky-500  pt-2 pb-2 pl-3"
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
                  className="text-left truncate cursor-pointer hover:text-blue-900"
                >
                  <Markdown>{question_title}</Markdown>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {filteredQuestions?.length === 0 && (
        <div className="flex flex-col items-center mt-4">
          <h3 className="text-slate-900 font-bold text-xl leading-6 w-80 ">
            {noAnswer.title}{' '}
            <span className="text-blue-500">{searchPhrase}</span>
          </h3>
          <p className="mt-5 text-base">{noAnswer.description}</p>
          <button className="bg-blue-700 rounded border-2 duration-300 mt-4 border-blue-700 text-white py-4 px-8 hover:text-blue-700 hover:bg-white">
            <Link to="/feedback">{noAnswer.button}</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;
