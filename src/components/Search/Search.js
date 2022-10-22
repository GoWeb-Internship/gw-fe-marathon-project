import React from 'react';
import Markdown from 'markdown-to-jsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearch } from '../../utils/searchContext';

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [arrayOfQuestions, setArrayOfQuestions] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(null);
  const { days } = useSearch();

  console.log(days);

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

  const handleRedirect = (chapter, id) => {};

  return (
    <div>
      <form>
        <input
          className="border border-black"
          type="text"
          onChange={handleInputChange}
          value={searchPhrase}
        />
      </form>

      {filteredQuestions ? (
        <ul>
          {filteredQuestions?.map(({ question_title, chapter, id }) => {
            return (
              <li
                key={id}
                onClick={() => handleRedirect(chapter, id)}
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <Markdown>{question_title}</Markdown>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
