import React from 'react';
import '../assets/styles/Courses.css';
import { useLanguagesWithFlags, useUserLanguagesWithFlags } from '../hooks/useLanguages';
import { useTranslations } from "../hooks/useTranslations";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const { language: selectedLang } = useLanguage();
  const { languages } = useLanguagesWithFlags();
  const { languages: userLanguages } = useUserLanguagesWithFlags();
  const translations = useTranslations(selectedLang, 'CoursesPage');
  const navigate = useNavigate();

  const handleLanguageSelect = (langCode) => {
    navigate(`/courses/${langCode}/categories`);
  };

  return (
    <div className="courses-container">
      <div className="courses-section new-courses">
        <h2>{translations.NewCourses || "New courses"}</h2>
        <div className="language-grid">
          {languages.map(lang => (
            <div
              key={lang.code}
              className="language-card"
              onClick={() => handleLanguageSelect(lang.code)}
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
                onClick={() => handleLanguageSelect(lang.id)}
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
