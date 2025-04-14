import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";
import Logo from "../assets/images/Logo.png";

export default function Navbar() {
    let activeLink = window.location.pathname;

  return (
    <nav className="nav">
      <div className="logo">
          <Link to="/">
              <img src={Logo}  width="300"/>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link className={activeLink === '/home' ? 'nav-link-active': ''} to="/home">Home</Link></li>
        <li><Link className={activeLink === '/courses' ? 'nav-link-active': ''} to="/courses">Courses</Link></li>
        <li><Link className={activeLink === '/about' ? 'nav-link-active': ''} to="/about">About</Link></li>
        <li><Link className={activeLink === '/faq' ? 'nav-link-active': ''} to="/faq">FAQ</Link></li>
      </ul>
      <div className="nav-right">
        <button className="login-btn">
          <Link to="/login-register">Login/Register</Link>
        </button>
      </div>
    </nav>
  );
}
