import { useState, useCallback } from "react";
import api from "../services/Api";

export const useLesson = () => {
  const [speechData, setSpeechData] = useState(null);
  const [error, setError] = useState(null);

  const getLessonSentence = useCallback(
    async (categoryId, languageId) => {
      try {
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

export const useSendRecording = () => {
  const [pronunciationData, setPronunciationData] = useState(null);
  const [error, setError] = useState(null);

  const getPronunciationData = useCallback(
    async (lessonId, languageId, wordId, audioFile) => {
      const formData = new FormData();
      formData.append("AudioFile", audioFile);
      formData.append("LessonId", lessonId.toString());
      formData.append("LanguageId", languageId.toString());
      formData.append("WordId", wordId.toString());

      try {
        const response = await api.post(
          "lesson/evaluate-speech",
          formData,
          false
        );
        setPronunciationData(response);
        console.log(response);
        return response;
      } catch (err) {
        const message =
          (err && err.message) ||
          "Error sending Pronunciation data";
        setError(message);
        throw err;
      }
    },
    []
  );

  return {
    getPronunciationData,
    pronunciationData,
    error,
  };
};