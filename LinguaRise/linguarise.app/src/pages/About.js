import React from 'react';
import '../assets/styles/About.css';
import { useLanguage } from '../context/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';
import listeningImg from '../assets/images/repeating-from-hearing.png';
import writingByEarImg from '../assets/images/writing-by-ear.png';
import fillGapsImg from '../assets/images/filling-gaps.png';
import conversationImg from '../assets/images/casual-conversation.png';
import homeImg from '../assets/images/home-page-bg1.png';

export default function About() {
  const { language: selectedLang } = useLanguage();
  const translations = useTranslations(selectedLang, 'About');

  const features = [
    {
      image: listeningImg,
      title: translations.ListeningAndRepeating || 'Listening and repeating',
      desc:
        translations.ImproveYourPronunciationByRepeatingRecordingsAndComparingThemToYourVoice ||
        'Improve your pronunciation by repeating recordings and comparing them to your voice.'
    },
    {
      image: writingByEarImg,
      title: translations.WritingByEar || 'Writing by ear',
      desc:
        translations.PracticeSpellingCorrectlyByWritingDownTheSentencesYouHear ||
        'Practice spelling correctly by writing down the sentences you hear.'
    },
    {
      image: fillGapsImg,
      title: translations.Writing || 'Writing',
      desc:
        translations.CheckYourKnowledgeOfWords ||
        'Check your knowledge of words.'
    },
    {
      image: conversationImg,
      title: translations.ConversationsWithAChatbot || 'Conversations with a chatbot',
      desc:
          translations.ConductCasualConversationsAdaptedToYourLevel ||
        'Conduct casual conversations adapted to your level.'
    },
    {
      image: homeImg,
      title: translations.TrackYourProgress || 'Track your progress',
      desc:
        translations.TheAppRemembersYourAchievementsSoYouCanEasilyContinueLearning ||
        'The app remembers your achievements so you can easily continue learning.'
    }
  ];

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1 id="AboutTitle">{translations.AboutAppLinguaRise || 'About App LinguaRise'}</h1>
        <p id="AboutSubtitle">
          {translations.LinguaRiseHelpsYouLearnForeignLanguagesUsingModernAzureTechnologies ||
            'LinguaRise helps you learn foreign languages ​​using modern Azure technologies.'}
        </p>
      </section>

      <section className="features-grid">
        {features.map((f, idx) => (
          <div key={idx} className="feature-card">
            <img src={f.image} alt={f.title} className="feature-image" />
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}