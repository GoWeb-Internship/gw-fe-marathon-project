import React, { Fragment, useState } from 'react';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { Listbox, Transition } from '@headlessui/react';

const getNormalizeData = language =>
  language === 'uk' ? 'UA' : language.toUpperCase();

const normalizedLang = lang => {
  switch (lang) {
    case 'uk':
      return 'UA';
    case 'ru':
      return 'RU';
    case 'en':
      return 'EN';
    default:
      return null;
  }
};

const SwitchLang = () => {
  const { language, languages, originalPath } = useI18next();
  const [selected, setSelected] = useState(normalizedLang(language));

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:text-sm">
          <span className="block truncate">{getNormalizeData(language)}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <GlobeAltIcon className="h-6 w-6" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {languages.map(lng => (
              <Listbox.Option
                key={lng}
                className={({ active }) =>
                  `relative cursor-pointer select-none px-4 py-2 text-center uppercase transition-all ${
                    active ? 'bg-blue-200 text-blue-500' : 'text-gray-900'
                  }`
                }
                value={normalizedLang(lng)}
              >
                {({ selected }) => (
                  <>
                    <Link
                      to={originalPath}
                      language={lng}
                      className={`block truncate ${
                        selected ? 'underline decoration-blue-500' : ''
                      }`}
                    >
                      {normalizedLang(lng)}
                    </Link>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SwitchLang;
