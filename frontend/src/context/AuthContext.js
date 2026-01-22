import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore"; // Import Firestore

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'student' or 'company'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in, now figure out their Role
        try {
          // 1. Check Student Collection
          const studentRef = doc(db, "students", user.uid);
          const studentSnap = await getDoc(studentRef);

          if (studentSnap.exists()) {
            setUserType('student');
          } else {
            // 2. Check Company Collection
            const companyRef = doc(db, "companies", user.uid);
            const companySnap = await getDoc(companyRef);
            
            if (companySnap.exists()) {
              setUserType('company');
            } else {
              // Fallback (e.g., if user created before this logic)
              setUserType('student'); 
            }
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserType('student'); // Default fallback
        }
        
        setCurrentUser(user);
      } else {
        // User is logged out
        setCurrentUser(null);
        setUserType(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    userType,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};