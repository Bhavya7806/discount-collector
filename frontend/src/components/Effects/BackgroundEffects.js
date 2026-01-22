import React from 'react';
import './BackgroundEffects.css';

const BackgroundEffects = () => {
  // Create an array of 30 particles with random properties
  const particles = [...Array(30)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,        // Random horizontal position
    delay: `${Math.random() * 5}s`,         // Random start time
    duration: `${10 + Math.random() * 10}s` // Random speed (10-20s)
  }));

  return (
    <div className="effects-container">
      {/* 1. The Neon Grid */}
      <div className="neon-grid"></div>
      
      {/* 2. The Particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <div 
            key={p.id} 
            className="particle"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          ></div>
        ))}
      </div>
      
      {/* 3. A subtle gradient overlay to prevent it from looking "flat" */}
      <div className="hero-gradient-overlay"></div>
    </div>
  );
};

export default BackgroundEffects;