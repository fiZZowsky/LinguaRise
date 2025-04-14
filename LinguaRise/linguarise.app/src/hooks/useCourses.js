import { useEffect, useState } from 'react';
import api from '../services/Api';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const result = await api.get('courses');
      setCourses(result);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, error };
};
