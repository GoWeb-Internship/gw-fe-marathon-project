import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Container from '../Container';
import SwitchLang from '../SwitchLang';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import PropTypes from 'prop-types';
import {
  header,
  headerContainer,
  switchWrapper,
  glassIcon,
  menuBtn,
  menuIcon,
  switchWrapperFirstItem,
  glassBtn,
  mobileBtnsWrapper,
} from './Header.module.css';
import { useLocation } from 'react-use';
import { routes } from '../../utils/routes';
import { useMediaQuery } from 'react-responsive';

const Header = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  useEffect(() => {
    isMenuOpen
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [isMenuOpen]);

  return (
    <header className={header}>
      <Container>
        <div className={headerContainer}>
          <Logo />
          <div className={mobileBtnsWrapper}>
            {!pathname?.includes(routes.FEEDBACK) && (
              <button
                className={glassBtn}
                onClick={openModal}
                aria-label="search button"
              >
                <MagnifyingGlassIcon className={glassIcon} />
              </button>
            )}

            {isMobile && (
              <button
                aria-expanded={isMenuOpen ? true : false}
                className={menuBtn}
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <XMarkIcon className={menuIcon} />
                ) : (
                  <Bars3Icon className={menuIcon} />
                )}
              </button>
            )}
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

      {isMobile && <Menu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />}
    </header>
  );
};

export default Header;

Header.propTypes = {
  openModal: PropTypes.func,
};
