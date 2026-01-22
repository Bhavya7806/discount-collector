import React, { useState, useEffect } from 'react';
import config from '../../config';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer'; // 1. IMPORT FOOTER
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './BrowseDeals.css';

const BrowseDeals = () => {
  const [deals, setDeals] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. FILTER STATES
  const [filters, setFilters] = useState({
    categories: {
      Technology: true,
      Food: true,
      Fashion: true,
      Books: true,
      Entertainment: true,
      Travel: true
    },
    location: 'All'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/deals`);
        const data = await response.json();
        setDeals(data);
        
        // Mock Recommendations Logic (Keep existing)
        const techDeals = data.filter(d => d.category === 'Technology').slice(0, 3);
        setRecommendations(techDeals);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 3. HANDLERS
  const handleCategoryChange = (e) => {
    setFilters({
      ...filters,
      categories: { ...filters.categories, [e.target.name]: e.target.checked }
    });
  };

  const handleLocationChange = (e) => {
    setFilters({ ...filters, location: e.target.value });
  };

  // 4. FILTERING LOGIC
  const filteredDeals = deals.filter(deal => {
    // Check Category
    const categoryMatch = filters.categories[deal.category] !== false; // Default true if undefined
    
    // Check Location
    const locationMatch = filters.location === 'All' 
                          ? true 
                          : filters.location === 'Online' 
                              ? deal.location === 'Online'
                              : deal.location !== 'Online'; // "Near Me" means physical

    return categoryMatch && locationMatch;
  });

  return (
    <div className="browse-page">
      <Navbar /> 
      
      <div className="browse-container">
        {/* SIDEBAR FILTERS */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3>🏷️ Categories</h3>
            {Object.keys(filters.categories).map(cat => (
              <label key={cat}>
                <input 
                  type="checkbox" 
                  name={cat} 
                  checked={filters.categories[cat]} 
                  onChange={handleCategoryChange}
                /> {cat}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3>📍 Location</h3>
            <label>
              <input 
                type="radio" 
                name="loc" 
                value="All" 
                checked={filters.location === 'All'}
                onChange={handleLocationChange} 
              /> All Locations
            </label>
            <label>
              <input 
                type="radio" 
                name="loc" 
                value="Near Me" 
                checked={filters.location === 'Near Me'}
                onChange={handleLocationChange} 
              /> Near Me (Physical)
            </label>
            <label>
              <input 
                type="radio" 
                name="loc" 
                value="Online" 
                checked={filters.location === 'Online'}
                onChange={handleLocationChange} 
              /> Online Only
            </label>
          </div>
        </aside>

        {/* MAIN FEED */}
        <main className="deals-feed">
          <div className="feed-header">
            <h2>Deals › {filters.location}</h2>
            <div className="sort-option">Showing: <span>{filteredDeals.length} Results</span></div>
          </div>

          <div className="deals-list">
            {loading ? (
              <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
                Loading Live Deals...
              </div>
            ) : filteredDeals.length > 0 ? (
              <AnimatePresence>
                {filteredDeals.map((deal, index) => (
                  <motion.div 
                    className="deal-list-card"
                    key={deal.id}
                    layout // Animates list reordering
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02, borderColor: "var(--accent-primary)" }}
                  >
                    <div className="deal-icon">{deal.img || "🏷️"}</div>
                    
                    <div className="deal-content">
                      <div className="deal-header-row">
                        <h3>{deal.title}</h3>
                        <span className="deal-type-badge">{deal.category}</span>
                      </div>
                      
                      <p className="deal-desc">{deal.discount} - {deal.price}</p>
                      
                      <div className="deal-meta">
                        <span><FaStar className="star-icon" /> {deal.rating || 'New'} ({deal.reviews || 0})</span>
                        <span><FaClock /> {deal.expires}</span>
                      </div>
                      
                      <div className="deal-footer-row">
                        <span><FaMapMarkerAlt /> {deal.location}</span>
                        <Link to={`/deal/${deal.id}`}>
                          <button className="btn-view-deal">View Deal</button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                No deals match your filters. Try unchecking some!
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer /> {/* 5. ADDED FOOTER HERE */}
    </div>
  );
};

export default BrowseDeals;