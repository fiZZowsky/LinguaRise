import React from 'react';
import '../assets/styles/Courses.css';
import { useLanguagesWithFlags, useUserLanguagesWithFlags } from '../hooks/useLanguages';
import { useTranslations } from "../hooks/useTranslations";
import { useLanguage } from "../context/LanguageContext";

const Courses = () => {
  const { language: selectedLang } = useLanguage();
  const { languages, error } = useLanguagesWithFlags();
  const { languages: userLanguages, error: userLanguagesError } = useUserLanguagesWithFlags();
  const translations = useTranslations(selectedLang, 'CoursesPage');

  if (error) return <div>Error: {error}</div>;
  if (userLanguagesError) return <div>Error: {userLanguagesError}</div>;

  return (
    <div className="courses-container">
      <div className="courses-section new-courses">
        <h2>{translations.NewCourses || "New courses"}</h2>
        <div className="language-grid">
          {languages.map(lang => (
            <div
              key={lang.id}
              className="language-card"
              onClick={() => alert(`Choosed ${lang.name}`)}
            >
              <img
                src={`data:image/png;base64,${lang.flagImage}`}
                alt={`${lang.name} flaga`}
                className="language-flag"
              />
              <div className="language-name">{lang.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="courses-section user-courses">
        <h2>{translations.YourCourses || "Your courses"}</h2>
        {userLanguages.length > 0 ? (
          <div className="language-grid">
            {userLanguages.map(lang => (
              <div
                key={lang.id}
                className="language-card"
                onClick={() => alert(`Your course: ${lang.name}`)}
              >
                <img
                  src={`data:image/png;base64,${lang.flagImage}`}
                  alt={`${lang.name} flaga`}
                  className="language-flag"
                />
                <div className="language-name">{lang.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>{translations.NoActiveCourses || "No active courses"}</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
