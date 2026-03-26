import React from "react";
import "./PredictiveTools.css";

const tools = [
  {
    title: "QuantPeek",
    desc: "Advanced quantitative analysis with professional-grade indicators.",
    features: ["RSI", "MACD", "Bollinger Bands", "Volume Spike Detection"],
    btn: "Explore QuantPeek",
  },
  {
    title: "Professional Trading Intelligence",
    desc: "Institutional-level insights powered by AI-driven market signals.",
    features: ["Trend Forecasting", "Market Strength", "Smart Alerts"],
    btn: "Start Market Analysis",
  },
];

const PredictiveTools = ({ onAuthRequired }) => {
  return (
    <section className="tools-section">
      <h2 className="tools-title">Predictive Tools</h2>
      <p className="tools-subtitle">
        Turn data into decisions with AI-powered analytics
      </p>

      <div className="tools-grid">
        {tools.map((tool, i) => (
          <div className="tool-card" key={i}>
            <h3>{tool.title}</h3>
            <p>{tool.desc}</p>

            <ul>
              {tool.features.map((f, idx) => (
                <li key={idx}>✓ {f}</li>
              ))}
            </ul>

            <button onClick={onAuthRequired}>
              {tool.btn}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PredictiveTools;
