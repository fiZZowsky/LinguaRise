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
  const t = useTranslations(selectedLang, 'AboutPage');

  const features = [
    {
      image: listeningImg,
      title: t.FeatureListeningTitle || 'Słuchanie i powtarzanie',
      desc:
        t.FeatureListeningDesc ||
        'Doskonal wymowę, powtarzając nagrania i porównując je ze swoim głosem.'
    },
    {
      image: writingByEarImg,
      title: t.FeatureWritingByEarTitle || 'Pisanie ze słuchu',
      desc:
        t.FeatureWritingByEarDesc ||
        'Ćwicz poprawną pisownię, zapisując usłyszane zdania.'
    },
    {
      image: fillGapsImg,
      title: t.FeatureFillGapsTitle || 'Uzupełnianie luk',
      desc:
        t.FeatureFillGapsDesc ||
        'Sprawdzaj znajomość słówek wypełniając brakujące fragmenty zdań.'
    },
    {
      image: conversationImg,
      title: t.FeatureConversationTitle || 'Rozmowy z chatbotem',
      desc:
        t.FeatureConversationDesc ||
        'Prowadź swobodne konwersacje dostosowane do Twojego poziomu.'
    },
    {
      image: homeImg,
      title: t.FeatureProgressTitle || 'Śledzenie postępów',
      desc:
        t.FeatureProgressDesc ||
        'Aplikacja zapamiętuje Twoje osiągnięcia, dzięki czemu możesz łatwo kontynuować naukę.'
    }
  ];

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1 id="AboutTitle">{t.AboutTitle || 'O aplikacji LinguaRise'}</h1>
        <p id="AboutSubtitle">
          {t.AboutSubtitle ||
            'LinguaRise pomaga w nauce języków obcych wykorzystując nowoczesne technologie Azure.'}
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