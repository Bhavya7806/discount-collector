import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <motion.div 
        className="about-card"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h2>Who We Are</h2>
        <p>
          Discount Collector is the ultimate student companion. We aggregate location-based deals, 
          compare textbook prices, and suggest budget-friendly activities to help you save while you study.
        </p>
        
        <div className="about-buttons">
          <button className="btn-student">Login as Student</button>
          <button className="btn-company">Login as Company</button>
        </div>
      </motion.div>
    </section>
  );
};

export default About;