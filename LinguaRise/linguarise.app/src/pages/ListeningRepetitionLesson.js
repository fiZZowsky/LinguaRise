import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaMicrophone, FaStop, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLesson } from "../hooks/useLesson";
import { useLoading } from "../context/LoadingContext";
import './ListeningRepetitionLesson.css';

const ListeningRepetitionLesson = () => {
  const { langId } = useParams();
  const languageId = Number(langId);
  const { getLessonSentence, speechData, error } = useLesson();
  const { showLoader, hideLoader } = useLoading();
  const fetchedRef = useRef(false);

  const [audioInputs, setAudioInputs] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedOutput, setSelectedOutput] = useState("");

  const [started, setStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (fetchedRef.current) return;
    showLoader();
    fetchedRef.current = true;
    (async () => {
      try {
        await getLessonSentence(1, languageId);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoader();
      }
    })();
  }, [getLessonSentence, languageId, showLoader, hideLoader]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => navigator.mediaDevices.enumerateDevices())
      .then(devices => {
        const inputs = devices.filter(d => d.kind === "audioinput");
        const outputs = devices.filter(d => d.kind === "audiooutput");
        setAudioInputs(inputs);
        setAudioOutputs(outputs);
        if (inputs[0]) setSelectedInput(inputs[0].deviceId);
        if (outputs[0]) setSelectedOutput(outputs[0].deviceId);
      })
      .catch(err => console.error("Nie udało się pobrać urządzeń audio:", err));
  }, []);

  useEffect(() => {
    if (audioRef.current && typeof audioRef.current.setSinkId === 'function') {
      audioRef.current.setSinkId(selectedOutput).catch(console.warn);
    }
  }, [selectedOutput, started, currentIndex]);

  if (error) return <div className="error">Error: {error}</div>;
  if (!speechData || !speechData.items.length) return <div className="no-data">Brak danych do wyświetlenia.</div>;

  const handleStart = () => setStarted(true);
  const toggleRecord = () => setIsRecording(r => !r);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < speechData.items.length - 1;

  const playPrev = () => hasPrev && setCurrentIndex(i => i - 1);
  const playNext = () => hasNext && setCurrentIndex(i => i + 1);

  const currentItem = speechData.items[currentIndex];
  const audioSrc = `data:audio/mp3;base64,${currentItem.audioBase64}`;

  return (
    <div className="listening-repetition-lesson">
      {!started ? (
        <div className="setup-panel">
          <div className="device-row">
            <div className="device-selector">
              <label>Odtwarzanie:</label>
              <select value={selectedOutput} onChange={e => setSelectedOutput(e.target.value)}>
                {audioOutputs.map(d => <option key={d.deviceId} value={d.deviceId}>{d.label || d.deviceId}</option>)}
              </select>
            </div>
            <div className="device-selector">
              <label>Nagrywanie:</label>
              <select value={selectedInput} onChange={e => setSelectedInput(e.target.value)}>
                {audioInputs.map(d => <option key={d.deviceId} value={d.deviceId}>{d.label || d.deviceId}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleStart} className="start-button">Zaczynamy!</button>
        </div>
      ) : (
        <div className="lesson-panel">
          <button onClick={toggleRecord} className={`record-button ${isRecording ? 'recording' : ''}`}>
            {isRecording ? <FaStop /> : <FaMicrophone />}
          </button>
          <div className="player-row">
            {hasPrev && <button onClick={playPrev} className="nav-button prev"><FaArrowLeft /></button>}
            <audio controls ref={audioRef} src={audioSrc} className="audio-player" />
            {hasNext && <button onClick={playNext} className="nav-button next"><FaArrowRight /></button>}
          </div>
          <div className="sentence-text">{currentItem.text}</div>
        </div>
      )}
    </div>
  );
};

export default ListeningRepetitionLesson;