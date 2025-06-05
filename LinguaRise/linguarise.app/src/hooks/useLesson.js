import { useState, useCallback } from "react";
import api from "../services/Api";
import { useLoading } from '../context/LoadingContext';
import { RecognitionRequest } from "../data/RecognitionRequest";

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
  const { showLoader, hideLoader } = useLoading();

  const getPronunciationData = useCallback(
    async (lessonId, languageId, wordId, audioFile) => {
      const formData = new FormData();
      formData.append("AudioFile", audioFile);
      formData.append("LessonId", lessonId.toString());
      formData.append("LanguageId", languageId.toString());
      formData.append("WordId", wordId.toString());

      try {
        showLoader();
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
      finally{
        hideLoader();
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

export const useGetResultFromWritedText = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoading();

  const getResultForWritedText = useCallback(
    async (lessonId, languageId, wordId, recognizedText) => {
      try {
        showLoader();

        const requestData = new RecognitionRequest({
          lessonId: lessonId,
          languageId: languageId,
          wordId: wordId,
          recognizedText: recognizedText,
        });

        const response = await api.post(
          "lesson/speech-recognition-assessment",
          requestData,
          false
        );

        setResponseData(response.data);
        console.log("Odpowiedź serwera:", response.data);
      } catch (err) {
        console.error("Błąd wysyłania danych:", err);

        const serverMessage =
          err.response?.data?.message || err.message || "Błąd przesyłania danych";
        setError(serverMessage);
      } finally {
        hideLoader();
      }
    },
    [showLoader, hideLoader]
  );

  return {
    getResultForWritedText,
    responseData,
    error,
  };
};