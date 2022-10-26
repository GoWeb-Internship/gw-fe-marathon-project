import React from 'react';
import Container from './Container';
import SwitchLang from './SwitchLang';
import ToggleTheme from './ToggleTheme';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import { useState } from 'react';
import Menu from './Menu';
import { useEffect } from 'react';

const Header = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  useEffect(() => {
    isMenuOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'scroll');
  }, [isMenuOpen]);

  return (
    <header className="text-center transition linear duration-250 pt-8 pb-8">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex md:hidden">
            <div
              className="relative flex  items-center rounded-xl shadow-md md:w-[228px] xl:w-96 mr-3"
              onClick={openModal}
            >
              <input
                className="w-12 h-12 relative z-1 bg-transparent cursor-default"
                type="text"
                name="search"
                onChange={e => {
                  e.target.value = '';
                  openModal();
                }}
              />
              <MagnifyingGlassIcon className="absolute bottom-3.5 left-3.5 h-5 w-5 z-0  text-font-light" />
            </div>

            <button
              aria-label="menu-toggle"
              className="relative z-20 w-12 h-12 flex justify-center items-center "
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-font-light" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-font-light" />
              )}
            </button>
          </div>

          <ul className="max-md:hidden flex items-center">
            <li className="mr-6">
              <SwitchLang />
            </li>
            <li>
              <ToggleTheme />
            </li>
          </ul>
        </div>

        <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      </Container>
    </header>
  );
};

export default Header;
