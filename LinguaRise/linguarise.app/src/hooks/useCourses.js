import { useEffect, useState } from 'react';
import api from '../services/Api';

export const useCourses = (userId) => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const result = await api.get(`user/${userId}/courses`);
      setCourses(result);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCourses();
    }
  }, [userId]);

  return { courses, error };
};
