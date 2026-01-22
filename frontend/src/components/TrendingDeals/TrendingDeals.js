import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti'; // Import the library
import './TrendingDeals.css';

// Import images
import laptopImg from '../../assets/laptop.jpg';
import coffeeImg from '../../assets/coffee.jpg';
import shoeImg from '../../assets/shoe.jpg';
import bookImg from '../../assets/book.jpg';

const dealsData = [
  { id: 1, title: "MacBook Air M2", discount: "15% OFF", category: "Tech", img: laptopImg, code: "MAC15STUDENT", location: "Apple Store" },
  { id: 2, title: "Starbucks Coffee", discount: "Buy 1 Get 1", category: "Food", img: coffeeImg, code: "CAFE24", location: "Campus Cafe" },
  { id: 3, title: "Nike Air Jordan", discount: "20% Cashback", category: "Fashion", img: shoeImg, code: "NIKEU20", location: "Sports Mall" },
  { id: 4, title: "Calculus Vol. 2", discount: "40% OFF", category: "Books", img: bookImg, code: "BOOKWORM40", location: "Uni Bookstore" },
];

const TrendingDeals = () => {
  const [flippedId, setFlippedId] = useState(null);
  const [copiedId, setCopiedId] = useState(null); // Track which card was copied

  const handleFlip = (id) => {
    if (flippedId === id) {
      setFlippedId(null); // Close if clicking same card
      setCopiedId(null);  // Reset copy state
    } else {
      setFlippedId(id);
    }
  };

  // --- CONFETTI & COPY LOGIC ---
  const handleCopyCode = (e, code, id) => {
    e.stopPropagation(); // Prevent card from flipping back when clicking button
    
    // 1. Trigger Confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'] // Your theme colors
    });

    // 2. Copy to Clipboard
    navigator.clipboard.writeText(code);

    // 3. Update Button Text State
    setCopiedId(id);
    
    // Reset button text after 3 seconds
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <section id="trending" className="deals-section">
      <h2 className="section-title">🔥 Trending Deals</h2>
      <div className="deals-grid">
        {dealsData.map((deal) => (
          <div 
            key={deal.id} 
            className={`flip-card-container ${flippedId === deal.id ? 'flipped' : ''}`}
            onClick={() => handleFlip(deal.id)}
          >
            <div className="flip-card-inner">
              
              {/* FRONT */}
              <div className="flip-card-front">
                <div className="deal-image-container">
                  <img src={deal.img} alt={deal.title} />
                  <span className="category-tag">{deal.category}</span>
                </div>
                <div className="deal-info">
                  <h3>{deal.title}</h3>
                  <p className="deal-location">📍 {deal.location}</p>
                  <div className="deal-footer">
                    <span className="price-tag">{deal.discount}</span>
                    <span className="click-hint">Click to Reveal ↻</span>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div className="flip-card-back">
                <h3>Congrats! 🎉</h3>
                <p>Use this code at checkout:</p>
                <div className="code-box">{deal.code}</div>
                
                <button 
                  className={`btn-copy ${copiedId === deal.id ? 'success' : ''}`}
                  onClick={(e) => handleCopyCode(e, deal.code, deal.id)}
                >
                  {copiedId === deal.id ? 'Copied! ✅' : 'Copy Code 📋'}
                </button>

                <p className="flip-back-hint">Click outside button to flip back</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingDeals;