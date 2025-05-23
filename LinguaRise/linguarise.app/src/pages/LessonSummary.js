import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/Api';
import { useLoading } from '../context/LoadingContext';
import { useAlert } from '../hooks/useAlert';
import { AlertType } from '../data/alertTypes';
import '../assets/styles/LessonSummary.css';

const LessonSummary = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { categoryId, lessonId } = state || {};

  const { showLoader, hideLoader } = useLoading();
  const { showAlert } = useAlert();

  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId || !lessonId) {
      showAlert(AlertType.ERROR, 'Brak parametrów: categoryId lub lessonId.');
      return;
    }

    const fetchSummary = async () => {
      showLoader();
      try {
        const res = await api.get(
          `lesson/summary?categoryId=${categoryId}&lessonId=${lessonId}`
        );
        setSummaryData(res.data);
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        setError(msg);
        showAlert(AlertType.ERROR, `Błąd pobierania podsumowania: ${msg}`);
      } finally {
        hideLoader();
      }
    };

    fetchSummary();
  }, [
    categoryId,
    lessonId,
    showLoader,
    hideLoader,
    showAlert,
  ]);

  if (error) {
    return <div className="ls-error">Błąd: {error}</div>;
  }
  if (!summaryData) {
    return null;
  }

  return (
    <div className="ls-container">
      <button
        className="ls-back-button"
        onClick={() => navigate(-1)}
      >
        ← Wróć
      </button>

      <h1 className="ls-title">Podsumowanie lekcji</h1>
      <p className="ls-info">
        Kategoria: {categoryId} &nbsp;&bull;&nbsp; Lekcja: {lessonId}
      </p>

      <div className="ls-content">
        {Array.isArray(summaryData.items) && summaryData.items.length > 0 ? (
          summaryData.items.map((item, idx) => (
            <div key={idx} className="ls-item">
              <h2 className="ls-item-title">{item.title}</h2>
              <p className="ls-item-text">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="ls-no-data">Brak elementów do wyświetlenia.</p>
        )}
      </div>
    </div>
  );
};

export default LessonSummary;
