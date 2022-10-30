export default function getArrayOfQuestions(subhead, chapter) {
  return subhead?.reduce((prevVal, { questions }) => {
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
  }, []);
}
