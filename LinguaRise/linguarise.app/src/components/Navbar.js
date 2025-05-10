import React from "react";
import { Link } from "react-router-dom";
import { useLanguages } from "../hooks/useLanguages";
import "../assets/styles/Navbar.css";
import Logo from "../assets/images/Logo.png";
import LanguageDropdown from "./LanguageDropdown";
import { useLanguage } from "../context/LanguageContext";
import { useTranslations } from "../hooks/useTranslations";
import LoginButton from './LoginButton';
import LogoutButton from "./LogoutButton";
import { useIsAuthenticated } from "@azure/msal-react";
import { MdPerson } from "react-icons/md";

export default function Navbar() {
  const activeLink = window.location.pathname;
  const { languages } = useLanguages();
  const { language: selectedLang, setLanguage: setSelectedLang } = useLanguage();
  const translations = useTranslations(selectedLang, 'Navbar');
  const isAuthenticated = useIsAuthenticated();

  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">
          <img src={Logo} width="300" alt="Logo" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link id="Home" className={activeLink === '/home' ? 'nav-link-active' : ''} to="/home">{translations.Home || 'Home'}</Link></li>
        <li><Link id="Courses" className={activeLink === '/courses' ? 'nav-link-active' : ''} to="/courses">{translations.Courses || 'Courses'}</Link></li>
        <li><Link id="About" className={activeLink === '/about' ? 'nav-link-active' : ''} to="/about">{translations.About || 'About'}</Link></li>
        <li><Link id="FAQ" className={activeLink === '/faq' ? 'nav-link-active' : ''} to="/faq">{translations.FAQ || 'FAQ'}</Link></li>
      </ul>

      <div className="nav-right">
        {!isAuthenticated ? (
          <LoginButton />
        ) : (
          <Link id="Profile" to="/profile" className="profile-btn">
            <MdPerson className="profile-icon" />
            <span className="profile-name">{user.displayName}</span>
          </Link>
          <LogoutButton />
        )}
        <LanguageDropdown
          languages={languages}
          selectedLang={selectedLang}
          onChange={setSelectedLang}
        />
      </div>
    </nav>
  );
}
