import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { toggleBar, toggle, moonIcon, sunIcon } from './ToggleTheme.module.css';
import { Switch } from '@headlessui/react';

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

  useEffect(() => {
    setTheme(window.__theme);

    setChecked(websiteTheme === 'dark');
  }, [websiteTheme]);

  // these states should always be after the typeof window !== `undefined` expression
  const [theme, setTheme] = useState(websiteTheme);
  const [checked, setChecked] = useState(false);

  const ThemeToggle = () => {
    window.__setPreferredTheme(websiteTheme === 'dark' ? 'light' : 'dark');

    setTheme(websiteTheme === 'dark' ? 'light' : 'dark');

    setChecked(
      localStorage.getItem('preferred-theme') === 'dark' ? true : false,
    );
  };

  return (
    <div className="h-[20px] w-[40px]">
      <Switch checked={checked} onChange={ThemeToggle} className={toggleBar}>
        <span className="sr-only">Use setting</span>
        <MoonIcon className={`${moonIcon} absolute`} />
        <span
          aria-hidden="true"
          className={`${
            checked ? 'translate-x-[20px] bg-font-dark' : 'translate-x-[0px]'
          } ${toggle} shadow-lg `}
        />
        <SunIcon className={`${sunIcon} absolute right-0`} />
      </Switch>
    </div>
  );
};

export default ToggleTheme;
