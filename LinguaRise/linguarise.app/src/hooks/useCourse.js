import { useState } from "react";
import api from "../services/Api";
import { useLoading } from "../context/LoadingContext";
import { useUser } from "../context/UserContext";
import { CourseDTO } from "../data/CourseDTO";

export const useCourse = () => {
  const { oid } = useUser();
  const { showLoader, hideLoader } = useLoading();

  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createCourse = async (languageId) => {
    setError(null);
    setIsSuccess(false);

    const courseDto = new CourseDTO({ 
      userId: oid, 
      languageId 
    });

    try {
      showLoader();
      await api.post("course", courseDto);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "Error assigning course language to user");
      throw err;
    } finally {
      hideLoader();
    }
  };

  return {
    createCourse,
    isSuccess,
    error,
  };
};
