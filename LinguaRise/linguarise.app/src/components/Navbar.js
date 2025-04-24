import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguages } from "../hooks/useLanguages";
import "../assets/styles/Navbar.css";
import Logo from "../assets/images/Logo.png";
import LanguageDropdown from "./LanguageDropdown";

// Pomocnicze funkcje do obsługi ciasteczek
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export default function Navbar() {
  let activeLink = window.location.pathname;
  const { languages } = useLanguages();

  const [selectedLang, setSelectedLang] = useState(() => {
    const savedLang = getCookie("userLang");
    return savedLang || "EN";
  });

  useEffect(() => {
    setCookie("userLang", selectedLang);
    // tu w przyszłości aktualizacja kontekstu użytkownika
  }, [selectedLang]);

  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">
          <img src={Logo} width="300" alt="Logo" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link className={activeLink === '/home' ? 'nav-link-active' : ''} to="/home">Home</Link></li>
        <li><Link className={activeLink === '/courses' ? 'nav-link-active' : ''} to="/courses">Courses</Link></li>
        <li><Link className={activeLink === '/about' ? 'nav-link-active' : ''} to="/about">About</Link></li>
        <li><Link className={activeLink === '/faq' ? 'nav-link-active' : ''} to="/faq">FAQ</Link></li>
      </ul>

      <div className="nav-right">
        <button className="login-btn">
          <Link to="/login-register">Login/Register</Link>
        </button>
        <LanguageDropdown
          languages={languages}
          selectedLang={selectedLang}
          onChange={setSelectedLang}
        />
      </div>
    </nav>
  );
}
