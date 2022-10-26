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
    <ul className="absolute left-0 mt-6 max-h-60 w-full box-border overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
      {languages.map(lng => (
        <li
          key={lng}
          className="h-12 flex items-center justify-center cursor-pointer shadow-main block transition-all  text-sm leading-4 py-1 active:accent dark:text-font-light bg-light dark:bg-accent-dark hover:border-b-2 hover:border-accent  accent dark:hover:text-hover border-b-2 last:border-transparent"
        >
          <Link
            to={originalPath}
            language={lng}
            className={`${
              active === lng
                ? 'underline underline-offset-4 decoration-accent text-accent hover:text-hover '
                : 'text-font-dark dark:text-font-light dark:hover:text-hover hover:text-hover'
            } block w-full h-full flex items-center hover:text-hover justify-center`}
          >
            {normalizedLang(lng)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LangList;
