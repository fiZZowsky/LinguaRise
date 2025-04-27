import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import repeatingByEarImage from '../assets/images/repeating-from-hearing.png';
import writingFromHearing from '../assets/images/writing-by-ear.png';
import writing from '../assets/images/filling-gaps.png';
import casualConversation from '../assets/images/casual-conversation.png';
import '../assets/styles/CourseCategory.css';

const learningOptions = [
  {
    title: "Powtarzanie ze słuchu",
    image: repeatingByEarImage,
    description: "Słuchaj nagrań i powtarzaj, aby poprawić wymowę oraz rozumienie.",
  },
  {
    title: "Pisanie ze słuchu",
    image: writingFromHearing,
    description: "Słuchaj i zapisuj usłyszane słowa, trenując ortografię i słuch fonematyczny.",
  },
  {
    title: "Pisanie",
    image: writing,
    description: "Pisz samodzielnie zdania w języku, którego się uczysz.",
  },
  {
    title: "Swobodna konwersacja",
    image: casualConversation,
    description: "Rozmawiaj swobodnie z chatbotem, aby ćwiczyć naturalne dialogi.",
  },
];

const CourseCategory = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { langCode } = useParams();

  return (
    <div className="course-category-container">
      <h1 className="course-category-title">Wybierz w jaki sposób chcesz się uczyć</h1>
      <div className="learning-options-container">
        {learningOptions.map((option, index) => (
          <div
            key={index}
            className="learning-option-card"
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