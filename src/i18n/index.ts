import enTranslations from './en.json';
import zhTranslations from './zh.json';
import esTranslations from './es.json';
import frTranslations from './fr.json';
import deTranslations from './de.json';
import jaTranslations from './ja.json';
import ruTranslations from './ru.json';
import arTranslations from './ar.json';
import mnTranslations from './mn.json';
import zhTwTranslations from './zh-tw.json';
import zhHkTranslations from './zh-hk.json';

export type Language = 'en' | 'zh' | 'es' | 'fr' | 'de' | 'ja' | 'ru' | 'ar' | 'mn' | 'zh-tw' | 'zh-hk';

export interface Translations {
  nav: {
    title: string;
    model: string;
    iosOptimized: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    credit: string;
  };
  upload: {
    dragDrop: string;
    clickSelect: string;
    processing: string;
    error: string;
    loading: string;
    switchingModels: string;
    switchToCrossBrowser: string;
  };
  samples: {
    title: string;
    description: string;
    privacy: string;
    comparison: string;
  };
  footer: {
    features: {
      title: string;
      items: string[];
    };
    howItWorks: {
      title: string;
      steps: string[];
    };
    faq: {
      title: string;
      items: {
        question: string;
        answer: string;
      }[];
    };
    testimonials: {
      title: string;
      items: {
        name: string;
        role: string;
        content: string;
      }[];
    };
    pricing: {
      title: string;
      free: {
        title: string;
        features: string[];
        cta: string;
      };
    };
    contact: {
      title: string;
      email: string;
      github: string;
    };
    legal: {
      privacy: string;
      terms: string;
      copyright: string;
    };
  };
  languages: {
    en: string;
    zh: string;
    'zh-tw': string;
    'zh-hk': string;
    es: string;
    fr: string;
    de: string;
    ja: string;
    ru: string;
    ar: string;
    mn: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: enTranslations,
  zh: zhTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  ja: jaTranslations,
  ru: ruTranslations,
  ar: arTranslations,
  mn: mnTranslations,
  'zh-tw': zhTwTranslations,
  'zh-hk': zhHkTranslations,
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};

export const getSupportedLanguages = (): Language[] => {
  return Object.keys(translations) as Language[];
};