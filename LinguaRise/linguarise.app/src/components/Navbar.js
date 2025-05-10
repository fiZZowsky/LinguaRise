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
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

export default function Navbar() {
  const activeLink = window.location.pathname;
  const { languages } = useLanguages();
  const { language: selectedLang, setLanguage: setSelectedLang } = useLanguage();
  const translations = useTranslations(selectedLang, 'Navbar');
  const isAuthenticated = useIsAuthenticated();

 const { accounts } = useMsal();
 const account = accounts[0];
 let initials = "";
 if (account?.name) {
   const parts = account.name.split(" ");
   initials = parts[0]?.[0]?.toUpperCase() + (parts[1]?.[0]?.toUpperCase() || "");
 }

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
          <LoginButton label={translations.LogIn || 'Log in'} />
        ) : (
          <>
            <Link to="/profile" className="profile-btn">
                <span>{initials}</span>
            </Link>
            <LogoutButton label={translations.LogOut || 'Log out'}/>
          </>
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
