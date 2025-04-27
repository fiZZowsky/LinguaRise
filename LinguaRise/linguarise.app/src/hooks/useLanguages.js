import api from '../services/Api';
import { useEffect, useState } from 'react';
import { getCurrentLanguage } from "../context/LanguageContext";

export const useLanguagesWithFlags = () => {
  const selectedLang = getCurrentLanguage();
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);
  const userId = 1;

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await api.get(`language/with-flags/user/${userId}`);
        setLanguages(res);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLanguages();
  }, [selectedLang]);

  return { languages, error };
};

export const useUserLanguagesWithFlags = () => {
  const selectedLang = getCurrentLanguage();
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await api.get('language/user/1');
        setLanguages(res);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLanguages();
  }, [selectedLang]);

  return { languages, error };
};

export const useLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await api.get('language');
        setLanguages(res);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, error };
};