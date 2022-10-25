import React, { useState } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import LangList from './LangList';
import LangBackdrop from './LangBackdrop';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export const normalizeLang = language =>
  language === 'uk' ? 'UA' : language.toUpperCase();

const SwitchLang = () => {
  const { language } = useI18next();
  const [dropdown, setDropdown] = useState(false);

  const toggle = () => {
    setDropdown(prev => !prev);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-x-2 py-2 px-2 text-main"
        onClick={toggle}
      >
        <span>{normalizeLang(language)}</span>
        <GlobeAltIcon className="h-6 w-6" />
      </button>
      {dropdown && (
        <>
          <LangList active={language} />
          <LangBackdrop onClose={toggle} />
        </>
      )}
    </div>
  );
};

export default SwitchLang;
