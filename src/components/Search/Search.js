import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearch } from '../../utils/searchContext';

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [arrayOfQuestions, setArrayOfQuestions] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState(null);
  const { days } = useSearch();

  useEffect(() => {
    if (!days) return;

    const arrayOfQuestions = days?.reduce(
      (prevVal, { frontmatter: { chapter, title, subhead } }) => {
        return [
          ...prevVal,
          ...subhead[0].questions.map(({ title: question_title, content }) => {
            return {
              question_title: question_title,
              content: content,
              chapter: chapter,
              title: title,
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
      ({ question_title, content, title }) =>
        title.toLowerCase().includes(searchPhrase) ||
        question_title.toLowerCase().includes(searchPhrase) ||
        content.toLowerCase().includes(searchPhrase),
    );

    setFilteredQuestions(filteredQuestions);
  }, [arrayOfQuestions, searchPhrase]);

  const handleInputChange = ({ target: { value } }) => {
    setSearchPhrase(value.toLowerCase());
  };

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
          {filteredQuestions?.map(
            ({ question_title, chapter, title }, index) => {
              return (
                <li key={index}>
                  {/* <a href=""> */}
                  <h3>
                    {question_title} <b>{title}</b>
                  </h3>
                  {/* </a> */}
                </li>
              );
            },
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
