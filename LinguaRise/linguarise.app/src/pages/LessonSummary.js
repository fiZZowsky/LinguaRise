import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLessonSummary } from "../hooks/useLessonSummary";
import { useAlert } from '../hooks/useAlert';
import '../assets/styles/LessonSummary.css';

const LessonSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { categoryId, lessonId } = state || {};
  const { showAlert } = useAlert();
  const { lessonSummaryData, error } = useLessonSummary(lessonId, categoryId);

  useEffect(() => {
    if (error) {
      showAlert("Nie udało się pobrać podsumowania lekcji.", "error");
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
      <h1 className="ls-title">Podsumowanie lekcji</h1>
      <div className="ls-meta">
        {flagImage && (
          <img
            src={flagImage}
            alt={`${languageName} flaga`}
            className="ls-flag"
          />
        )}
        <p className="ls-info">
          Język: <strong>{languageName}</strong> &nbsp;&bull;&nbsp;
          Kategoria: <strong>{categoryName}</strong> &nbsp;&bull;&nbsp;
          Wynik: <strong>{percent}%</strong>
        </p>
      </div>
      <div className="ls-content">
        {learnedWords.length > 0 ? (
          <ul className="ls-word-list">
            {learnedWords.map((word, idx) => (
              <li key={word.id ?? idx}>
                {word.name}
                {word.level && ` — poziom: ${word.level}`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="ls-no-data">Brak wyuczonych słówek w tej kategorii.</p>
        )}
      </div>
    </div>
  );
};

export default LessonSummary;