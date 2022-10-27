import React from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';

const LangList = ({ active }) => {
  const { languages, originalPath } = useI18next();

  const normalizedLang = lang => {
    switch (lang) {
      case 'uk':
        return 'UA';
      case 'ru':
        return 'RU';
      case 'en':
        return 'EN';
      default:
        return null;
    }
  };

  return (
    <ul className="shadow-lg absolute left-0 z-20 mt-6 box-border max-h-60 w-full overflow-auto rounded-md bg-white ring-1 ring-black ring-opacity-5">
      {languages.map(lng => (
        <li
          key={lng}
          className="bg-light block flex h-11 cursor-pointer items-center justify-center border-b-2 py-1  text-sm leading-4 shadow-main transition-all last:border-transparent hover:bg-hover-light dark:bg-body-dark dark:bg-accent-dark dark:text-font-light dark:hover:bg-hover-dark"
        >
          <Link
            to={originalPath}
            language={lng}
            className={`${
              active === lng
                ? 'text-accent underline decoration-accent underline-offset-4'
                : 'text-font-dark dark:text-font-light '
            } block flex h-full w-full items-center justify-center `}
          >
            {normalizedLang(lng)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LangList;
