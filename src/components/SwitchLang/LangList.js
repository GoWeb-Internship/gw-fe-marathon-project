import React from 'react';
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next';

const LangList = () => {
  const { languages, originalPath } = useI18next();
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('Title')}</h1>
      <ul>
        {languages.map(lng => (
          <li key={lng}>
            <Link to={originalPath} language={lng}>
              {lng}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LangList;
