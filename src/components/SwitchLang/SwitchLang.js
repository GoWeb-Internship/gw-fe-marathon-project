import React, { useState } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import LangList from './LangList';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Backdrop from '../Backdrop';

export const normalizeLang = language =>
  language === 'uk' ? 'UA' : language.toUpperCase();

const SwitchLang = () => {
  const { language } = useI18next();
  const [dropdown, setDropdown] = useState(false);

  const toggle = () => {
    setDropdown(prev => !prev);
  };

  return (
    <div className="relative box-border w-full max-md:p-4">
      <button
        type="button"
        className="text-main flex h-full w-full items-center gap-x-2 "
        onClick={toggle}
      >
        <span className="text-font-light">{normalizeLang(language)}</span>
        <GlobeAltIcon className="h-6 w-6 text-font-light" />
      </button>
      {dropdown && (
        <>
          <LangList active={language} />
          <Backdrop
            className="fixed top-0 left-0 z-10 h-full w-full"
            handleCloseFunction={toggle}
          />
        </>
      )}
    </div>
  );
};

export default SwitchLang;
