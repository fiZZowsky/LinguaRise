import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeUp,
  FaArrowLeft,
} from "react-icons/fa";
import { useLesson, useSendRecording } from "../hooks/useLesson";
import { useLoading } from "../context/LoadingContext";
import "../assets/styles/ListeningRepetitionLesson.css";

const ListeningRepetitionLesson = () => {
  const navigate = useNavigate();
  const { langId } = useParams();
  const languageId = Number(langId);
  const { getLessonSentence, speechData, error } = useLesson();
  const { getPronunciationData, pronunciationData, error: pronError } = useSendRecording();
  const { showLoader, hideLoader } = useLoading();
  const fetched = useRef(false);

  const [audioInputs, setAudioInputs] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedOutput, setSelectedOutput] = useState("");

  const [started, setStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const [recordedUrl, setRecordedUrl] = useState(null);

  const isCheckDisabled = isRecording || !recordedUrl;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef(null);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    showLoader();
    getLessonSentence(1, languageId)
      .catch(console.error)
      .finally(hideLoader);
  }, [getLessonSentence, languageId, showLoader, hideLoader]);

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

  useEffect(() => {
    if (!selectedInput) return;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: { deviceId: selectedInput } })
      .then((stream) => {
        streamRef.current = stream;
      })
      .catch((err) => console.error("Nie można pobrać streamu:", err));
  }, [selectedInput]);

  useEffect(() => {
    const el = audioRef.current;
    if (el && el.setSinkId) {
      el.setSinkId(selectedOutput).catch(console.warn);
    }
  }, [selectedOutput, started, currentIndex]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  if (error) return <div className="lr-error">Error: {error}</div>;
  if (!speechData?.items.length)
    return <div className="lr-no-data">Brak danych.</div>;

  const current = speechData.items[currentIndex];
  const hasNext = currentIndex < speechData.items.length - 1;

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

  const handleRecord = () => {
    const stream = streamRef.current;
    if (!stream) {
      console.error("Stream not ready");
      return;
    }

    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl);
        setRecordedUrl(null);
      }
      chunksRef.current = [];

      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
    }
  };

  const handleCheck = async () => {
    setIsPlaying(false);
    setIsRecording(false);
    
     if (chunksRef.current.length > 0) {
       const blob = new Blob(chunksRef.current, {
         type: "audio/webm",
       });
       const file = new File([blob], "recording.webm", {
         type: "audio/webm",
       });

       try {
         await getPronunciationData(
           speechData.lessonId,
           languageId,
           current.textId,
           file
         );
       } catch (e) {
         console.error("Błąd wysyłania audio:", pronError);
       }
     }

     if (recordedUrl) {
       URL.revokeObjectURL(recordedUrl);
       setRecordedUrl(null);
     }
     chunksRef.current = [];

     if (hasNext) {
       setCurrentIndex((i) => i + 1);
     }
  };

  const handleSkip = () => {
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
      setRecordedUrl(null);
    }
    chunksRef.current = [];
    if (hasNext) setCurrentIndex((i) => i + 1);
    setIsPlaying(false);
    setIsRecording(false);
  };

  const onEnded = () => setIsPlaying(false);

  return (
    <div className="lr-container">
      <button className="lr-back" onClick={() => navigate(-1)}>
        <FaArrowLeft size={16} />
        <span>Back</span>
      </button>

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
              <button
                className={`icon-button record ${
                  isRecording ? "recording" : ""
                }`}
                onClick={handleRecord}
              >
                {isRecording ? (
                  <FaMicrophoneSlash size={24} />
                ) : (
                  <FaMicrophone size={24} />
                )}
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

          {recordedUrl && (
            <div className="lr-user-recording">
              <audio controls src={recordedUrl}></audio>
            </div>
          )}

          <div className="lr-actions">
            <button
              className={`btn check ${isCheckDisabled ? "disabled" : ""}`}
              onClick={handleCheck}
              disabled={isCheckDisabled}
            >
              Check
            </button>
            <button className="btn skip" onClick={handleSkip}>
              Don't know
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

export default ListeningRepetitionLesson;