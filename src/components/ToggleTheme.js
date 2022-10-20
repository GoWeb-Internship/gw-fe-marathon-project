import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// adds toggle logic elements and styles
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
    <div className="toggle-bar flex items-center">
      <SunIcon className="h-5 w-5 mr-3 text-slate-50 dark:text-slate-400" />
      <Toggle
        className="mr-3"
        icons={false}
        checked={theme === 'light' ? false : true}
        onChange={ThemeToggle}
      />
      <MoonIcon className="h-5 w-5 text-slate-300 dark:text-slate-50" />
    </div>
  );
};

export default ToggleTheme;
