import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/Navbar.css";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">
          <span className="logo-text">LinguaRise</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        {isAuthenticated && <li><Link to="/courses">Courses</Link></li>}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
      </ul>
      <div className="nav-right">
        {isAuthenticated ? (
          <button className="login-btn" onClick={logout}>
            Wyloguj
          </button>
        ) : (
          <button className="login-btn">
            <Link to="/login-register">Login/Register</Link>
          </button>
        )}
      </div>
    </nav>
  );
}