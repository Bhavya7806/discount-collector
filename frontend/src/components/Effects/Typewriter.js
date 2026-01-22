import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ text, delay = 0 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 1. Initial Delay
    if (currentIndex === 0 && delay > 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex(1);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }

    // 2. Typing Logic
    if (currentIndex > 0 && currentIndex <= text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(text.slice(0, currentIndex));
        setCurrentIndex((prev) => prev + 1);
      }, 50); // Speed: 50ms

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span>
      {currentText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        style={{ 
          display: 'inline-block', 
          width: '2px', 
          height: '1em', 
          background: 'var(--accent-primary)', 
          marginLeft: '4px',
          verticalAlign: 'middle'
        }}
      />
    </span>
  );
};

export default Typewriter;