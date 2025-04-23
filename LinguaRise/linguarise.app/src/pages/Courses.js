import React from 'react';
import { useLanguagesWithFlags } from '../hooks/useLanguages';
import '../assets/styles/Courses.css';

const Courses = () => {
  const { languages, error } = useLanguagesWithFlags();

  if (error) return <div>Błąd: {error}</div>;

  return (
    <div className="language-grid">
      {languages.map(lang => (
        <div key={lang.id} className="language-card" onClick={() => alert(`Choosed ${lang.name}`)}>
          <img
            src={`data:image/png;base64,${lang.flagImage}`}
            alt={`${lang.name} flag`}
            className="language-flag"
          />
          <div className="language-name">{lang.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
