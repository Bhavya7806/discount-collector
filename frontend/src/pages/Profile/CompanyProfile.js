import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaTag, FaMapMarkerAlt, FaChartLine, FaShareAlt, FaBell } from 'react-icons/fa';
import './Profile.css';

const CompanyProfile = ({ user }) => {
  return (
    <div className="company-profile-container">
      {/* HEADER */}
      <motion.div 
        className="company-header-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-top">
          <div className="company-logo-large">🏪</div>
          <div>
            <h1>Amazon - Student Deals</h1>
            <div className="company-rating">
              <span className="stars">⭐⭐⭐⭐</span> (4.2/5 • 2.4k reviews)
            </div>
          </div>
        </div>
        
        <div className="header-meta">
          <span><FaTag /> Technology</span>
          <span><FaMapMarkerAlt /> Online</span>
          <span className="highlight">💰 Various Discounts</span>
        </div>
      </motion.div>

      <div className="company-grid-layout">
        
        {/* LEFT COLUMN (Deals & Stats) */}
        <div className="left-col">
          <motion.div 
            className="content-section"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>ACTIVE DEALS (8)</h3>
            <div className="active-deals-list">
              {[
                { title: "Prime Student 50% off", rating: "⭐⭐⭐⭐" },
                { title: "Textbook Rental Discount", rating: "⭐⭐⭐✨" },
                { title: "Prime Video Student", rating: "⭐⭐⭐⭐" }
              ].map((deal, i) => (
                <div key={i} className="active-deal-item">
                  <span>{deal.title}</span>
                  <span className="deal-stars">{deal.rating}</span>
                </div>
              ))}
              <button className="btn-view-all-text">View All 8 Deals</button>
            </div>
          </motion.div>

          <motion.div 
            className="content-section"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
             <h3>📊 DEAL STATISTICS</h3>
             <ul className="stats-list">
               <li><FaChartLine /> <strong>89%</strong> Success Rate</li>
               <li><FaTag /> <strong>2.4k</strong> Total Saves</li>
               <li><FaStar /> <strong>128</strong> Verified Redeems</li>
             </ul>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (Info & Reviews) */}
        <div className="right-col">
          <motion.div 
            className="content-section"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>📝 STORE DESCRIPTION</h3>
            <p className="desc-text">
              Amazon offers various student discounts including 50% off Prime membership, 
              textbook rentals, and exclusive student deals tailored for university life.
            </p>
            <div className="action-buttons">
              <button className="btn-action follow"><FaBell /> Follow Store</button>
              <button className="btn-action share"><FaShareAlt /> Share Store</button>
            </div>
          </motion.div>

          <motion.div 
            className="content-section"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3>💬 RECENT REVIEWS</h3>
            <div className="review-mini">
              <p>"Easy verification process!"</p>
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <div className="review-mini">
              <p>"Prime Video alone is worth it"</p>
              <span>⭐⭐⭐⭐</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;