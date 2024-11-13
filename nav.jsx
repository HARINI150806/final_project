// Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <ul className="nav-list">
      <li className="nav-item">
        <a href="#features" className="nav-link">Features</a>
      </li>
      <li className="nav-item">
        <a href="#about" className="nav-link">About Us</a>
      </li>
      <li className="nav-item">
        <a href="#contact" className="nav-link">Contact Us</a>
      </li>
      <li className="nav-item">
        <a href="#home" className="nav-link">Home</a>
      </li>
      <li className="nav-item">
        <button className="nav-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Login / Signup
        </button>
      </li>
    </ul>
  </nav>
);

export default Navbar;
