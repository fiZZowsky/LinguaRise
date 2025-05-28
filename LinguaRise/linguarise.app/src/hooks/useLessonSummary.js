import { useState, useEffect, useRef } from "react";
import api from "../services/Api";
import { useLoading } from '../context/LoadingContext';
import { LessonSummaryDTO } from "../data/LessonSummaryDTO";

export const useLessonSummary = (lessonId, categoryId) => {
  const [lessonSummaryData, setLessonSummaryData] = useState(null);
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoading();
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!lessonId || !categoryId || fetchedRef.current) return;

    const getLessonSummary = async () => {
      fetchedRef.current = true;
      try {
        showLoader();
        const response = await api.get(
          `lesson/${lessonId}/summary?categoryId=${categoryId}`
        );
        console.log(response);
        const dto = new LessonSummaryDTO(response);
        setLessonSummaryData(dto);
        console.log(dto);
      } catch (err) {
        console.error("Błąd pobierania podsumowania lekcji:", err);
        setError(err);
      } finally {
        hideLoader();
      }
    };

    getLessonSummary();
  }, [lessonId, categoryId]);

  return { lessonSummaryData, error };
};
