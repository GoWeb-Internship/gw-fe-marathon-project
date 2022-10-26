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
    <ul className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md  bg-white   shadow-lg ring-1 ring-black ring-opacity-5  z-20">
      {languages.map(lng => (
        <li
          key={lng}
          className="h-12 flex items-center justify-center cursor-pointer shadow-main    block transition-all  text-sm leading-4 py-1  hover:bg-blue-200 active:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <Link
            to={originalPath}
            language={lng}
            className={`${
              active === lng
                ? 'underline underline-offset-4 decoration-blue-500  text-blue-500'
                : 'text-neutral-900'
            } block w-full h-full flex items-center justify-center`}
          >
            {normalizedLang(lng)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LangList;
