import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Container from '../Container';
import SwitchLang from '../SwitchLang';
import ToggleTheme from '../ToggleTheme';
import Logo from '../Logo/Logo';
import Menu from '../Menu';
import Icon from '../Icon';
import PropTypes from 'prop-types';
import {
  header,
  headerContainer,
  switchWrapper,
  glassIcon,
  menuBtn,
  menuIcon,
  decorIcon,
  switchWrapperFirstItem,
  glassBtn,
  mobileBtnsWrapper,
} from './Header.module.css';

const Header = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  useEffect(() => {
    isMenuOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'scroll');
  }, [isMenuOpen]);

  return (
    <header className={header}>
      <Container>
        <div className={headerContainer}>
          <Logo />
          <div className={mobileBtnsWrapper}>
            <button
              className={glassBtn}
              onClick={openModal}
              aria-label="search button"
            >
              <MagnifyingGlassIcon className={glassIcon} />
            </button>

            <button
              aria-label="menu button"
              className={menuBtn}
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <XMarkIcon className={menuIcon} />
              ) : (
                <Bars3Icon className={menuIcon} />
              )}
            </button>
          </div>

          <ul className={switchWrapper}>
            <li className={switchWrapperFirstItem}>
              <SwitchLang />
            </li>
            <li>
              <ToggleTheme />
            </li>
          </ul>
        </div>
      </Container>
      <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      <Icon className={decorIcon} iconId="hero-top" />
    </header>
  );
};

export default Header;

Header.propTypes = {
  openModal: PropTypes.func.isRequired,
};
