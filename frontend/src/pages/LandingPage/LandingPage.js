import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import TrendingDeals from '../../components/TrendingDeals/TrendingDeals';
import Footer from '../../components/Footer/Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <About />
      <TrendingDeals />
      <Footer />
    </div>
  );
};

export default LandingPage;