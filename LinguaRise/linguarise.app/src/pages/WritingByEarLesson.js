import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaVolumeUp, FaArrowLeft } from "react-icons/fa";
import { useLesson, useGetResultFromWritedText } from "../hooks/useLesson";
import { useLoading } from "../context/LoadingContext";
import "../assets/styles/ListeningRepetitionLesson.css";
import { useAlert } from "../hooks/useAlert";
import { AlertType } from '../data/alertTypes';

const WritingByEarLesson = () => {
  const navigate = useNavigate();
  const { langId } = useParams();
  const languageId = Number(langId);

  const { getLessonSentence, speechData, error } = useLesson();
  const { getResultForWritedText } = useGetResultFromWritedText();
  const { showLoader } = useLoading();
  const fetched = useRef(false);
  const { showAlert } = useAlert();

  const [answer, setAnswer] = useState("");
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef(null);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    showLoader();
    getLessonSentence(2, languageId).catch(console.error);
  }, [getLessonSentence, languageId, showLoader]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const current = speechData?.items?.[currentIndex];
  const hasNext = currentIndex < (speechData?.items?.length || 0) - 1;

  const handlePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };
  
const handleCheck = async () => {
    setIsPlaying(false);

    try {
      const result = await getResultForWritedText(
        speechData.lessonId,
        languageId,
        current.textId,
        answer
      );
      const message = `Wynik: ${result.score}`;
      await showAlert(AlertType.INFO, message);
      if (result && result.isCorrect === false) return;
    } catch (e) {
      await showAlert(
        AlertType.ERROR,
        `Błąd sprawdzania odpowiedzi: ${e}`
      );
      return;
    }
    setAnswer("");

    if (hasNext) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      const categoryId = 2;
      navigate("/courses/listening-repetition/summary", {
        state: { categoryId, lessonId: speechData.lessonId },
      });
    }
  };

  const handleSkip = () => {
    setAnswer("");
    setIsPlaying(false);

    if (hasNext) {
      setCurrentIndex((idx) => idx + 1);
    } else {
      const categoryId = 2;
      navigate("/courses/listening-repetition/summary", {
        state: { categoryId, lessonId: speechData.lessonId },
      });
    }
  };

  const onEnded = () => setIsPlaying(false);

  if (error) return <div className="lr-error">Error: {error}</div>;
  if (!speechData || !current) return null;

  return (
    <div className="lr-container">
      <button className="lr-back" onClick={() => navigate(-1)}>
        <FaArrowLeft size={16} />
        <span>Back</span>
      </button>

      {!started ? (
        <div className="lr-setup">
          <button className="lr-start" onClick={() => setStarted(true)}>
            Zaczynamy!
          </button>
        </div>
      ) : (
        <div className="lr-card">
          <div className="lr-counter">
            {currentIndex + 1} / {speechData.items.length}
          </div>

          <h1 className="lr-title">Practice Listening</h1>
          <p className="lr-subtitle">Type what you hear in the text box</p>

          <div className="lr-playback-row">
            <div className="lr-audio-controls">
              <button className="icon-button play" onClick={handlePlay}>
                <FaVolumeUp size={24} />
              </button>
            </div>
            <input
              type="range"
              className="lr-volume-slider"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>

          <audio
            ref={audioRef}
            src={`data:audio/mp3;base64,${current.audioBase64}`}
            onEnded={onEnded}
            style={{ display: "none" }}
          />

          <div className="lr-input-container">
            <input
              type="text"
              name="answer"
              placeholder="Type your answer here..."
              className="answer-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>

          <div className="lr-actions">
            <button className="btn check" onClick={handleCheck}>
              Check
            </button>
            <button className="btn skip" onClick={handleSkip}>
              Next
            </button>
          </div>

          <div className="lr-tips">
            <h2>Tips</h2>
            <p>Pay attention to the pronunciation of words.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingByEarLesson;
