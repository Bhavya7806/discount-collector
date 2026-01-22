import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaMapMarkerAlt, FaEnvelope, FaStar, FaFire, FaClipboardList, FaTag } from 'react-icons/fa';
import './Profile.css'; // Shared CSS

const StudentProfile = ({ user }) => {
  // Helper to get initials from email (since we don't always have a username)
  const getInitials = (email) => {
    return email ? email[0].toUpperCase() : 'U';
  };

  // Safe check for saved deals count
  const savedCount = user.savedDeals ? user.savedDeals.length : 0;

  return (
    <div className="profile-grid">
      {/* --- LEFT SIDEBAR --- */}
      <motion.aside 
        className="profile-sidebar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-card center-text">
          <div className="avatar-circle">
            <span className="avatar-initials">{getInitials(user.email)}</span>
          </div>
          <h2>{user.username || "Student User"}</h2>
          <p className="handle">@{user.email.split('@')[0]}</p>
          
          <div className="user-meta">
            <p><FaEnvelope /> {user.email}</p>
            <p><FaMapMarkerAlt /> New York, NY</p>
          </div>

          <div className="divider"></div>

          <div className="info-block">
            <label>University</label>
            <p>New York University (NYU)</p>
          </div>
          <div className="info-block">
            <label>Member Since</label>
            <p>Jan 2024</p>
          </div>

          <div className="badges-section">
            <h3>🏆 BADGES</h3>
            <div className="badge-list">
              <span className="badge verified">🎓 Verified</span>
              <span className="badge star">⭐ Top Reviewer</span>
              <span className="badge fire">🔥 Deal Hunter</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* --- RIGHT CONTENT --- */}
      <main className="profile-content">
        
        {/* Activity Stats */}
        <motion.div 
          className="stats-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-box">
            <FaClipboardList className="stat-icon" />
            <h4>12</h4>
            <p>Submitted</p>
          </div>
          <div className="stat-box">
            <FaTag className="stat-icon" />
            <h4>{savedCount}</h4>
            <p>Saved</p>
          </div>
          <div className="stat-box">
            <FaStar className="stat-icon" />
            <h4>8</h4>
            <p>Reviews</p>
          </div>
          <div className="stat-box">
            <FaFire className="stat-icon" />
            <h4>156</h4>
            <p>Likes</p>
          </div>
        </motion.div>

        {/* Recently Saved Deals */}
        <motion.div 
          className="content-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>RECENTLY SAVED DEALS</h3>
          
          {savedCount > 0 ? (
            <div className="saved-list">
              {/* NOTE: In a real production app, we would fetch the full details 
                 for these IDs. For this demo, we show a placeholder list 
                 or the user's specific saved IDs if mapped.
              */}
              <div className="saved-item">
                <div className="saved-icon">📦</div>
                <div className="saved-info">
                  <h4>Amazon Prime Student</h4>
                  <p>Saved recently</p>
                </div>
                <Link to="/deal/amazon_prime_student">
                  <button className="btn-small">View</button>
                </Link>
              </div>

              <div className="saved-item">
                <div className="saved-icon">💻</div>
                <div className="saved-info">
                  <h4>Adobe Creative Cloud</h4>
                  <p>Saved 2 days ago</p>
                </div>
                 <Link to="/deal/adobe_creative_cloud_student_plan">
                  <button className="btn-small">View</button>
                </Link>
              </div>
            </div>
          ) : (
             <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                You haven't saved any deals yet. Go explore!
             </div>
          )}

          {/* LINK TO BROWSE PAGE */}
          <Link to="/browse">
            <button className="btn-view-all">View All Deals</button>
          </Link>
        </motion.div>

      </main>
    </div>
  );
};

export default StudentProfile;