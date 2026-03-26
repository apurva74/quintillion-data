import React, { useState, useRef } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Intro from "./Components/Intro/Intro";
import Register from "./Components/Register/Register";
import PredictiveTools from "./Components/PREDICTIVE TOOLS/PredictiveTools";

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const contactRef = useRef(null); // 👈 for Contact scroll

  const resetViews = () => {
    setShowIntro(false);
    setShowRegister(false);
    setShowTools(false);
  };

  const handleLearnMore = () => {
    resetViews();
    setShowIntro(true);
  };

  const handleRegisterClick = () => {
    resetViews();
    setShowRegister(true);
  };

  const handleToolsClick = () => {
    resetViews();
    setShowTools(true);
  };

  const handleHomeClick = () => {
    resetViews();
  };

  const handleContactClick = () => {
    resetViews();
    setTimeout(() => {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="App">
      <Navbar
        onRegisterClick={handleRegisterClick}
        onHomeClick={handleHomeClick}
        onToolsClick={handleToolsClick}
        onContactClick={handleContactClick} // 👈 NEW
      />

      {/* Hero Section */}
      {!showIntro && !showRegister && !showTools && (
        <section className="hero">
          <div className="hero-text">
            <h1>How to win on the stock market?</h1>
            <p>
              Increase your earnings with predictive tools. Learn, analyze, and
              trade with confidence.
            </p>
            <button className="hero-btn" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>

          <div className="hero-cards">
            <div className="card chart-card">
              <h3>📈 Market Trends</h3>
              <div className="mini-chart"></div>
            </div>
            <div className="card stats-card">
              <h3>📊 Profit Analysis</h3>
              <p className="highlight">+12.7% Growth</p>
            </div>
            <div className="card widget-card">
              <h3>⚡ Live Signals</h3>
              <p className="highlight">Active</p>
            </div>
          </div>
        </section>
      )}

      {/* Pages */}
      {showIntro && <Intro onExploreTools={handleToolsClick} />}
      {showRegister && <Register />}
      {showTools && (
        <PredictiveTools onAuthRequired={handleRegisterClick} />
      )}

      {/* Feedback + Contact */}
      {!showIntro && !showRegister && !showTools && (
        <section className="feedback-section" ref={contactRef}>
          <h1>💡 Suggestions & Feedback</h1>
          <p>Share your ideas to improve Quintillion Data</p>

          <form className="feedback-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Enter your feedback..." required></textarea>
            <button type="submit">Submit Feedback</button>
          </form>

          {/* Contact Info */}
          <div className="contact-section">
            <h2>📞 Contact Us</h2>
            <p>Email: support@quintilliondata.com</p>
            <p>Phone: +91 99356995333</p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Quintillion Data. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
