import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import config from '../../config';
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/AuthContext'; // Import Auth Context
import { FaStar, FaFire, FaMapMarkerAlt, FaClock, FaTag, FaShareAlt, FaFlag, FaBookmark } from 'react-icons/fa';
import './SingleDeal.css';

const SingleDeal = () => {
  const { id } = useParams(); // Get deal ID from URL
  const { currentUser } = useAuth(); // Get logged in user
  
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // Track save state

  // 1. FETCH DEAL DATA FROM BACKEND
  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/deals/${id}`);
        
        if (!response.ok) {
          throw new Error('Deal not found');
        }
        

        const data = await response.json();
        setDeal(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching deal:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDeal();
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  // 2. HANDLE SAVE BUTTON CLICK
  const handleSaveDeal = async () => {
    if (!currentUser) {
      alert("Please login to save deals!");
      return;
    }

    try {
      const response = await fetch(`${config.API_BASE_URL}/api/users/${currentUser.uid}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dealId: deal.id }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSaved(true);
        // Optional: You could trigger a toast notification here
      }
    } catch (error) {
      console.error("Error saving deal:", error);
      alert("Failed to save deal.");
    }
  };

  // 3. LOADING & ERROR STATES
  if (loading) return (
    <div style={{ paddingTop: '100px', textAlign: 'center', color: 'white' }}>
      Loading Deal Details...
    </div>
  );

  if (error || !deal) return (
    <div style={{ paddingTop: '100px', textAlign: 'center', color: 'var(--error)' }}>
      Error: {error || "Deal not found"}
    </div>
  );

  return (
    <div className="single-deal-page">
      <Navbar />
      
      <div className="single-deal-container">
        <motion.div 
          className="deal-detail-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* HEADER */}
          <div className="detail-header">
            <div className="detail-icon">{deal.img || "🏷️"}</div>
            <div className="detail-title-block">
              <h1>{deal.title}</h1>
              <div className="detail-stats">
                <span className="rating">
                  <FaStar /> {deal.rating || 'N/A'} ({deal.reviews || 0} reviews)
                </span>
                <span className="saves">
                  <FaFire /> {deal.stats?.saves || 0} saves
                </span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* META TAGS */}
          <div className="detail-meta-row">
            <span className="meta-tag"><FaTag /> {deal.category}</span>
            <span className="meta-tag"><FaMapMarkerAlt /> {deal.location}</span>
            <span className="meta-tag urgent"><FaClock /> {deal.expires}</span>
          </div>

          {/* MAIN OFFER */}
          <div className="main-offer-box">
            <h2>{deal.discount}</h2>
            <p className="price-text">
              {deal.price} <span style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.9em' }}>{deal.originalPrice}</span>
            </p>
          </div>

          {/* TWO COLUMN LAYOUT */}
          <div className="detail-grid">
            
            {/* LEFT: DETAILS & INSTRUCTIONS */}
            <div className="detail-left">
              <div className="info-section">
                <h3>📝 DEAL DETAILS</h3>
                <ul className="detail-list">
                  {deal.details && deal.details.length > 0 ? (
                    deal.details.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>No specific details provided for this deal.</li>
                  )}
                </ul>
              </div>

              <div className="info-section">
                <h3>🎯 HOW TO GET THIS DEAL</h3>
                <ol className="instruction-list">
                  {deal.instructions && deal.instructions.length > 0 ? (
                    deal.instructions.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>Check the website for redemption instructions.</li>
                  )}
                </ol>
              </div>
            </div>

            {/* RIGHT: REVIEWS */}
            <div className="detail-right">
              <h3>💬 REVIEWS</h3>
              <div className="reviews-list">
                <div className="review-item">
                  <div className="review-header">
                    <span className="review-user">Student User</span>
                    <span className="review-stars">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p>"Great deal! Worked perfectly."</p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="detail-footer">
            {/* GO TO DEAL LINK (External) */}
            <a href={deal.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-action save" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                    Go to Deal 🔗
                </button>
            </a>

            {/* SAVE BUTTON */}
            <button 
              className={`btn-action save ${isSaved ? 'saved-active' : ''}`} 
              onClick={handleSaveDeal}
              disabled={isSaved} // Prevent double clicking
            >
              <FaBookmark /> {isSaved ? "Saved!" : "Save Deal"}
            </button>

            <button className="btn-action share"><FaShareAlt /> Share</button>
            <button className="btn-action report"><FaFlag /> Report</button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default SingleDeal;