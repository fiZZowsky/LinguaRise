import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import repeatingByEarImage from '../assets/images/repeating-from-hearing.png';
import writingFromHearing from '../assets/images/writing-by-ear.png';
import writing from '../assets/images/filling-gaps.png';
import casualConversation from '../assets/images/casual-conversation.png';
import '../assets/styles/CourseCategory.css';
import { useTranslations } from "../hooks/useTranslations";
import { useLanguage } from "../context/LanguageContext";

const CourseCategory = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { langId } = useParams();
  const { language: selectedLang } = useLanguage();
  const translations = useTranslations(selectedLang, 'CourseCategory');
  const navigate = useNavigate();

  const learningOptions = [
    {
      title: translations.ListeningRepetition || "Listening repetition",
      image: repeatingByEarImage,
      description: translations.ListenRecordingsAndRepeat || "Listen recordings and repeat to improve your pronunciation and comprehension.",
      route: `/courses/${langId}/listening-repetition`,
    },
    {
      title: translations.WritingByEar || "Writing by ear",
      image: writingFromHearing,
      description: translations.ListenAndWriteDownTheWordsYouHear || "Listen and write down the words you hear, training your spelling and phonemic hearing.",
      route: `/courses/${langId}/writing-by-ear`,
    },
    {
      title: translations.Writing || "Writing",
      image: writing,
      description: translations.WriteWordsAndSentences || "Write your own words and sentences in the language you are learning.",
      route: `/courses/${langId}/writing`,
    },
    {
      title: translations.CasualConversation || "Casual conversation",
      image: casualConversation,
      description: translations.SpeakFreely || "Speak freely with the chatbot to practice natural dialogues.",
      route: `/courses/${langId}/casual-conversation`,
    },
  ];

  return (
    <div className="course-category-container">
      <h1 className="course-category-title">
        {translations.ChooseLearningMethod || "Choose how you want to learn"}
      </h1>
      <div className="learning-options-container">
        {learningOptions.map((option, index) => (
          <div
             key={index}
             className="learning-option-card"
             style={{ cursor: option.route ? 'pointer' : 'default' }}
             onClick={() => option.route && navigate(option.route)}
          >
            <img
              src={option.image}
              alt={option.title}
              className="learning-option-image"
            />
            <div
              className="chevron-container"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <FaChevronDown className="chevron-icon" />
            </div>
            {hoveredIndex === index && (
              <div className="option-description">
                {option.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCategory;
