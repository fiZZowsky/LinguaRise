import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLessonSummary } from "../hooks/useLessonSummary";
import { useAlert } from '../hooks/useAlert';
import '../assets/styles/LessonSummary.css';
import { AlertType } from '../data/alertTypes';
import { useTranslations } from "../hooks/useTranslations";
import { useLanguage } from "../context/LanguageContext";

const LessonSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { categoryId, lessonId } = state || {};
  const { showAlert } = useAlert();
  const { lessonSummaryData, error } = useLessonSummary(lessonId, categoryId);
  const { language: selectedLang } = useLanguage();
  const translations = useTranslations(selectedLang, 'LessonSummary');

  useEffect(() => {
    if (error) {
      showAlert(AlertType.ERROR, `${translations.FailedToDownloadLessonSummary || "Failed to download lesson summary."}`);
    }
  }, [error, showAlert, navigate]);

  if (!lessonSummaryData) {
    return null;
  }

const {
   languageName,
   flagImage,
   categoryName,
   learnedWords,
   score
 } = lessonSummaryData;

const rawScore = Number(score);
const maxScore = 10 * 100;
const percent = !isNaN(rawScore)
  ? Math.round((rawScore / maxScore) * 100)
  : 0;

  return (
    <div className="ls-container">
      <h1 className="ls-title">{translations.LessonSummary || "Lesson summary"}</h1>
      <div className="ls-meta">
        {flagImage && (
          <img
            src={`data:image/png;base64,${flagImage}`}
            alt={`${languageName} flaga`}
            className="ls-flag"
          />
        )}
        <p className="ls-info">
          {translations.Language || "Language"}: <strong>{languageName}</strong> &nbsp;&bull;&nbsp;
          {translations.Category || "Category"}: <strong>{categoryName}</strong> &nbsp;&bull;&nbsp;
          {translations.Score || "Score"}: <strong>{percent}%</strong>
        </p>
      </div>
      <div className="ls-content">
        {learnedWords.length > 0 ? (
          <div className="ls-word-list">
            {learnedWords.map((word, idx) => (
              <p key={word.id ?? idx}>
                 {word.name ?? word.Name}
              </p>
            ))}
          </div>
        ) : (
          <p className="ls-no-data">{translations.ThereAreNoWordsLearnedInThisCategory || "There are no words learned in this category."}</p>
        )}
      </div>
    </div>
  );
};

export default LessonSummary;