import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">
          <span className="logo-text">LinguaRise</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      </ul>
      <div className="nav-right">
        <button className="login-btn">
          <Link to="/login-register">Login/Register</Link>
        </button>
      </div>
    </nav>
  );
}
