import * as React from 'react';
import { useEffect } from 'react';
import Backdrop from './Backdrop';
import Container from './Container';
import SwitchLang from './SwitchLang';
import ToggleTheme from './ToggleTheme';
import PropTypes from 'prop-types';

export default function Menu({ toggleMenu, isMenuOpen }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code !== 'Escape') return;
      window.removeEventListener('keydown', handleEscape);
      toggleMenu();
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [toggleMenu]);

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 h-80 w-screen bg-menu pt-28 transition duration-200 ease-in-out dark:bg-menu-dark md:hidden ${
          isMenuOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        }`}
      >
        <Container>
          <ul>
            <li className="mb-4 rounded-lg bg-accent shadow-main dark:bg-accent-dark">
              <SwitchLang />
            </li>
            <li className="rounded-lg bg-accent p-4 shadow-main dark:bg-accent-dark">
              <ToggleTheme />
            </li>
          </ul>
        </Container>
      </div>

      <Backdrop
        className={`fixed left-0 top-0 -z-0 h-screen w-screen bg-overlay transition duration-200 ease-in-out dark:bg-overlay-dark md:hidden  ${
          isMenuOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        }`}
        handleCloseFunction={toggleMenu}
      />
    </>
  );
}

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};
