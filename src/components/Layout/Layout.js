import * as React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const Layout = ({ pageTitle, children }) => {
  const { languages, changeLanguage } = useI18next();
  const { t } = useTranslation();
  return (
    <div>
      <header>
        <h1>{t('Title')}</h1>
        <ul>
          {languages.map(lng => (
            <li key={lng}>
              <a
                href="/"
                onClick={e => {
                  e.preventDefault();
                  changeLanguage(lng);
                }}
              >
                {lng}
              </a>
            </li>
          ))}
        </ul>
      </header>
      <main>
        <h1>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
