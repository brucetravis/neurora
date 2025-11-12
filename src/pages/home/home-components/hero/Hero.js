// Hero.jsx
import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Revolutionize Your Business with AI-Integrated Software</h1>
        <p>
          Discover how AI-powered solutions can streamline your workflows, 
          enhance decision-making, and unlock new opportunities. 
          Neurora combines intelligent automation with cutting-edge technology 
          to bring efficiency and innovation to your fingertips.
        </p>
      </div>
      <div className="hero-image">
        {/* Optional: Illustration or image representing AI */}
      </div>
    </section>
  );
}
