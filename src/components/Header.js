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
import Icon from './Icon';
import PropTypes from 'prop-types';

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
    <header className="linear duration-250 pt-8 text-center transition md:max-xl:pt-9 xl:pt-11">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex md:hidden">
            <div
              className="shadow-md relative  mr-3 flex items-center rounded-xl md:w-[228px] xl:w-96"
              onClick={openModal}
            >
              <input
                className="z-1 relative h-12 w-12 cursor-default bg-transparent"
                type="text"
                name="search"
                onChange={e => {
                  e.target.value = '';
                  openModal();
                }}
              />
              <MagnifyingGlassIcon className="absolute bottom-3.5 left-3.5 z-0 h-5 w-5  text-font-light" />
            </div>

            <button
              aria-label="menu-toggle"
              className="relative z-20 flex h-12 w-12 items-center justify-center "
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-font-light" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-font-light" />
              )}
            </button>
          </div>

          <ul className="flex items-center max-md:hidden">
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

      <Icon
        className="absolute -top-1 -left-1 h-[53px] w-[42px]"
        iconId="hero-top"
      />
    </header>
  );
};

export default Header;

Header.propTypes = {
  openModal: PropTypes.func.isRequired,
};
