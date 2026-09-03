import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { translations } from './translations';

export const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [audioFirst, setAudioFirst] = useState(false);

  useEffect(() => {
    if (largeText) {
      document.documentElement.style.fontSize = '125%';
    } else {
      document.documentElement.style.fontSize = '100%';
    }
  }, [largeText]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast-mode');
    } else {
      document.documentElement.classList.remove('high-contrast-mode');
    }
  }, [highContrast]);

  const t = useCallback((key) => {
    const langDict = translations[lang] || translations['en'];
    return langDict[key] || translations['en'][key] || key;
  }, [lang]);

  return (
    <SettingsContext.Provider value={{
      lang, setLang,
      largeText, setLargeText,
      highContrast, setHighContrast,
      audioFirst, setAudioFirst,
      t
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
