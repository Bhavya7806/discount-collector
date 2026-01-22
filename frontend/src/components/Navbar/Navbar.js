import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserCircle, FaPlus, FaArrowLeft } from 'react-icons/fa'; 
import { useAuth } from '../../context/AuthContext'; 
import './Navbar.css';
import logoImg from '../../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current URL path
  const { currentUser, userType, logout } = useAuth(); 

  // Handle navigation to Auth page with specific mode (Login vs Signup)
  const handleAuthNavigation = (mode) => {
    navigate('/auth', { state: { isLogin: mode === 'login' } });
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Redirect to landing page after logout
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // LOGIC: Determine when to show "Back to Deals" button
  // We show it if the user is on a Single Deal page, Submit Page, or Profile Page
  const showBackButton = location.pathname.startsWith('/deal/') || 
                         location.pathname === '/submit-deal' || 
                         location.pathname === '/profile';

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 1. LOGO SECTION */}
      <Link to="/" className="navbar-logo-link"> 
        <div className="navbar-logo">
          <img src={logoImg} alt="Discount Collector Logo" className="logo-img" />
          <h2 className="glow-text">Discount Collector</h2>
        </div>
      </Link>

      {/* 2. NAVIGATION LINKS */}
      <ul className="navbar-links">
        {showBackButton ? (
          /* SCENARIO A: Deep Navigation (Show Back Button) */
          <li>
            <Link to="/browse" className="nav-back-link">
              <FaArrowLeft style={{ fontSize: '0.8rem' }} /> Back to Deals
            </Link>
          </li>
        ) : (
          /* SCENARIO B: Main Navigation */
          <li>
            {currentUser ? (
              // If Logged In -> Go to main Dashboard
              <Link to="/browse">Deals</Link>
            ) : (
              // If Logged Out -> Scroll to Trending section on Landing Page
              <a href="/#trending">Trending Deals</a>
            )}
          </li>
        )}

        {/* Static Links (using /#id to ensure they work from any sub-page) */}
        <li><a href="/#about">About</a></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>
      
      {/* 3. AUTH & PROFILE SECTION */}
      <div className="navbar-auth">
        {currentUser ? (
          /* --- LOGGED IN VIEW --- */
          <div className="profile-section">
            
            {/* Show "Submit Deal" button ONLY if user is a Company */}
            {userType === 'company' && (
              <Link to="/submit-deal">
                <button className="btn-submit-deal">
                  <FaPlus /> Submit Deal
                </button>
              </Link>
            )}
            
            {/* User Profile Menu */}
            <div className="profile-menu">
              {/* Profile Icon Links to Profile Page */}
              <Link to="/profile">
                <FaUserCircle 
                  size={32} 
                  className="profile-icon" 
                  title={`Logged in as ${currentUser.email}`} 
                />
              </Link>
              
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          </div>
        ) : (
          /* --- LOGGED OUT VIEW --- */
          <>
            <button className="btn-login" onClick={() => handleAuthNavigation('login')}>
              Login
            </button>
            <button className="btn-signup" onClick={() => handleAuthNavigation('signup')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;