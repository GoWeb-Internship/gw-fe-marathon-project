import React from 'react';
import Container from './Container';
import SwitchLang from './SwitchLang/SwitchLang';
import ToggleTheme from './ToggleTheme';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    // adds temporary background styles
    <header className="text-center bg-blue-400 dark:bg-indigo-900 transition linear duration-250">
      <Container>
        <div className="flex justify-between">
          <p>logo</p>
          <div className="flex gap-5">
            <h1>{t('Title')}</h1>
            <SwitchLang />
            <ToggleTheme />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
