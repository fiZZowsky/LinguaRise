import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => getCookie("userLang") || "EN");

  useEffect(() => {
    setCookie("userLang", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const getCurrentLanguage = () => getCookie("userLang") || "EN";