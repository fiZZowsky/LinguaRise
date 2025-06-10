import { useState, useRef } from "react";
import api from "../services/Api";
import { useLoading } from "../context/LoadingContext";

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const { showLoader, hideLoader } = useLoading();
    const isFirst = useRef(true);

    const sendMessage = async (text, languageId, selectedLang) => {
        if (!text) return;

        // dodaj wiadomość od użytkownika
        setMessages((msgs) => [...msgs, { from: "user", content: text }]);
        setError(null);
        showLoader();
        try {
            const res = await api.post("chat/ask", { prompt: text, languageId: languageId, languageCode: selectedLang });
            setMessages((msgs) => [...msgs, { from: "bot", content: res.response }]);
        } catch (err) {
            setError(err.message || "Coś poszło nie tak przy wysyłaniu wiadomości");
        } finally {
            hideLoader();
            isFirst.current = false;
        }
    };

    return {
        messages,
        sendMessage,
        error,
    };
};
