import React from 'react';
import Container from './Container';
import SwitchLang from './SwitchLang/LangList';
import ToggleTheme from './ToggleTheme';

const Header = () => {
  return (
    <header className="text-center">
      <Container>
        <div className="flex justify-between">
          <p>logo</p>
          <div className="flex gap-5">
            <SwitchLang />
            <ToggleTheme />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
