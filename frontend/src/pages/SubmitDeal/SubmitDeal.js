import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar/Navbar';
import { FaCloudUploadAlt, FaFileContract, FaSave, FaPaperPlane, FaCalendarAlt } from 'react-icons/fa';
import './SubmitDeal.css';

const SubmitDeal = () => {
  // Form State
  const [dealData, setDealData] = useState({
    title: '',
    store: '',
    category: 'Technology',
    discount: '',
    originalPrice: '',
    discountedPrice: '',
    website: '',
    couponCode: '',
    expiration: '',
    locationType: 'online', // 'online' or 'physical'
    description: '',
    redeemInstructions: ''
  });

  const handleChange = (e) => {
    setDealData({ ...dealData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Deal:", dealData);
    // Future: Add Firestore write logic here
  };

  return (
    <div className="submit-page">
      <Navbar />
      
      <div className="submit-container">
        <motion.div 
          className="submit-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="submit-header">
            <h2>Share a Student Deal</h2>
            <p>Help the community save money!</p>
          </div>

          <form onSubmit={handleSubmit} className="deal-form">
            
            {/* SECTION 1: BASIC INFO */}
            <div className="form-section">
              <h3>DEAL INFORMATION</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Deal Title</label>
                  <input type="text" name="title" placeholder="e.g. Amazon Prime Student Discount" onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Store / Brand</label>
                  <input type="text" name="store" placeholder="e.g. Amazon" onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" onChange={handleChange}>
                    <option value="Technology">Technology 🛍️</option>
                    <option value="Food">Food 🍔</option>
                    <option value="Fashion">Fashion 👕</option>
                    <option value="Books">Books 📚</option>
                    <option value="Travel">Travel ✈️</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Discount</label>
                  <input type="text" name="discount" placeholder="e.g. 50% off" onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Original Price</label>
                  <input type="text" name="originalPrice" placeholder="$14.99" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Discounted Price</label>
                  <input type="text" name="discountedPrice" placeholder="$7.49" className="input-highlight" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* SECTION 2: REDEMPTION INFO */}
            <div className="form-section">
              <div className="form-row">
                <div className="form-group">
                  <label>Website URL</label>
                  <input type="url" name="website" placeholder="https://amazon.com/student" onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Coupon Code</label>
                  <input type="text" name="couponCode" placeholder="STUDENT2024" className="code-input" onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiration Date</label>
                  <div className="input-with-icon">
                    <FaCalendarAlt className="input-icon" />
                    <input type="date" name="expiration" onChange={handleChange} />
                  </div>
                </div>
                
                <div className="form-group radio-group-container">
                  <label>Location</label>
                  <div className="radio-options">
                    <label className={`radio-btn ${dealData.locationType === 'online' ? 'active' : ''}`}>
                      <input 
                        type="radio" 
                        name="locationType" 
                        value="online" 
                        checked={dealData.locationType === 'online'}
                        onChange={handleChange} 
                      /> Online 🌐
                    </label>
                    <label className={`radio-btn ${dealData.locationType === 'physical' ? 'active' : ''}`}>
                      <input 
                        type="radio" 
                        name="locationType" 
                        value="physical" 
                        checked={dealData.locationType === 'physical'}
                        onChange={handleChange} 
                      /> In-Store 🏪
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: DETAILS */}
            <div className="form-section">
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" rows="3" placeholder="Get 50% off Amazon Prime membership..." onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label>How to Redeem</label>
                <textarea name="redeemInstructions" rows="3" placeholder="1. Visit website, 2. Verify email..." onChange={handleChange}></textarea>
              </div>
            </div>

            {/* UPLOAD BUTTONS */}
            <div className="upload-actions">
              <button type="button" className="btn-upload">
                <FaCloudUploadAlt /> Upload Deal Image
              </button>
              <button type="button" className="btn-terms">
                <FaFileContract /> Add Terms & Conditions
              </button>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="submit-footer">
              <button type="button" className="btn-draft">
                <FaSave /> Save Draft
              </button>
              <button type="submit" className="btn-submit-final">
                <FaPaperPlane /> Submit Deal
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitDeal;