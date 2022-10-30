import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { toggleBar, toggle, moonIcon, sunIcon } from './ToggleTheme.module.css';

const ToggleTheme = () => {
  let websiteTheme;
  if (typeof window !== `undefined`) {
    websiteTheme = window.__theme;
  }
  useEffect(() => {
    setTheme(window.__theme);
  }, []);

  const [theme, setTheme] = useState(websiteTheme);

  const ThemeToggle = () => {
    window.__setPreferredTheme(websiteTheme === 'dark' ? 'light' : 'dark');
    setTheme(websiteTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={toggleBar}>
      <Toggle
        className={toggle}
        icons={{
          checked: <MoonIcon className={moonIcon} />,
          unchecked: <SunIcon className={sunIcon} />,
        }}
        checked={theme === 'light' ? false : true}
        onChange={ThemeToggle}
      />
    </div>
  );
};

export default ToggleTheme;
