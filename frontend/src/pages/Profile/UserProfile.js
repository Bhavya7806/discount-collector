import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import StudentProfile from './StudentProfile';
import CompanyProfile from './CompanyProfile';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/Footer/Footer';
import './Profile.css';

const UserProfile = () => {
  const { currentUser, userType } = useAuth();

  // Guard clause if data hasn't loaded
  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="profile-page-wrapper">
      <Navbar />
      <div className="profile-container">
        {userType === 'company' ? (
          <CompanyProfile user={currentUser} />
        ) : (
          <StudentProfile user={currentUser} />
        )}
      </div>
      <Footer /> {/* Added Footer */}
    </div>
  );
};

export default UserProfile;