import React from "react";
import "./Navbar.css";

const Navbar = ({
  onRegisterClick,
  onHomeClick,
  onToolsClick,
  onContactClick,
}) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={onHomeClick}>
        QD<span></span>
      </div>

      <ul className="navbar-links">
        <li onClick={onHomeClick}>Home</li>
        <li>Features</li>
        <li>Market News</li>
        <li onClick={onToolsClick}>Predictive Tools</li>
        <li onClick={onContactClick}>Contact</li> {/* 👈 HERE */}
      </ul>

      <div className="navbar-buttons">
        <button className="navbar-btn" onClick={onRegisterClick}>
          Login/Register
        </button>

        <button className="navbar-btn" onClick={onHomeClick}>
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
