import React from 'react';
import Container from './Container';
import SwitchLang from './SwitchLang/SwitchLang';
import ToggleTheme from './ToggleTheme';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const Header = ({ openModal }) => {
  const { t } = useTranslation();

  return (
    // adds temporary background styles
    <header className="text-center bg-blue-400 dark:bg-indigo-900 transition linear duration-250">
      <Container>
        <div className="flex justify-between">
          <p>logo</p>
          <div className="flex gap-5">
            <h1>{t('Title')}</h1>

            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-96 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Введіть, що вас цікавить..."
              type="text"
              name="search"
              onFocus={e => {
                console.log(e.target, 'focus');
                openModal();
              }}
              onClick={e => {
                console.log(e.target);
                openModal();
              }}
            />

            <SwitchLang />
            <ToggleTheme />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
