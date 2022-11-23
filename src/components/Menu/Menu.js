import * as React from 'react';
import { useEffect } from 'react';
import Backdrop from '../Backdrop';
import Container from '../Container';
import SwitchLang from '../SwitchLang';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import PropTypes from 'prop-types';
import {
  menuWrapper,
  menuShown,
  menuHidden,
  menuLangItem,
  menuThemeItem,
  menuBackdrop,
  menuBackdropShown,
  menuBackdropHidden,
} from './Menu.module.css';
import { useState } from 'react';
import { useMemo } from 'react';

export default function Menu({ toggleMenu, isMenuOpen }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code !== 'Escape') return;

      if (e.code === 'Escape' && isMenuOpen) {
        window.removeEventListener('keydown', handleEscape);
        toggleMenu();
      }

      if (e.code === 'Escape' && !isMenuOpen) {
        return;
      }
    };

    if (!isMenuOpen) {
      window.removeEventListener('keydown', handleEscape);
      return;
    } else {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen, toggleMenu]);

  return (
    <>
      <div
        id="menu"
        className={`${menuWrapper} dark:bg-menu-dark
          ${isMenuOpen ? menuShown : menuHidden}`}
      >
        <Container>
          <ul>
            <li className={`${menuLangItem} dark:bg-accent-dark`}>
              <SwitchLang />
            </li>
            <li className={`${menuThemeItem} dark:bg-accent-dark`}>
              <ToggleTheme />
            </li>
          </ul>
        </Container>
      </div>

      <Backdrop
        className={`${menuBackdrop} dark:bg-overlay-dark ${
          isMenuOpen ? menuBackdropShown : menuBackdropHidden
        }`}
        handleCloseFunction={toggleMenu}
        flag={isMenuOpen}
      />
    </>
  );
}

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};
