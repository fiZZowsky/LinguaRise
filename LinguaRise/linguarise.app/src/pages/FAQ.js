import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/FAQ.css";
import { useTranslations } from "../hooks/useTranslations";
import { useLanguage } from "../context/LanguageContext";

const faqs = [
    {
        question: "How do I change the app’s language?",
        answer:
            "Click the language selector in the top-right corner of the screen and choose your preferred language from the dropdown.",
        translateId: "One",
    },
    {
        question: "How do I select a learning mode?",
        answer:
            "Navigate to the “Courses” tab, then pick the language you want to learn. The system will load the corresponding lessons and exercises.",
        translateId: "Two",
    },
    {
        question: "How do I use the chat feature?",
        answer:
            "Within the “Courses” section, after selecting your language, click on the “Chat” option (usually the last item). Type your message in the input at the bottom and press Enter – you should see a reply appear shortly.",
        translateId: "Three",
    },
    {
        question: "How can I view my current account details?",
        answer:
            "On the top toolbar, next to the account button, click your initials. A panel will slide out showing your first name, last name, and the email address you’re logged in with.",
        translateId: "Four",
    },
];

const FAQ = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const contentRefs = useRef([]);
    const { language: selectedLang } = useLanguage();
    // Zakładam, że namespace 'CasualConversationLesson' zawiera klucze:
    //   faqQuestionOne, faqAnswerOne, faqQuestionTwo, faqAnswerTwo, itd.
    const translations = useTranslations(selectedLang, 'FAQ');

    const toggleFAQ = (idx) =>
        setExpandedIndex(expandedIndex === idx ? null : idx);

    useEffect(() => {
        faqs.forEach((_, idx) => {
            const el = contentRefs.current[idx];
            if (!el) return;
            el.style.maxHeight =
                expandedIndex === idx ? el.scrollHeight + "px" : "0";
        });
    }, [expandedIndex]);

    return (
        <div className="faq-container">
            <h1>{translations.faqHeader || "Frequently Asked Questions"}</h1>
            {faqs.map((faq, idx) => {
                const qKey = `faqQuestion${faq.translateId}`;
                const aKey = `faqAnswer${faq.translateId}`;
                return (
                    <div
                        key={faq.translateId}
                        className={`faq-item ${
                            expandedIndex === idx ? "expanded" : ""
                        }`}
                    >
                        <div className="faq-question" onClick={() => toggleFAQ(idx)}>
                            {translations[qKey] || faq.question}
                            <span className="arrow">▼</span>
                        </div>
                        <div
                            className="faq-answer"
                            ref={(el) => (contentRefs.current[idx] = el)}
                        >
                            <div className="faq-answer-content">{translations[aKey] || faq.answer}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default FAQ;
