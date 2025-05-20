import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useLesson } from "../hooks/useLesson";

const ListeningRepetitionLesson = () => {
  const { langId } = useParams();
  const languageId = Number(langId);

  const { getLessonSentence, speechData, error } = useLesson();

  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const hasFetchedRef = useRef(false);

  const [audioInputs, setAudioInputs] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedOutput, setSelectedOutput] = useState("");

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    (async () => {
      try {
        await getLessonSentence(1, languageId);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingLocal(false);
      }
    })();
  }, [languageId]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => navigator.mediaDevices.enumerateDevices())
      .then(devices => {
        const inputs = devices.filter(d => d.kind === "audioinput");
        const outputs = devices.filter(d => d.kind === "audiooutput");
        setAudioInputs(inputs);
        setAudioOutputs(outputs);
        if (inputs[0]) setSelectedInput(inputs[0].deviceId);
        if (outputs[0]) setSelectedOutput(outputs[0].deviceId);
      })
      .catch(err => {
        console.error("Nie udało się pobrać urządzeń audio:", err);
      });
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  if (isLoadingLocal) {
    return <div>Ładowanie…</div>;
  }
  if (!speechData) {
    return <div>Brak danych do wyświetlenia.</div>;
  }

  return (
    <div className="listening-repetition-lesson">
      <h2>Lesson #{speechData.lessonId}</h2>

      <div className="device-selectors">
        <div className="selector">
          <label>
            Urządzenie do odtwarzania:
            <select
              value={selectedOutput}
              onChange={e => setSelectedOutput(e.target.value)}
            >
              {audioOutputs.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || device.deviceId}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="selector">
          <label>
            Urządzenie do nagrywania:
            <select
              value={selectedInput}
              onChange={e => setSelectedInput(e.target.value)}
            >
              {audioInputs.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || device.deviceId}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <ul className="sentences-list">
        {speechData.items.map(item => (
          <li key={item.textId} className="sentence-item">
            <p>{item.text}</p>
            <audio
              controls
              src={`data:audio/mp3;base64,${item.audioBase64}`}
              ref={el => {
                if (el && typeof el.setSinkId === "function") {
                  el.setSinkId(selectedOutput).catch(console.warn);
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListeningRepetitionLesson;
