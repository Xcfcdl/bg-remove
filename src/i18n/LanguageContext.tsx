import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTranslation, Language, Translations } from './index';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getLanguageFromPath = (): Language | null => {
    const pathLang = location.pathname.split('/')[1];
    const supportedLanguages: Language[] = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ru', 'ar', 'mn', 'zh-tw', 'zh-hk'];
    if (supportedLanguages.includes(pathLang as Language)) {
      return pathLang as Language;
    }
    return null;
  };
  
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.toLowerCase();
    const supportedLanguages: Language[] = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ru', 'ar', 'mn', 'zh-tw', 'zh-hk'];
    
    // Check for exact matches first (e.g., zh-tw, zh-hk)
    if (supportedLanguages.includes(browserLang as Language)) {
      return browserLang as Language;
    }
    
    // Check for language code matches (e.g., zh for zh-cn)
    const langCode = browserLang.split('-')[0];
    if (supportedLanguages.includes(langCode as Language)) {
      return langCode as Language;
    }
    
    return 'en'; // Default fallback
  };
  
  const getInitialLanguage = (): Language => {
    // 1. Check URL path first
    const pathLang = getLanguageFromPath();
    if (pathLang) {
      return pathLang;
    }
    
    // 2. Check localStorage
    const saved = localStorage.getItem('bg-remover-language');
    const supportedLanguages: Language[] = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ru', 'ar', 'mn', 'zh-tw', 'zh-hk'];
    if (saved && supportedLanguages.includes(saved as Language)) {
      return saved as Language;
    }
    
    // 3. Detect browser language
    return getBrowserLanguage();
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());
  const t = getTranslation(language);

  useEffect(() => {
    const pathLang = location.pathname.split('/')[1];
    const supportedLanguages: Language[] = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ru', 'ar', 'mn', 'zh-tw', 'zh-hk'];
    if (supportedLanguages.includes(pathLang as Language) && pathLang !== language) {
      setLanguage(pathLang as Language);
    }
  }, [location.pathname, language]);

  useEffect(() => {
    localStorage.setItem('bg-remover-language', language);
  }, [language]);
  
  const changeLanguage = (newLanguage: Language) => {
    const currentPath = location.pathname.replace(/^\/(en|zh|es|fr|de|ja|ru|ar|mn|zh-tw|zh-hk)/, '') || '/';
    navigate(`/${newLanguage}${currentPath === '/' ? '' : currentPath}`);
    setLanguage(newLanguage);
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t: getTranslation(language)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};