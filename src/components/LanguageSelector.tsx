import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as Language);
  };

  return (
    <div className="flex items-center gap-2">
      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      >
        <option value="en">{t.languages.en}</option>
        <option value="zh">{t.languages.zh}</option>
        <option value="zh-tw">{t.languages['zh-tw']}</option>
        <option value="zh-hk">{t.languages['zh-hk']}</option>
        <option value="es">{t.languages.es}</option>
        <option value="fr">{t.languages.fr}</option>
        <option value="de">{t.languages.de}</option>
        <option value="ja">{t.languages.ja}</option>
        <option value="ru">{t.languages.ru}</option>
        <option value="ar">{t.languages.ar}</option>
        <option value="mn">{t.languages.mn}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;