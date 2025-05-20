import { useState, useCallback } from "react";
import api from "../services/Api";
import { useLoading } from "../context/LoadingContext";

export const useLesson = () => {
  const { showLoader, hideLoader } = useLoading();
  const [speechData, setSpeechData] = useState(null);
  const [error, setError] = useState(null);

  const getLessonSentence = useCallback(
    async (categoryId, languageId) => {
      try {
        console.log(`categoryID: ${categoryId}, languageID: ${languageId}`);
        showLoader();
        const response = await api.get(
          `lesson/content-speech?categoryId=${categoryId}&languageId=${languageId}`
        );
        setSpeechData(response.data);
        return response.data;
      } catch (err) {
        setError(err.message || "Error getting user lesson.");
        throw err;
      } finally {
        hideLoader();
      }
    }
  );

  return {
    getLessonSentence,
    speechData,
    error,
  };
};
