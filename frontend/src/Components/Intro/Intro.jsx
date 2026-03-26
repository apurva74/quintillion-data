import React from "react";
import "./Intro.css";

function Intro({ onExploreTools }) {
  return (
    <section className="intro">
      <div className="intro-header">
        <h1>
          Welcome to <span className="highlight">Quintillion Data</span>
        </h1>
        <p className="tagline">
          Turning <strong>raw market data</strong> into{" "}
          <strong>predictive power</strong> — empowering you to{" "}
          <em>anticipate, act, and achieve.</em>
        </p>
      </div>

      <div className="intro-content">
        <p>
          In today’s fast-paced world, <strong>decisions can’t wait</strong>.
          Quintillion Data is your strategic intelligence partner, powered by{" "}
          <em>AI-driven forecasting</em>, real-time analytics, and deep market signals.
        </p>
        <p>
          Whether you’re a <strong>retail investor</strong>, a{" "}
          <strong>growing business</strong>, or an <strong>enterprise</strong>,
          our adaptive platform provides precision analytics and modular tools.
        </p>
        <p className="quote">
          “At Quintillion Data, we believe data is only as good as the decisions it enables.”
        </p>
      </div>

      <div className="intro-details">
        <div className="intro-card">
          <h3>📊 Predictive Market Intelligence</h3>
          <p>Proprietary models spot patterns and early signals.</p>
        </div>

        <div className="intro-card">
          <h3>📈 Live Data & Dashboards</h3>
          <p>Real-time insights in interactive dashboards.</p>
        </div>

        <div className="intro-card">
          <h3>🔧 Tailored Analytics</h3>
          <p>From stock screening to enterprise pipelines.</p>
        </div>

        <div className="intro-card">
          <h3>✅ Proven Accuracy</h3>
          <p>Models trusted for benchmark performance.</p>
        </div>
      </div>

      <div className="intro-footer">
        <button className="cta-btn secondary" onClick={onExploreTools}>
          Explore Tools
        </button>
      </div>
    </section>
  );
}

export default Intro;
