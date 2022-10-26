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
    <div className="toggle-bar flex items-center ">
      <Toggle
        className="w-10 h-5"
        icons={{
          checked: <MoonIcon className="h-4 w-4 text-accent-dark" />,
          unchecked: <SunIcon className="h-4 w-4 text-accent" />,
        }}
        checked={theme === 'light' ? false : true}
        onChange={ThemeToggle}
      />
    </div>
  );
};

export default ToggleTheme;
