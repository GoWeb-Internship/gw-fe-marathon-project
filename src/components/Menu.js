import * as React from 'react';
import Container from './Container';
import SwitchLang from './SwitchLang';
import ToggleTheme from './ToggleTheme';

export default function Menu() {
  return (
    <>
      <div className="fixed left-0 pt-11 h-full w-screen bg-accent dark:bg-accent-dark md:hidden">
        <Container>
          <ul>
            <li className="p-4 rounded-lg mb-4 shadow-main">
              <SwitchLang />
            </li>
            <li className="p-4 rounded-lg shadow-main">
              <ToggleTheme />
            </li>
          </ul>
        </Container>
      </div>
    </>
  );
}
