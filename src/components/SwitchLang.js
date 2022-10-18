import React from 'react';
// import { useI18next } from 'gatsby-plugin-react-i18next';
// import { useTranslation } from 'gatsby-plugin-react-i18next';

const SwitchLang = () => {
  // const { languages, changeLanguage } = useI18next();
  // const { t } = useTranslation();

  return (
    <div>
      {/* <h1>{t('Title')}</h1> */}
      <ul>
        {/* {languages.map(lng => (
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
        ))} */}
      </ul>
    </div>
  );
};

export default SwitchLang;
