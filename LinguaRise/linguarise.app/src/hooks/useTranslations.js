import { useEffect, useState } from "react";
import api from "../services/Api";
import { useLoading } from '../context/LoadingContext';

export const useTranslations = (languageCode, type) => {
  const [translations, setTranslations] = useState({});
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    const fetchTranslations = async () => {
      if (!languageCode) return;

      try {
        showLoader();
        const data = await api.get(`resource?languageCode=${languageCode}&type=${type}`);
        const mapped = {};
        data.forEach((item) => {
          mapped[item.key] = item.name;

          const element = document.getElementById(item.key);
          if (element) {
            element.innerText = item.name;
          }
        });
        setTranslations(mapped);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania tłumaczeń:", error);
      } finally {
        hideLoader();
      }
    };

    fetchTranslations();
  }, [languageCode, type]);

  return translations;
};
