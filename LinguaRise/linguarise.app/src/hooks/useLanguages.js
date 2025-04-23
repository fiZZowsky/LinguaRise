import api from '../services/Api';
import { useEffect, useState } from 'react';

export const useLanguagesWithFlags = () => {
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await api.get('language/with-flags');
        setLanguages(res);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLanguages();
  }, []);

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