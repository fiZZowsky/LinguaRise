import React from "react";
import "../assets/styles/Home.css";
import homePageImage from "../assets/images/home-page-bg1.png";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-text">
        <h1>
          Learn a language <br /> with LinguaRise
        </h1>
        <h3>
          Take your language skills to the next level
        </h3>
      </div>
      <div className="home-image-wrapper">
        <img src={homePageImage} alt="LinguaRise Background" className="home-image" />
      </div>
    </div>
  );
}
