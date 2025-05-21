import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaMicrophone, FaStop, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useLesson } from "../hooks/useLesson";
import { useLoading } from "../context/LoadingContext";

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

  // fetch lesson sentence once
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

  // enumerate audio devices
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

  // apply selected output sink
  useEffect(() => {
    if (audioRef.current && typeof audioRef.current.setSinkId === 'function') {
      audioRef.current.setSinkId(selectedOutput).catch(console.warn);
    }
  }, [selectedOutput, started, currentIndex]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!speechData || !speechData.items.length) return <div>Brak danych do wyświetlenia.</div>;

  const handleStart = () => setStarted(true);
  const toggleRecord = () => setIsRecording(r => !r);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < speechData.items.length - 1;

  const playPrev = () => {
    if (!hasPrev) return;
    setCurrentIndex(i => i - 1);
  };
  const playNext = () => {
    if (!hasNext) return;
    setCurrentIndex(i => i + 1);
  };

  const currentItem = speechData.items[currentIndex];
  const audioSrc = `data:audio/mp3;base64,${currentItem.audioBase64}`;

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      {!started ? (
        <div className="space-y-4 text-center">
          <div className="flex space-x-4 justify-center">
            <div>
              <label className="block mb-1">Urządzenie do odtwarzania:</label>
              <select
                className="border rounded p-2"
                value={selectedOutput}
                onChange={e => setSelectedOutput(e.target.value)}
              >
                {audioOutputs.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || device.deviceId}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Urządzenie do nagrywania:</label>
              <select
                className="border rounded p-2"
                value={selectedInput}
                onChange={e => setSelectedInput(e.target.value)}
              >
                {audioInputs.map(device => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.label || device.deviceId}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleStart}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Zaczynamy!
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          <button
            onClick={toggleRecord}
            className="p-6 bg-red-500 rounded-full hover:bg-red-600 transition inline-flex items-center justify-center"
          >
            {isRecording ? <FaStop size={48} /> : <FaMicrophone size={48} />}
          </button>
          <div className="flex items-center space-x-4">
            {hasPrev && (
              <button onClick={playPrev} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                <FaArrowLeft size={24} />
              </button>
            )}
            <audio controls ref={audioRef} src={audioSrc} />
            {hasNext && (
              <button onClick={playNext} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition">
                <FaArrowRight size={24} />
              </button>
            )}
          </div>
          <div className="text-sm text-gray-600">{currentItem.text}</div>
        </div>
      )}
    </div>
  );
};

export default ListeningRepetitionLesson;
