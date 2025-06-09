// src/pages/CasualConservationLesson.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import "../assets/styles/CasualConservationLesson.css";

const CasualConservationLesson = () => {
    const navigate = useNavigate();
    const { messages, sendMessage, error } = useChat();
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    // auto-scroll do dołu przy nowej wiadomości
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input.trim());
        setInput("");
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </button>
                <h2 className="chat-title">Chat with Bot</h2>
            </header>

            <div className="chat-window" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div key={i} className={`chat-message ${m.from}`}>
                        <div className="avatar">{m.from === "bot" ? "🤖" : "🙋‍♂️"}</div>
                        <div className="message-content">{m.content}</div>
                    </div>
                ))}
                {error && (
                    <div className="chat-error">
                        <small>{error}</small>
                    </div>
                )}
            </div>

            <form className="chat-input-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" disabled={!input.trim()}>
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
};

export default CasualConservationLesson;
