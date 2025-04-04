import React from "react";
import CustomLink from './CustomLink';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
    <nav className = "nav">
        <Link to = "/" className="site-title">
            Site name
        </Link>
        <ul>
            <CustomLink to="/home">Home</CustomLink>
            <CustomLink to="/courses">Courses</CustomLink>
            <CustomLink to="/about">About</CustomLink>
            <CustomLink to="/faq">FAQ</CustomLink>
            <CustomLink to="/login-register">Login/Register</CustomLink>
        </ul>
        </nav>
    )
}