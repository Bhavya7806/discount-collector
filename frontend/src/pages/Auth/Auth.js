import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LiquidMetal from '../../components/Effects/LiquidMetal';
import './Auth.css';
import { FcGoogle } from 'react-icons/fc';

import { 
    auth, 
    db, // Import DB
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    googleProvider 
} from '../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  
  useEffect(() => {
    if (location.state && location.state.isLogin !== undefined) {
      setIsLogin(location.state.isLogin);
    }
  }, [location.state]);

  const [userType, setUserType] = useState('student'); // 'student' or 'company'
  const [authError, setAuthError] = useState(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setAuthError(null);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in either collection
      const studentRef = doc(db, "students", user.uid);
      const companyRef = doc(db, "companies", user.uid);
      
      const studentSnap = await getDoc(studentRef);
      const companySnap = await getDoc(companyRef);

      // If new Google user, default to STUDENT collection
      if (!studentSnap.exists() && !companySnap.exists()) {
        await setDoc(studentRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || "Google User",
          role: "student",
          createdAt: new Date()
        });
      }
      
      navigate('/'); 
    } catch (error) {
      console.error("Google Error:", error);
      setAuthError("Google Sign-In failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = formData;
    setAuthError(null);

    try {
        if (!isLogin) {
            // --- SIGNUP LOGIC ---
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Determine Collection Name
            const collectionName = userType === 'student' ? 'students' : 'companies';

            // 3. Write to Firestore
            await setDoc(doc(db, collectionName, user.uid), {
                uid: user.uid,
                username: username,
                email: email,
                role: userType, // Store the role
                createdAt: new Date()
            });

            console.log(`User created in ${collectionName} collection`);
            navigate('/'); 
        } else {
            // --- LOGIN LOGIC ---
            await signInWithEmailAndPassword(auth, email, password);
            // The AuthContext will handle finding out which role the user is
            navigate('/');
        }
    } catch (error) {
        setAuthError(error.message);
    }
  };

  // ... RENDER RETURN (Keep your existing JSX) ...
  return (
    <div className="auth-page">
      <LiquidMetal />
      <div className="auth-container">
        <motion.div 
          className="auth-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="auth-header">
             <Link to="/" className="back-link">← Back to Home</Link>
             <h2>{isLogin ? 'Welcome Back' : 'Join the Community'}</h2>
          </div>

          {authError && <div className="auth-error-message">{authError}</div>}
          
          {/* Type Selector - ONLY SHOW ON SIGNUP */}
          <AnimatePresence>
            {!isLogin && (
              <motion.div 
                className="type-selector"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <button 
                  className={`type-btn ${userType === 'student' ? 'active' : ''}`}
                  onClick={() => setUserType('student')}
                  type="button" // Prevent form submit
                >
                  🎓 Student
                </button>
                <button 
                  className={`type-btn ${userType === 'company' ? 'active' : ''}`}
                  onClick={() => setUserType('company')}
                  type="button"
                >
                  🏢 Company
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <label>Username</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
              </div>
            )}
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn-submit">{isLogin ? 'Log In' : 'Create Account'}</button>
          </form>

          <div className="divider"><span>OR</span></div>
          <button className="btn-google" onClick={handleGoogleSignIn}>
            <FcGoogle size={24} /> <span>Sign in with Google</span>
          </button>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button className="btn-link" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Log In'}</button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;