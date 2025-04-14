import React from 'react';
import { useCourses } from '../hooks/useCourses';

const Courses = () => {
  const { courses, error } = useCourses();

  if (error) return <p>Błąd: {error}</p>;

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
