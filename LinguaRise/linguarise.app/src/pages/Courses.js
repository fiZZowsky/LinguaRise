import React from 'react';
import { useCourses } from '../hooks/useCourses';

const Courses = () => {
  const userId = "1";
  const { courses, error } = useCourses(userId);

  if (error) return <div>Błąd: {error}</div>;
  if (!courses.length) return <div>Brak kursów</div>;

  return (
    <ul>
      {courses.map(course => (
        <li key={course.id}>{course.languageName}</li>
      ))}
    </ul>
  );
};

export default Courses;
