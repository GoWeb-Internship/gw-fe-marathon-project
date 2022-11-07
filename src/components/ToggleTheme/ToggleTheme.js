import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { toggleBar, toggle, moonIcon, sunIcon } from './ToggleTheme.module.css';

const ToggleTheme = () => {
  let websiteTheme;
  let mql;

  if (typeof window !== `undefined`) {
    websiteTheme = window.__theme;

    mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', e => {
      setChecked(e.matches);
    });
  }
  console.log(websiteTheme);
  // these states should always be after the typeof window !== `undefined` expression
  const [theme, setTheme] = useState(websiteTheme);
  const [checked, setChecked] = useState(theme === 'dark');
  console.log(theme === 'dark');
  console.log(checked);

  useEffect(() => {
    setTheme(window.__theme);
    setChecked(window.__theme === 'dark');
    console.log(websiteTheme);
    console.log(theme === 'dark');
  }, [theme, websiteTheme]);

  const ThemeToggle = () => {
    window.__setPreferredTheme(websiteTheme === 'dark' ? 'light' : 'dark');

    setTheme(websiteTheme === 'dark' ? 'light' : 'dark');

    setChecked(
      localStorage.getItem('preferred-theme') === 'dark' ? true : false,
    );
  };

  return (
    <div className={toggleBar}>
      <Toggle
        className={toggle}
        icons={{
          checked: <MoonIcon className={moonIcon} />,
          unchecked: <SunIcon className={sunIcon} />,
        }}
        checked={checked}
        onChange={ThemeToggle}
      />
    </div>
  );
};

export default ToggleTheme;
