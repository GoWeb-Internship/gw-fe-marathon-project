import React, { useState } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';

import LangList from './LangList';

export const normalizeLang = language =>
  language === 'ua' ? 'UK' : language.toUpperCase();

const SwitchLang = () => {
  const { language } = useI18next();
  const [dropdown, setDropdown] = useState(false);
};
