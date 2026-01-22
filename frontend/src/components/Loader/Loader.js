import React from 'react';
import './Loader.css';

const Loader = () => {
  // Create 15 pairs of dots for the helix
  const dots = [...Array(15)].map((_, i) => i);

  return (
    <div className="loader-container">
      <div className="dna-helix">
        {dots.map((i) => (
          <div key={i} className="strand-pair" style={{ '--i': i }}>
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
          </div>
        ))}
      </div>
      <h3 className="loading-text">INITIALIZING...</h3>
    </div>
  );
};

export default Loader;