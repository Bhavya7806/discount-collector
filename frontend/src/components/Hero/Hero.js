import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPizzaSlice, FaTshirt, FaLaptop, FaBook, FaFilm } from 'react-icons/fa';
import BackgroundEffects from '../Effects/BackgroundEffects';
import Typewriter from '../Effects/Typewriter';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* 1. Background Animation Layer */}
      <BackgroundEffects />

      <div className="hero-content">
        {/* 2. Typewriter Headline */}
        <div className="headline-wrapper">
        <h1 className="hero-title">
   <Typewriter text="SAVE MONEY AS A STUDENT" delay={0.5} />
</h1>
        </div>

        {/* 3. Subtitle Fade In */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }} // Delays until typewriter finishes
        >
          Discover exclusive discounts, cashbacks & deals tailored for your campus life.
        </motion.p>

        {/* 4. Search Bar Slide Up */}
        <motion.div 
          className="search-container"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 2.8, type: "spring" }}
        >
          <div className="input-wrapper">
            <span className="location-icon">📍</span>
            <input type="text" placeholder="Search for deals near you..." />
          </div>
          <button className="search-btn"><FaSearch /> Search</button>
        </motion.div>

        {/* 5. Categories Staggered Reveal */}
        <motion.div 
          className="categories"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          {/* Helper function to render categories neatly */}
          {[
            { icon: <FaPizzaSlice />, label: "Food" },
            { icon: <FaTshirt />, label: "Fashion" },
            { icon: <FaLaptop />, label: "Tech" },
            { icon: <FaBook />, label: "Books" },
            { icon: <FaFilm />, label: "Fun" }
          ].map((cat, index) => (
            <motion.div 
              key={index}
              className="cat-item"
              whileHover={{ scale: 1.1, backgroundColor: "var(--bg-interactive)" }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.icon} {cat.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;