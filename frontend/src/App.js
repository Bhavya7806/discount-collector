import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import Provider
import LandingPage from './pages/LandingPage/LandingPage';
import Auth from './pages/Auth/Auth';
import BrowseDeals from './pages/BrowseDeals/BrowseDeals.js'; // We will create this next
import Loader from './components/Loader/Loader';
import SingleDeal from './pages/SingleDeal/SingleDeal';
import SubmitDeal from './pages/SubmitDeal/SubmitDeal';
import UserProfile from './pages/Profile/UserProfile';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <AuthProvider> {/* WRAP HERE */}
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/browse" element={<BrowseDeals />} /> {/* New Route */}
              <Route path="/deal/:id" element={<SingleDeal />} />
              <Route path="/submit-deal" element={<SubmitDeal />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </Router>
        </AuthProvider>
      )}
    </>
  );
}

export default App;