import * as React from 'react';
import { useEffect } from 'react';
import Container from './Container';
import SwitchLang from './SwitchLang';
import ToggleTheme from './ToggleTheme';

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
        className={`fixed left-0 top-0 z-10 pt-28 h-80 w-screen bg-menu dark:bg-menu-dark md:hidden transition ease-in-out duration-200 ${
          isMenuOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        }`}
      >
        <Container>
          <ul>
            <li className="rounded-lg mb-4 shadow-main bg-accent dark:bg-accent-dark">
              <SwitchLang />
            </li>
            <li className="p-4 rounded-lg shadow-main bg-accent dark:bg-accent-dark">
              <ToggleTheme />
            </li>
          </ul>
        </Container>
      </div>

      <div
        className={`fixed left-0 top-0 -z-0 w-screen h-screen md:hidden bg-overlay dark:bg-overlay-dark transition ease-in-out duration-200  ${
          isMenuOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        }`}
        onClick={toggleMenu}
      ></div>
    </>
  );
}
