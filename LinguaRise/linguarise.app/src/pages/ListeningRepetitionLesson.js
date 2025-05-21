import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  FaMicrophone,
  FaStop,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useLesson } from "../hooks/useLesson";
import { useLoading } from "../context/LoadingContext";
import "../assets/styles/ListeningRepetitionLesson.css";

const ListeningRepetitionLesson = () => {
  const { langId } = useParams();
  const languageId = Number(langId);
  const { getLessonSentence, speechData, error } = useLesson();
  const { showLoader, hideLoader } = useLoading();
  const fetched = useRef(false);

  const [audioInputs, setAudioInputs] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedOutput, setSelectedOutput] = useState("");

  const [started, setStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // 1️⃣ Pobranie danych
  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    showLoader();
    getLessonSentence(1, languageId)
      .catch(console.error)
      .finally(hideLoader);
  }, [getLessonSentence, languageId, showLoader, hideLoader]);

  // 2️⃣ Enumeracja urządzeń
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => navigator.mediaDevices.enumerateDevices())
      .then((devices) => {
        const inputs = devices.filter((d) => d.kind === "audioinput");
        const outputs = devices.filter((d) => d.kind === "audiooutput");
        setAudioInputs(inputs);
        setAudioOutputs(outputs);
        if (inputs[0]) setSelectedInput(inputs[0].deviceId);
        if (outputs[0]) setSelectedOutput(outputs[0].deviceId);
      })
      .catch((e) => console.error("Błąd audio:", e));
  }, []);

  // 3️⃣ Ustawienie sinkId
  useEffect(() => {
    const el = audioRef.current;
    if (el && el.setSinkId) el.setSinkId(selectedOutput).catch(console.warn);
  }, [selectedOutput, started, currentIndex]);

  if (error) return <div className="lr-error">Error: {error}</div>;
  if (!speechData?.items.length)
    return <div className="lr-no-data">Brak danych.</div>;

  const current = speechData.items[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < speechData.items.length - 1;

  // ▶️/■ toggle
  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // po zakończeniu automatycznie reset
  const onEnded = () => setIsPlaying(false);

  return (
    <div className="lr-container">
      {!started ? (
        <div className="lr-setup">
          <div className="lr-devices">
            <select
              value={selectedOutput}
              onChange={(e) => setSelectedOutput(e.target.value)}
            >
              {audioOutputs.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || d.deviceId}
                </option>
              ))}
            </select>
            <select
              value={selectedInput}
              onChange={(e) => setSelectedInput(e.target.value)}
            >
              {audioInputs.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || d.deviceId}
                </option>
              ))}
            </select>
          </div>
          <button className="lr-start" onClick={() => setStarted(true)}>
            Zaczynamy!
          </button>
        </div>
      ) : (
        <div className="lr-lesson">
          <button
            className={`lr-record ${isRecording ? "recording" : ""}`}
            onClick={() => setIsRecording((r) => !r)}
          >
            {isRecording ? <FaStop /> : <FaMicrophone />}
          </button>
          <div className="lr-player">
            {hasPrev && (
              <button onClick={() => setCurrentIndex((i) => i - 1)}>
                <FaArrowLeft />
              </button>
            )}
            <label className="play-wrapper">
              <input
                type="checkbox"
                className="play-btn"
                checked={isPlaying}
                onChange={togglePlay}
              />
              <div className="icon play"></div>
              <div className="icon pause"></div>
            </label>
            {hasNext && (
              <button onClick={() => setCurrentIndex((i) => i + 1)}>
                <FaArrowRight />
              </button>
            )}
          </div>
          <audio
            ref={audioRef}
            src={`data:audio/mp3;base64,${current.audioBase64}`}
            onEnded={onEnded}
            style={{ display: "none" }}
          />
          <p className="lr-text">{current.text}</p>
        </div>
      )}
    </div>
  );
};

export default ListeningRepetitionLesson;
