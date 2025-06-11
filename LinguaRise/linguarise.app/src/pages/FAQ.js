import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/FAQ.css";
import { useTranslations } from "../hooks/useTranslations";
import { useLanguage } from "../context/LanguageContext";

const FAQ = () => {
    const { language: selectedLang } = useLanguage();
    const translations = useTranslations(selectedLang, "FAQ");
    console.log(translations);

    const faqs = [
        {
            translateId: "One",
            question: translations.faqQuestionOne || "How do I change the app’s language?",
            answer: translations.faqAnswerOne ||
                "Click the language selector in the top-right corner of the screen and choose your preferred language from the dropdown."
        },
        {
            translateId: "Two",
            question: translations.faqQuestionTwo || "How do I select a learning mode?",
            answer: translations.faqAnswerTwo ||
                "Navigate to the \"Courses\" tab, then pick the language you want to learn. The system will load the corresponding lessons and exercises."
        },
        {
            translateId: "Three",
            question: translations.faqQuestionThree || "How do I use the chat feature?",
            answer: translations.faqAnswerThree ||
                "Within the \"Courses\" section, after selecting your language, click on the \"Chat\" option (usually the last item). Type your message in the input at the bottom and press Enter – you should see a reply appear shortly."
        },
        {
            translateId: "Four",
            question: translations.faqQuestionFour || "How can I view my current account details?",
            answer: translations.faqAnswerFour ||
                "On the top toolbar, next to the account button, click your initials. A panel will slide out showing your first name, last name, and the email address you’re logged in with."
        }
    ];

    const [expandedIndex, setExpandedIndex] = useState(null);
    const contentRefs = useRef([]);

    const toggleFAQ = (idx) => {
        setExpandedIndex(expandedIndex === idx ? null : idx);
    };

    useEffect(() => {
        contentRefs.current.forEach((el, idx) => {
            if (el) {
                el.style.maxHeight =
                    expandedIndex === idx ? `${el.scrollHeight}px` : "0";
            }
        });
    }, [expandedIndex]);

    return (
        <div className="faq-container">
            <h1>{translations.faqHeader || "Frequently Asked Questions"}</h1>
            {faqs.map((faq, idx) => (
                <div
                    key={faq.translateId}
                    className={`faq-item ${expandedIndex === idx ? "expanded" : ""}`}
                >
                    <div className="faq-question" onClick={() => toggleFAQ(idx)}>
                        {faq.question}
                        <span className="arrow">▼</span>
                    </div>
                    <div
                        className="faq-answer"
                        ref={(el) => (contentRefs.current[idx] = el)}
                    >
                        <div className="faq-answer-content">{faq.answer}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
