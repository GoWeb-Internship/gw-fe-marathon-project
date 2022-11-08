import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Container from '../Container';
import SwitchLang from '../SwitchLang';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
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
import { useLocation } from 'react-use';
import { useMediaQuery } from 'react-responsive';
import { routes } from '../../utils/routes';

const Header = ({ openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerIconId, setHeaderIconId] = useState('');
  const { pathname } = useLocation();

  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  useEffect(() => {
    if (isDesktop) {
      setHeaderIconId('header-icon-desktop');
    } else if (isTablet) {
      setHeaderIconId('header-icon-tablet');
    } else {
      setHeaderIconId('hero-top');
    }
  }, [isDesktop, isTablet]);

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
    </header>
  );
};

export default Header;

Header.propTypes = {
  openModal: PropTypes.func,
};
