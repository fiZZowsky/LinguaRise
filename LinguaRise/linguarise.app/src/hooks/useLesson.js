import { useState, useCallback } from "react";
import api from "../services/Api";

export const useLesson = () => {
  const [speechData, setSpeechData] = useState(null);
  const [error, setError] = useState(null);

  const getLessonSentence = useCallback(
    async (categoryId, languageId) => {
      try {
        console.log(`categoryID: ${categoryId}, languageID: ${languageId}`);
        const response = await api.get(
          `lesson/content-speech?categoryId=${categoryId}&languageId=${languageId}`
        );
        setSpeechData(response);
        return response;
      } catch (err) {
        setError(err.message || "Error getting user lesson.");
        throw err;
      }
    }
  );

  return {
    getLessonSentence,
    speechData,
    error,
  };
};
