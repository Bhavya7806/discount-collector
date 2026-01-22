import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h3>Discount Collector</h3>
          <p>Saving students money, one deal at a time.</p>
        </div>
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Email: support@discountcollector.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: Tech Campus, Student City</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Discount Collector. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;