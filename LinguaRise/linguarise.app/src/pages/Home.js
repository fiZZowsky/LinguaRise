import React from "react";
import "../assets/styles/Home.css";
import homePageImage from "../assets/images/home-page-bg1.png";
import { useTranslations } from "../hooks/useTranslations";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { language: selectedLang } = useLanguage();
  const translations = useTranslations(selectedLang, 'HomePage');

  return (
    <div className="home-page">
      <div className="home-text">
      <h1>{translations.LearnALanguageWithLinguaRise || "Learn a language with LinguaRise"}</h1>
        <h3>{translations.TakeYourLanguageSkillsToNextLevel || "Take your language skills to the next level"}</h3>
      </div>
      <div className="home-image-wrapper">
        <img src={homePageImage} alt="LinguaRise Background" className="home-image" />
      </div>
    </div>
  );
}
