import api from '../services/Api';
import { useEffect, useState } from 'react';
import { getCurrentLanguage } from "../context/LanguageContext";
import { useUser } from '../context/UserContext';

export const useLanguagesWithFlags = () => {
  const selectedLang = getCurrentLanguage();
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);
  const { oid } = useUser();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await api.get(`language/with-flags/user/${oid}`);
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
  const { oid } = useUser();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await api.get(`language/user/${oid}`);
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