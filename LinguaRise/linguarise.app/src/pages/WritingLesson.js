import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useWritingLesson, useValidateWrittenAnswer } from "../hooks/useLesson";
import { useLoading } from "../context/LoadingContext";
import "../assets/styles/ListeningRepetitionLesson.css";
import { useAlert } from "../hooks/useAlert";
import { AlertType } from '../data/alertTypes';
import { useTranslations } from "../hooks/useTranslations";
import { useLanguage } from "../context/LanguageContext";

const WritingLesson = () => {
  const navigate = useNavigate();
  const { langId } = useParams();
  const languageId = Number(langId);
  const { language: selectedLang } = useLanguage();
  const translations = useTranslations(selectedLang, 'WritingLesson');

  const { getWritingLessonContent, writingData, error } = useWritingLesson();
  const { validateWrittenAnswer } = useValidateWrittenAnswer();
  const { showLoader } = useLoading();
  const fetched = useRef(false);
  const { showAlert } = useAlert();

  const [answer, setAnswer] = useState("");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    showLoader();
    getWritingLessonContent(languageId).catch(console.error);
  }, [getWritingLessonContent, languageId, showLoader]);

  const current = writingData?.items?.[currentIndex];
  const hasNext = currentIndex < (writingData?.items?.length || 0) - 1;

const handleCheck = async () => {
    try {
      const result = await validateWrittenAnswer(
        writingData.lessonId,
        languageId,
        current.wordId,
        answer
      );

      const message = `${translations.Score || "Score"}: ${result.score}`;

      await showAlert(AlertType.INFO, message);
      if (result && result.isCorrect === false) return;
    } catch (e) {
      await showAlert(
        AlertType.ERROR,
        `${translations.AnswerCheckingError + ": " || "Answer checking error: "} ${e}`
      );
      return;
    }
    setAnswer("");

    if (hasNext) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      const categoryId = 3;
      navigate("/courses/listening-repetition/summary", {
        state: { categoryId, lessonId: writingData.lessonId },
      });
    }
  };

  const handleSkip = () => {
    setAnswer("");

    if (hasNext) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      const categoryId = 3;
      navigate("/courses/listening-repetition/summary", {
        state: { categoryId, lessonId: writingData.lessonId },
      });
    }
  };

  if (!writingData || !current) return null;

  return (
    <div className="lr-container">
      <button className="lr-back" onClick={() => navigate(-1)}>
        <FaArrowLeft size={16} />
        <span>{translations.Back || "Back"}</span>
      </button>

      {!started ? (
        <div className="lr-setup">
          <button className="lr-start" onClick={() => setStarted(true)}>
            {translations.HereWeGo || "Here we go"}!
          </button>
        </div>
      ) : (
        <div className="lr-card">
          <div className="lr-counter">
            {currentIndex + 1} / {writingData.items.length}
          </div>

        <h1 className="lr-title">{translations.PracticeWriting || "Practice Writing"}</h1>
          <p className="lr-subtitle">{translations.TranslateTheWordBelow || "Translate the word below"}</p>

          <div className="lr-input-container">
            <input
              type="text"
              readOnly
              tabIndex={-1}
              className="answer-input"
              value={current.wordInUserLanguage}
            />

            <input
              type="text"
              name="answer"
              placeholder={translations.TypeYourAnswerHere || "Type your answer here..."}
              className="answer-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <div className="lr-actions">
            <button className="btn check" onClick={handleCheck}>
              {translations.Check || "Check"}
            </button>
            <button className="btn skip" onClick={handleSkip}>
              {translations.Next || "Next"}
            </button>
          </div>

          <div className="lr-tips">
            <h2>{translations.Tips || "Tips"}</h2>
            <p>{translations.PayAttentionToThePronunciationOfWords || "Pay attention to the pronunciation of words."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingLesson;