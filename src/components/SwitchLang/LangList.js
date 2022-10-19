import React from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';

const LangList = () => {
  const { languages, originalPath } = useI18next();

  const normalizedLand = lang => {
    switch (lang) {
      case 'ua':
        return 'Українська';
      case 'ru':
        return 'Російська';
      default:
        return null;
    }
  };

  return (
    <div>
      <ul className="absolute top-7 py-2 px-2 space-y-4 text-center bg-red-400 text-likeGrey rounded shadow z-20">
        {languages.map(lng => (
          <li
            key={lng}
            className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem'
          >
            <Link to={originalPath} language={lng}>
              {normalizedLand(lng)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LangList;
