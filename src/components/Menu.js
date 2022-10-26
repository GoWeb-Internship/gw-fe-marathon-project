import * as React from 'react';
import Container from './Container';
import Logo from './Logo';
import SwitchLang from './SwitchLang';
import ToggleTheme from './ToggleTheme';

export default function Menu({ toggleMenu }) {
  return (
    <>
      <div className="fixed left-0 top-0 z-10 pt-11 h-80 w-screen bg-menu dark:bg-menu-dark md:hidden">
        <Container>
          <Logo />

          <ul className="pt-11">
            <li className="p-4 rounded-lg mb-4 shadow-main">
              <SwitchLang />
            </li>
            <li className="p-4 rounded-lg shadow-main">
              <ToggleTheme />
            </li>
          </ul>
        </Container>
      </div>

      <div
        className="fixed left-0 top-0 -z-0 w-screen h-screen md:hidden bg-overlay bg-overlay-dark"
        onClick={toggleMenu}
      ></div>
    </>
  );
}
